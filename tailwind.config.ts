import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F4EFE6',
        surface: '#FFFCF7',
        ink: '#1A1612',
        muted: '#6B645C',
        line: '#E4DCD0',
        copper: '#C45C26',
        success: '#2F6B4F',
        danger: '#9B2C2C'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif']
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '10px'
      },
      spacing: {
        18: '4.5rem'
      },
      maxWidth: {
        page: '72rem'
      }
    }
  },
  plugins: []
};
export default config;
