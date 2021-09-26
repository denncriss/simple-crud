// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E3FAEC',
          200: '#8DC9B5',
          300: '#7DA3A0',
          400: '#449382',
          500: '#115A4B',
          900: '#213038',
        },
        secondary: {
          500: '#9DD368',
        },
      },
    },
  },
  /* configurations... */
})
