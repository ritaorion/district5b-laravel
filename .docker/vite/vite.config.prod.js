import { wayfinder } from '@laravel/vite-plugin-wayfinder';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    build: {
        minify: true,
        sourcemap: false,
    },
    optimizeDeps: {
        exclude: ['js-big-decimal']
    },
});
