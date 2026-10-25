import { lookup, type LookupAddress } from "node:dns";
import { Agent } from "undici";
import { isPrivateIp } from "./assert-public-url";

/**
 * Repris de trinexta-studio (src/lib/audit-seo/dispatcher.ts).
 * Anti-SSRF au moment de la connexion. assertPublicUrl contrôle le domaine
 * avant la requête, mais fetch le résout une seconde fois : un domaine à TTL
 * court peut répondre une IP publique au contrôle puis 127.0.0.1 à la
 * connexion (rebinding DNS). Cet agent refait le contrôle sur les adresses
 * réellement utilisées pour se connecter.
 */
export const dispatcherPublic = new Agent({
  connect: {
    lookup(hostname, options, callback) {
      lookup(hostname, { ...options, all: true }, (error, addresses) => {
        if (error) {
          callback(error, "", 0);
          return;
        }
        const liste = addresses as unknown as LookupAddress[];
        if (liste.length === 0 || liste.some((a) => isPrivateIp(a.address))) {
          callback(Object.assign(new Error("Adresse non autorisée"), { code: "EAI_FAIL" }), "", 0);
          return;
        }
        if ((options as { all?: boolean }).all) {
          (callback as unknown as (err: null, list: LookupAddress[]) => void)(null, liste);
        } else {
          callback(null, liste[0].address, liste[0].family);
        }
      });
    },
  },
});

/** Options de fetch avec l'agent anti-rebinding (option `dispatcher` de l'undici embarqué par Node). */
export function avecDispatcherPublic(init: RequestInit): RequestInit {
  return { ...init, dispatcher: dispatcherPublic } as RequestInit;
}
