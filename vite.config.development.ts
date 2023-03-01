import { defineConfig } from "vite";
export default defineConfig({
    base: "./",
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[ext]",
                chunkFileNames: "assets/[name].[ext]",
                entryFileNames: "assets/[name].js",
            },
        },
        write: true,
    },
});