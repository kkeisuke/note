/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  content: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem'
      }
    }
  },
  plugins: [],
  future: {
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}

module.exports = config
