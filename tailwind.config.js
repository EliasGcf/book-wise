/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      green: {
        '01': '#50B2C0',
        '02': '#255D6A',
        '03': '#0A313C',
      },

      purple: {
        '01': '#8381D9',
        '02': '#2A2879',
      },

      gray: {
        '01': '#F8F9FC',
        '02': '#E6E8F2',
        '03': '#D1D6E4',
        '04': '#8D95AF',
        '05': '#303F73',
        '06': '#252D4A',
        '07': '#181C2A',
        '08': '#0E1116',
      },
    },

    extend: {
      fontFamily: {
        sans: ['var(--nunito-sans)'],
      },
    },
  },
  plugins: [],
};
