import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "./", // Tambahkan base path untuk memastikan asset ditemukan
    server: {
        proxy: {
            "/registration": {
                target: "https://api-doc-tht.nutech-integrasi.com",
                changeOrigin: true,
                secure: false, // jika server API menggunakan HTTPS
            },
        },
    },
});
