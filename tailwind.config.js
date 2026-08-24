export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#231D19',        // near-black text, warm not cold
        linen: '#EFE6D6',      // base background — warm parchment/thread
        linen2: '#E4D7BF',     // slightly deeper panel background
        maroon: '#7A1F2B',     // bridal / makeup studio accent (sindoor red)
        maroondeep: '#5A1620',
        gold: '#B8863B',       // boutique / fashion accent (thread gold)
        golddeep: '#8F6528',
        sage: '#6B7A5E',       // secondary boutique accent (raw silk green)
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
