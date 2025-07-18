import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '480px',
      md: '768px',
      lg: '1280px',
      xl: '1920px',
    },
    extend: {
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '991px',
          lg: '1480px',
          xl: '1480px',
        },
      },
    },
  },
  plugins: [],
}
export default config
