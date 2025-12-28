import { createTamagui, createTokens, createFont } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'

// Define our color palette based on APP.md specifications
const colors = {
  // Base colors
  white: '#fff',
  black: '#000',
  
  // Gray scale
  gray1: '#f7fafc',
  gray2: '#edf2f7',
  gray3: '#e2e8f0',
  gray4: '#cbd5e0',
  gray5: '#a0aec0',
  gray6: '#718096',
  gray7: '#4a5568',
  gray8: '#2d3748',
  gray9: '#1a202c',
  
  // Brand colors (from APP.md)
  primary: '#F3AE42',
  primary1: '#FEF8EE',   // ultra light tint
  primary2: '#FFF1D6',   // extra light
  primary3: '#FFE4B0',   // very light
  primary4: '#FFD27F',   // light
  primary5: '#FEC250',   // mid-light
  primary6: '#F8BD4A',   // mid
  primary7: '#F7B33F',   // mid-deep
  primary8: '#F5B03C',   // deep
  primary9: '#F3AE42',   // base (matches `true`)
  primary10: '#E09A2B',  // darker (matches primaryDark)
  primary11: '#8A5C0A',  // darkest accent
  primaryDark: '#E09A2B',    // Darker shade of primary
  primaryLight: '#F8C76A',   // Lighter shade of primary
  
  // Semantic colors
  secondary: '#6B6B6B',      // Section title color
  secondaryDark: '#5A5A5A',  // Darker secondary
  secondaryLight: '#8A8A8A', // Lighter secondary

  warning: '#F3AE42',
  warningDark: '#E09A2B',
  warningLight: '#F8C76A',
  
  // Status colors (from APP.md)
  error: '#F30000',          // Error/alert color
  errorDark: '#D40000',      // Darker error
  errorLight: '#FF3333',     // Lighter error
  
  success: '#159300',        // Success color
  successDark: '#0F7000',    // Darker success
  successLight: '#1FB300',   // Lighter success
  
  // Legacy semantic colors (for compatibility)
  red9: '#F30000',           // Maps to error
  yellow9: '#F3AE42',        // Maps to primary
  color10: '#6B6B6B',        // Maps to secondary
}

// Create tokens
const tokens = createTokens({
  color: colors,
  space: {
    none: 0,
    true: 16,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  size: {
    true: 12,
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 18,
    h6: 20,
    h5: 24,
    h4: 28,
    h3: 32,
    h2: 36,
    h1: 40,
    full: '100%',
    max: 300,
    icon: 40,
    iconBox: 60,
    iconXs: 20,
    iconSm: 30,
    iconMd: 40,
    iconLg: 60,
    iconXl: 80,
  },
  radius: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  zIndex: {
    sm: 0,
    md: 100,
    lg: 200,
    xl: 300,
  },
})

// Define themes based on APP.md specifications
const themes = {
  // Main user flow theme (white background)
  light: {
    background: colors.white,           // User main flow background
    backgroundHover: colors.gray1,
    backgroundPress: colors.gray2,
    backgroundFocus: colors.gray2,
    color: colors.black,                // Other text are black
    colorHover: colors.gray8,
    borderColor: colors.gray3,
    borderColorHover: colors.gray4,
    shadowColor: colors.gray5,
    shadowColorHover: colors.gray6,
    
    // Text colors (from APP.md)
    text: colors.black,                 // Other text are black
    textSecondary: colors.secondary,    // Section title color (#6B6B6B)
    textDisabled: colors.gray4,
    
    // Status colors are included via ...colors spread
    ...colors,
  },
  
  // Auth flow theme (black background)
  dark: {
    background: colors.black,           // User auth flow background
    backgroundHover: colors.gray8,
    backgroundPress: colors.gray7,
    backgroundFocus: colors.gray7,
    color: colors.white,                // Text on dark background
    colorHover: colors.gray1,
    borderColor: colors.gray7,
    borderColorHover: colors.gray6,
    shadowColor: colors.black,
    shadowColorHover: colors.gray9,
    
    // Text colors for dark theme
    text: colors.white,                 // Primary text on dark
    textSecondary: colors.gray4,        // Secondary text on dark
    textDisabled: colors.gray6,
    
    // Status colors are included via ...colors spread
    ...colors,
  },
}

// Define the Tamagui configuration
const tamaguiConfig = {
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  fonts: {
    heading: createInterFont({
      size: {
        true: 16,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 22,
        xxxl: 20,
        xxxxl: 40,
        xxxxxl: 48,
        xxxxxxl: 56,
      },
      weight: { regular: '500', bold: '800' },
      letterSpacing: { 5: 0, 6: 0, 7: -1, 8: -1.5 },
    }),
    body: createInterFont({
      size: {
        true: 12,
        sm: 10,
        md: 12,
        lg: 14,
        xl: 16,
        xxl: 18,
        xxxl: 20,
        xxxxl: 32,
        xxxxxl: 36,
        xxxxxxl: 40,
      },
      weight: { regular: '400', bold: '700' },
      lineHeight: {
        1: 16, 2: 20, 3: 24, 4: 26, 5: 28, 6: 32, 7: 36, 8: 40, 9: 48, 10: 56,
      },
    }),
  },
  themes,
  tokens,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
  defaultFont: 'body',
  defaultProps: {
    Text: {
      // Using empty object as Text props are handled by Tamagui's default theme
    },
    Button: {
      pressStyle: {
        opacity: 0.8,
      },
    },
  },
}

// Create the Tamagui instance
const config = createTamagui(tamaguiConfig)

// Export the config type
type AppConfig = typeof tamaguiConfig

// Extend Tamagui types
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export type { AppConfig }
export { config }
export default config
