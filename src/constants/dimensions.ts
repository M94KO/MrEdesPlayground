import { Dimensions as RNDimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = RNDimensions.get('window');

export const dimensions = {
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  
  iconSizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
  
  hitSlop: {
    small: { top: 8, bottom: 8, left: 8, right: 8 },
    medium: { top: 12, bottom: 12, left: 12, right: 12 },
    large: { top: 16, bottom: 16, left: 16, right: 16 },
  },
} as const;

export type DimensionsType = typeof dimensions;