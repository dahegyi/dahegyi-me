import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const config = {
    define: {},
    plugins: [vue()],
    resolve: {
      alias: {
        "~": "/src",
      },
      extensions: [".js", ".json", ".vue", ".scss", ".css"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "bootstrap/scss/bootstrap-grid";
          @import "~/assets/styles/main";
        `,
        },
      },
    },
  };

  if (mode === "development") {
    config.define.global = {};
  }

  return config;
});
