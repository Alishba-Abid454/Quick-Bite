export const theme = {
  // Colors
  colors: {
    // Primary
    primary: '#FF6B35',
    primaryDark: '#E55A2B',
    primaryLight: '#FF8A5C',
    primaryGradient: 'linear-gradient(135deg, #FF6B35, #FF4500)',

    // Secondary
    secondary: '#2D3436',
    secondaryLight: '#636E72',

    // Success
    success: '#00B894',
    successLight: '#55EFC4',

    // Warning
    warning: '#FDCB6E',
    warningLight: '#FFEAA7',

    // Danger
    danger: '#E17055',
    dangerLight: '#FF7675',

    // Info
    info: '#0984E3',
    infoLight: '#74B9FF',

    // Neutral
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F8F9FA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    gray600: '#6C757D',
    gray700: '#495057',
    gray800: '#343A40',
    gray900: '#212529',

    // Background
    background: '#F5F5F5',
    backgroundWhite: '#FFFFFF',

    // Text
    text: '#2D3436',
    textMuted: '#636E72',
    textLight: '#FFFFFF',

    // Scrollbar
    scrollTrack: '#F1F1F1',
    scrollThumb: '#888',
    scrollThumbHover: '#555',

    // Border
    border: '#E9ECEF',
    borderFocus: '#FF6B35',

    // Shadow
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Typography
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
  },

  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },

  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.1)',
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
};

// CSS Variables as string for GlobalStyles
export const cssVariables = `
  :root {
    --primary: ${theme.colors.primary};
    --primary-dark: ${theme.colors.primaryDark};
    --primary-light: ${theme.colors.primaryLight};
    --secondary: ${theme.colors.secondary};
    --secondary-light: ${theme.colors.secondaryLight};
    --success: ${theme.colors.success};
    --success-light: ${theme.colors.successLight};
    --warning: ${theme.colors.warning};
    --warning-light: ${theme.colors.warningLight};
    --danger: ${theme.colors.danger};
    --danger-light: ${theme.colors.dangerLight};
    --info: ${theme.colors.info};
    --info-light: ${theme.colors.infoLight};
    --white: ${theme.colors.white};
    --black: ${theme.colors.black};
    --text: ${theme.colors.text};
    --text-muted: ${theme.colors.textMuted};
    --text-light: ${theme.colors.textLight};
    --background: ${theme.colors.background};
    --background-white: ${theme.colors.backgroundWhite};
    --scroll-track: ${theme.colors.scrollTrack};
    --scroll-thumb: ${theme.colors.scrollThumb};
    --scroll-thumb-hover: ${theme.colors.scrollThumbHover};
    --border: ${theme.colors.border};
    --border-focus: ${theme.colors.borderFocus};
    --shadow: ${theme.colors.shadow};

    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};

    --radius-sm: ${theme.borderRadius.sm};
    --radius-md: ${theme.borderRadius.md};
    --radius-lg: ${theme.borderRadius.lg};
    --radius-xl: ${theme.borderRadius.xl};
    --radius-full: ${theme.borderRadius.full};

    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-xl: ${theme.shadows.xl};
    --shadow-2xl: ${theme.shadows['2xl']};

    --transition-fast: ${theme.transitions.fast};
    --transition-normal: ${theme.transitions.normal};
    --transition-slow: ${theme.transitions.slow};
  }
`;

export default theme;