import { designTokens } from './design-tokens';

// Утилита для получения responsive текстовых стилей
export const getResponsiveTextStyle = (
  textStyle: 'h1' | 'h2' | 'h3',
  isMobile: boolean
) => {
  if (isMobile && textStyle in designTokens.mobileTextStyles) {
    return designTokens.mobileTextStyles[textStyle];
  }
  return designTokens.textStyles[textStyle];
};

// CSS media query для использования в inline стилях
export const getResponsiveFontSize = (
  desktopStyle: string,
  mobileStyle: string
) => {
  return `
    font-size: ${desktopStyle};
    @media (max-width: ${designTokens.breakpoints.mobile}) {
      font-size: ${mobileStyle};
    }
  `;
};

// Хук для определения размера экрана
export const useIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= parseInt(designTokens.breakpoints.mobile);
}; 