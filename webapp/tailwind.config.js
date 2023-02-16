module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      colors: {
        primary: '#0FC2C0',
        primary_light: '#EDF4FF',
      },
      boxShadow: {
        '3xl': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
