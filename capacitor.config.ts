import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "are.my.cats.alive",
  appName: "are-my-cats-alive",
  webDir: "dist",
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
