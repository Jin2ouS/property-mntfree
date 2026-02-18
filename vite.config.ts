import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 루트(/)로 두면 커스텀 도메인(property.mntfree.com)에서 정상 동작
  base: '/',
})
