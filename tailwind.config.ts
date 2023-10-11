import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('assets/cardio-bg.jpg')",
      },
      minWidth: {
        '24': '6rem',
        '36': '9rem',
        '40': '10rem',
        '80': '20rem',
      },
      containers: {
        // Use same breakpoints as tailwind for @tailwindcss/container-queries plugin
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    colors: {
      primary: '#2115A8',
      secondary: '#9B0D62',
      background: '#f6f8fc',
      'tone-1': '#e6e4fc',
      'tone-2': '#d0cdf9',
      text: '#0d0844',
      label: '#676581',
      'label-2': '#a8a6b9',
      table: '#eef0fa',
      'text-red': '#e20909',
      white: '#ffffff',
      'risk-0': '#a8a6b9',
      'risk-1': '#3C9338',
      'risk-2': '#FFC326',
      'risk-3': '#FF9316',
      'risk-4': '#E20A0A',
      'risk-label-bg-0': '#a8a6b9',
      'risk-label-bg-1': '#D3EED2',
      'risk-label-bg-2': '#ffeed4',
      'risk-label-bg-3': '#ffe6d4',
      'risk-label-bg-4': '#fbd5d5',
      'risk-label-text-0': '#0d0844',
      'risk-label-text-1': '#3b9438',
      'risk-label-text-2': '#ff9314',
      'risk-label-text-3': '#ef6429',
      'risk-label-text-4': '#e20909',
    },
  },
  safelist: [
    {
      pattern: /bg-risk-\d/,
    },
    {
      pattern: /bg-risk-label-bg-\d/,
    },
    {
      pattern: /text-risk-label-text-\d/,
    },
    {
      pattern: /grid-cols-\d/,
    },
  ],
  plugins: [require('flowbite/plugin'), require('@tailwindcss/container-queries')],
} satisfies Config;
