const { defineConfig } = require('@vue/cli-service')

const config = defineConfig({
  productionSourceMap: false,
  css: {
    // main.ts で import した順に style が当たるようにするため。
    // build 時に css ファイルを作らない（順番が変わる。tailwind が最後になってしまう。）
    extract: false
  },
  pwa: {
    name: 'Note',
    themeColor: '#4A4A4A'
  }
})

module.exports = config
