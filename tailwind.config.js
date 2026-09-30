module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#536B7A',
          hover: '#647F90',
          active: '#71899A'
        },
        surface: {
          DEFAULT: '#14171A',
          paper: '#1A1D21',
          card: '#181B1F',
          cover: '#1E2227',
          elevated: '#23272D'
        },
        ink: {
          primary: '#F0EEE9',
          secondary: '#9EA4AA',
          muted: '#686E77'
        },
        border: {
          tech: '#2A2F36',
          subtle: '#20242A',
          accent: '#3E4752'
        },
        accent: {
          steel: '#536B7A',
          slate: '#71899A',
          forest: '#4E8765',
          amber: '#B88636',
          brick: '#A85858'
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
}
