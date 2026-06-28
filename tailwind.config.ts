import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        brand: '#3957ff',
        coral: '#ff6b4a',
        mint: '#18b892',
        cream: '#fff9ef'
      },
      boxShadow: {
        card: '0 12px 30px rgba(16, 24, 40, 0.08)'
      }
    }
  },
  plugins: []
};
export default config;
