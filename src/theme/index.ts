  // theme/system.ts
import { createSystem, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#2563eb" },
      },
      radii: {
        md: { value: "8px" },
      },
    },
  },
});

export const system = createSystem(config);
