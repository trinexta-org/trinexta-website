import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Runner de tests pour la logique pure et déterministe (moteur de score,
// garde-fous SSRF...). L'UI n'est pas testée ici, elle est vérifiée à la main.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
