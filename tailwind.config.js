const breakpoints = {
  'xs': { 'max': '639px' }, // phone
  'sm': { 'min': '640px', 'max': '767px' }, // phone landscape
  'md': { 'min': '768px', 'max': '1023px' }, // ipad
  'lg': { 'min': '1024px', 'max': '1279px' }, // ipad landscape, ipad pro
  'xl': { 'min': '1280px', 'max': '1535px' }, // ipad pro landscape, laptop
  '2xl': { 'min': '1536px' }, // large monitor
};

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      default: ['Rubik', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      heading: ['EB Garamond', 'Garamond', 'Georgia', 'serif'],
    },
    colors: {
      // font color
      light: '#F5F5F5',
      dark: '#252525',
      link: '#2196F3',
      error: '#E74C3C',
      transparent: 'transparent',
      // primary branding colors
      primary: '#9B3CEA',
      gray: {
        DEFAULT: '#E7E7E7',
        darken: '#4D4D4D',
      },
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      'screen-1/4': '25vh',
      'screen-1/2': '55vh',
      'screen-3/4': '75vh',
      'screen': '100vh',
    },
    screens: {
      ...breakpoints,
      'sm-below': { 'max': breakpoints.sm.max },
      'md-below': { 'max': breakpoints.md.max },
      'md-above': { 'min': breakpoints.md.min },
      'lg-above': { 'min': breakpoints.lg.min },
      'xl-above': { 'min': breakpoints.xl.min },
      'portrait': { 'raw': '(orientation: portrait)' },
      'landscape': { 'raw': '(orientation: landscape)' },
    },
    container: {
      center: true,
    },
    extend: {
      transitionProperty: {
        'height': 'height',
        'opacity': 'opacity',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
      backgroundColor: ['group-hover'],
      height: ['group-hover'],
      opacity: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
