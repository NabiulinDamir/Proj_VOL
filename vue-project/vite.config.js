import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
    base: "/Proj_VOL/",
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    optimizeDeps: {
        exclude: ["js-big-decimal"],
    },
    server: {
        hmr: {
            overlay: true,
        },
    },
});
