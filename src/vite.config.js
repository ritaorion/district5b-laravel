import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.tsx", "resources/css/app.css"],
            refresh: true,
        }),
        react(),
    ],
    build: {
        minify: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                // manualChunks: (path) => {
                //     if (path.includes("node_modules")) {
                //         return "vendor";
                //     }
                //     return 'all';
                // }
            }
        }
    },
    optimizeDeps: {
        exclude: ['js-big-decimal']
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
            clientPort: 5173,
        },
        watch: {
            usePolling: true,
            interval: 300
        },
        cors: {
            origin: true,
            credentials: true
        }
    },
});
