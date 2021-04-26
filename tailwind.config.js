/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./public/**/*.html', './src/**/*.vue']
  },
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem'
      }
    }
  },
  variants: {},
  plugins: [],
  future: {
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}

module.exports = config
