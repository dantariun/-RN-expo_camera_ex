/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff';

const primaryPurple = "#7647EF"
const primaryPurpleDeep = "#5B31C7"
const primaryPurpleLite = "#A380FF"

const grey100 = "#F9FAFC"
const grey200 = "#F1F2F6"
const grey300 = "#E0E5EB"
const grey400 = "#D2D6E1"
const grey500 = "#BFC9D5"
const grey600 = "#818DA4"
const grey700 = "#666F84"
const grey800 = "#373E4E"
const grey900 = "#222631"
const grey950 = "#0A0F15"

const white = "#FFFFFF"
const stateGreen = "#0AA06E"
const sky = "#A9D6FF"

const enabledYellow = "#F2D39A"
const disabledYellow = "#FFF3DE"

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  greyColors: {
    grey100: grey100,
    grey200: grey200,
    grey300: grey300,
    grey400: grey400,
    grey500: grey500,
    grey600: grey600,
    grey700: grey700,
    grey800: grey800,
    grey900: grey900,
    grey950: grey950,
  },
  textColors: {
    dark: grey900,
    grey: grey600,
    grey900: grey900,
    grey100: grey100,
    stateGreen: stateGreen
  },
  buttonBg: {
    deactive: grey300,
    active: primaryPurple,
    enYellow: enabledYellow,
    daYellow: disabledYellow,
    sky: sky,
  },
  buttnText: {
    deactive: grey600,
    active: white,
  },
  appPrimaryColor: {
    purple: primaryPurple,
    purpleDeep: primaryPurpleDeep,
    purpleLite: primaryPurpleLite
  },
  bgColors: {
    grey: grey300
  }
};
