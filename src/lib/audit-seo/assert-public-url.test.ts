import { describe, expect, it } from "vitest";
import { AuditUrlError, assertPublicUrl, isPrivateIp } from "./assert-public-url";

describe("isPrivateIp — IPv4", () => {
  const privateV4 = [
    "0.0.0.0",
    "10.0.0.1",
    "10.255.255.255",
    "100.64.0.1", // CGNAT
    "127.0.0.1", // loopback
    "127.1.2.3",
    "169.254.169.254", // link-local (métadonnées cloud)
    "172.16.0.1",
    "172.31.255.255",
    "192.168.0.1",
    "192.168.1.1",
    "224.0.0.1", // multicast
    "240.0.0.1", // réservé
  ];
  it.each(privateV4)("rejette %s comme privée", (ip) => {
    expect(isPrivateIp(ip)).toBe(true);
  });

  const publicV4 = ["8.8.8.8", "1.1.1.1", "93.184.216.34", "172.15.255.255", "172.32.0.1", "11.0.0.1"];
  it.each(publicV4)("accepte %s comme publique", (ip) => {
    expect(isPrivateIp(ip)).toBe(false);
  });
});

describe("isPrivateIp — IPv6", () => {
  const privateV6 = [
    "::1", // loopback
    "::", // non spécifiée
    "fe80::1", // link-local
    "fe80::abcd:1234:5678:9abc",
    "fc00::1", // ULA
    "fd12:3456:789a::1", // ULA
    "ff02::1", // multicast
    "::ffff:127.0.0.1", // IPv4-mapped loopback
    "::ffff:192.168.1.1", // IPv4-mapped privée
    "::ffff:169.254.169.254", // IPv4-mapped link-local
    "64:ff9b::10.0.0.1", // NAT64 vers privée
  ];
  it.each(privateV6)("rejette %s comme privée", (ip) => {
    expect(isPrivateIp(ip)).toBe(true);
  });

  const publicV6 = ["2001:4860:4860::8888", "2606:4700:4700::1111", "::ffff:8.8.8.8"];
  it.each(publicV6)("accepte %s comme publique", (ip) => {
    expect(isPrivateIp(ip)).toBe(false);
  });
});

describe("isPrivateIp — entrées invalides", () => {
  it.each(["", "example.com", "999.999.999.999", "12345", "not-an-ip"])(
    "traite %s comme non sûre",
    (value) => {
      expect(isPrivateIp(value)).toBe(true);
    }
  );
});

describe("assertPublicUrl", () => {
  const resolveTo = (addrs: string[]) => async () => addrs;

  it("rejette un schéma non http(s)", async () => {
    await expect(assertPublicUrl("ftp://example.com")).rejects.toBeInstanceOf(AuditUrlError);
    await expect(assertPublicUrl("file:///etc/passwd")).rejects.toBeInstanceOf(AuditUrlError);
    await expect(assertPublicUrl("javascript:alert(1)")).rejects.toBeInstanceOf(AuditUrlError);
  });

  it("rejette une URL invalide", async () => {
    await expect(assertPublicUrl("pas une url")).rejects.toBeInstanceOf(AuditUrlError);
  });

  it("rejette une IP littérale privée sans DNS", async () => {
    await expect(assertPublicUrl("http://127.0.0.1/admin")).rejects.toBeInstanceOf(AuditUrlError);
    await expect(assertPublicUrl("http://169.254.169.254/latest/meta-data")).rejects.toBeInstanceOf(
      AuditUrlError
    );
    await expect(assertPublicUrl("http://[::1]:8080/")).rejects.toBeInstanceOf(AuditUrlError);
  });

  it("accepte une IP littérale publique", async () => {
    const url = await assertPublicUrl("https://8.8.8.8/");
    expect(url.hostname).toBe("8.8.8.8");
  });

  it("rejette un domaine qui résout vers une IP privée", async () => {
    await expect(
      assertPublicUrl("https://interne.exemple.fr", { resolve: resolveTo(["192.168.1.10"]) })
    ).rejects.toBeInstanceOf(AuditUrlError);
  });

  it("rejette si UNE des adresses résolues est privée", async () => {
    await expect(
      assertPublicUrl("https://mixte.exemple.fr", { resolve: resolveTo(["93.184.216.34", "10.0.0.5"]) })
    ).rejects.toBeInstanceOf(AuditUrlError);
  });

  it("rejette un domaine qui ne résout vers rien", async () => {
    await expect(
      assertPublicUrl("https://vide.exemple.fr", { resolve: resolveTo([]) })
    ).rejects.toBeInstanceOf(AuditUrlError);
  });

  it("accepte un domaine qui résout vers une IP publique", async () => {
    const url = await assertPublicUrl("https://exemple.fr/page", {
      resolve: resolveTo(["93.184.216.34"]),
    });
    expect(url.hostname).toBe("exemple.fr");
    expect(url.pathname).toBe("/page");
  });
});
