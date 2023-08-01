/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,ts}"];
export const theme = {
  extend: {
    backgroundImage: {
      'login': "url('assets/cardio-bg.jpg')",
    },
    boxShadow: {
      'DEFAULT': '0px 0px 40px 0px rgba(221, 220, 234, 0.20)',
      'inner': '0px 0px 4px 0px rgba(0, 0, 0, 0.15)'
    }
  },
  colors: {
    'primary': '#2115A8',
    'secondary': '#9B0D62',
    'background': '#f6f8fc',
    'tone-1': '#e6e4fc',
    'tone-2': '#d0cdf9',
    'text': '#0d0844',
    'label': '#676581',
    'label-2': '#a8a6b9',
    'table': '#eef0fa',
    'group-green-1': '#b4e1b2',
    'light-green-1': '#d3eed2',
    'group-orange-1': '#ffc670',
    'light-orange-1': '#ffeed4',
    'text-orange-1': '#ff9314',
    'group-orange-2': '#ffac70',
    'text-orange-2': '#ef6429',
    'light-orange-2': '#ffe6d4',
    'group-red': '#f17272',
    'light-red': '#fbd5d5',
    'text-red': '#e20909',
    'text-green': '#3b9438',
    'light-green': '#D3EED2',
    'yellow': '#ffc327',
    'light-yellow': '#fff5da',
    'white': '#ffffff',
  }
};
export const plugins = [];

