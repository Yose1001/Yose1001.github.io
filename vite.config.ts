import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // base './' ทำให้เว็บทำงานได้แม้วางไว้ในโฟลเดอร์ย่อย เช่น บน GitHub Pages
  base: './',
  plugins: [react(), tailwindcss()],
  // โปรเจคอยู่บนไดรฟ์ Windows แต่รันใน WSL จึงต้องให้ Vite คอยเช็กไฟล์เอง (polling)
  // ไม่อย่างนั้นแก้โค้ดแล้วหน้าเว็บจะไม่อัปเดต
  server: { watch: { usePolling: true, interval: 300 } },
})
