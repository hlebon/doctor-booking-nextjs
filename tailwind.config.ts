import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oxford: '#0A1128',
        penn: '#001F54',
        indigo: '#034078',
        cerulean: '#1282A2',
        paper: '#FEFCFB',
        primary: '#034078',
        'primary-dark': '#001F54',
        'primary-light': '#1282A2',
        'on-primary': '#FEFCFB',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      boxShadow: {
        light: '0 4px 6px rgba(0, 0, 0, 0.1)',
        dark: '0 4px 6px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
