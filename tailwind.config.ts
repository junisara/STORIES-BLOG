import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/containers/**/*.{js,jsx,ts,tsx}`,
    `./src/layouts/**/*.{js,jsx,ts,tsx}`,
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
  ],
  prefix: '',
  theme: {
    fontFamily: {
      happySans: ['var(--single_day)'],
      sans: [...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        /* ************************** */
        /*     Basic Color            */
        /* ************************** */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        colorText1: {
          DEFAULT: 'var(--color-text1)',
          foreground: 'var(--color-text1-foreground)',
        },
        colorText2: {
          DEFAULT: 'var(--color-text2)',
          foreground: 'var(--color-text2-foreground)',
        },
        colorText3: {
          DEFAULT: 'var(--color-text3)',
          foreground: 'var(--color-text3-foreground)',
        },
        colorGray1: {
          DEFAULT: 'var(--color-gray1)',
          foreground: 'var(--color-gray1-foreground)',
        },
        colorGray2: {
          DEFAULT: 'var(--color-gray2)',
          foreground: 'var(--color-gray2-foreground)',
        },

        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)',
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          foreground: 'var(--danger-foreground)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },

        /* ************************** */
        /*       Elements Color       */
        /* ************************** */
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',

        /* ************************** */
        /*   Components Color         */
        /* ************************** */
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        code: {
          DEFAULT: 'var(--blockquote)',
          foreground: 'var(--blockquote-foreground)',
        },
        blockquote: {
          DEFAULT: 'var(--blockquote)',
          foreground: 'var(--blockquote-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },

        table: {
          DEFAULT: 'var(--table)',
          th: 'var(--table-th)',
          foreground: 'var(--table-foreground)',
        },
      }, // Color End

      /* ************************** */
      /*   Components Color         */
      /* ************************** */
      headerHeight: 'var(--header-height)',
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    boxShadow: {
      sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
      md: '0 8px 30px rgba(0, 0, 0, 0.12)',
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     `./src/pages/**/*.{js,jsx,ts,tsx}`,
//     `./src/components/**/*.{js,jsx,ts,tsx}`,
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
