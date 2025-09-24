export const colors = {
  primary: '#8B5CF6',
  secondary: '#06B6D4',
  accent: '#F59E0B',
  
  white: '#FFFFFF',
  black: '#000000',
  
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
  },
  
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },
  
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
  
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  shadow: '#000000',
  
  // Mr. Ede themed colors
  mrEde: {
    primary: '#8B5CF6', // Purple for his hat
    secondary: '#10B981', // Green for leaves
    accent: '#F59E0B', // Gold for flowers
    gray: '#6B7280', // His distinctive grey mid-face
  },
} as const;

export type Colors = typeof colors;