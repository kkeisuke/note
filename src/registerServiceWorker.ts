/// <reference types="vite-plugin-pwa/client" />

import { registerSW } from 'virtual:pwa-register'

if (import.meta.env.PROD) {
  const intervalMS = 60 * 60 * 1000

  const reload = registerSW({
    onRegistered(registration) {
      registration && setInterval(() => registration.update(), intervalMS)
    },
    onNeedRefresh() {
      window.alert('最新バージョンを取得しました。更新のため再読み込みされます。')
      reload()
    }
  })
}
