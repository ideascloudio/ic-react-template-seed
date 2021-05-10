import React, { createContext, useContext } from 'react';
import Color from 'color';
import { useMediaQuery } from 'react-responsive';
import { icSetupContext } from '../ICSetup';

export const stylingContext = createContext();

export const StylingProvider = ({ children }) => {

  // States
  const { staticSetup: { styling: setup } } = useContext(icSetupContext);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  // Constants
  const constantsMap = {
    RESPONSIVE_SMALL: 'small',
    RESPONSIVE_MEDIUM: 'medium',
    RESPONSIVE_LARGE: 'large',
    ORIENTATION_PORTRAIT: 'portrait',
    ORIENTATION_LANDSCAPE: 'landscape'
  }
  const colorPalette = setup.colorPalette;
  const fonts = setup.fonts;
  const look = setup.look;

  const stylingSetup = {

    // Constants
    constants: constantsMap,

    // Look setup
    look: {
      shadow: look.shadow,
      rounded: look.rounded,
    },

    // Screen setup
    screen: {
      responsiveSize: ( isMobile ? constantsMap.RESPONSIVE_SMALL : ( isTablet ? constantsMap.RESPONSIVE_MEDIUM : constantsMap.RESPONSIVE_LARGE ) ),
      responsiveMap: {
        isSmall: isMobile,
        isMedium: isTablet,
        isLarge: !isMobile && !isTablet,
      },
      orientation: isPortrait ? constantsMap.ORIENTATION_PORTRAIT : constantsMap.ORIENTATION_LANDSCAPE
    },

    // Defaults
    defaults: {
      fontFamily: fonts.default,
      googleFontsStyle: 'material-icons'
    },
      
    // Layout
    layout: {
      mainContainer: {
        padding: isMobile ? '1.2rem': ( isTablet ? '1.6rem': '2rem' ),
      },
      headers: {
        fontFamily: fonts.titles,
        colors: {
          backgroundWithGradient: colorPalette.primaryColors.length > 1 ? `linear-gradient(to right, ${colorPalette.primaryColors.join(', ')})` : colorPalette.primaryColors[0],
          background: colorPalette.primaryColors[0],
          font: Color(colorPalette.primaryColors[0]).isDark() ? colorPalette.complementary.white : colorPalette.complementary.black
        }
      },
      buttons: {
        fontFamily: fonts.titles,
        colors: {
          background: 'none',
          font: Color(colorPalette.primaryColors[0]).lightness(45)
        },
        highlightedColors: {
          background: colorPalette.primaryColors[0],
          font: Color(colorPalette.primaryColors[0]).isDark() ? colorPalette.complementary.white : colorPalette.complementary.black
        }
      },
      bgContainers: {
        colors: {
          background: colorPalette.complementary.light,
          font: colorPalette.complementary.dark
        }
      },
      fgContainers: {
        colors: {
          background: colorPalette.complementary.white,
          font: colorPalette.complementary.dark,
          highlightedFont: Color(colorPalette.primaryColors[0]).lightness(45),
        }
      }

    }

  }

  return (
    <stylingContext.Provider value={stylingSetup}>{ children }</stylingContext.Provider>
  )
}