import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react"; // <-- 新增
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://portfolio.ricoui.com/';

export default defineConfig({
  site: siteUrl,
  base: '/',
  envPrefix: 'PUBLIC_',
  vite: {
    build: {
      // 告诉 esbuild/Vite 只转译到支持 ES2020 的浏览器
      // 这将保留大多数 ES6/ES7/ES8 特性，无需转译。
      // 'es2020' 是一个很好的基线，通常能覆盖 95% 以上的用户。
      target: 'es2020', 
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },

  server: {
    port: 5200,
  },

  integrations: [
    react(), // <-- 新增
    mdx(),
    sitemap()
  ],
});