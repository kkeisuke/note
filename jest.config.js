/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}

module.exports = config
