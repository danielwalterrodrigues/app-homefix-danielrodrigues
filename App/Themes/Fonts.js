import {Dimensions, Platform, PixelRatio} from 'react-native'
const { width, height } = Dimensions.get('window');

var getAdjustedFontSize = (size) => {
  return parseInt(size) * width * (1.8 - 0.002 * width) / 400;
}

const type = {
  robotoLight: 'Roboto-Light',
  robotoBold: 'Roboto-Bold',
  robotoMedium: 'Roboto-Medium',
  robotoRegular: 'Roboto-Regular',
  officinaBold: 'Roboto-Bold',
  officinaBook: 'Roboto-Medium',
  robotoMedium: 'Roboto-Medium',
  vivoBold: 'vivo-bold',
  vivoExtraBold: 'VIVOExtBol'
}

const size = {
  // extraLarge: 50,
  large: getAdjustedFontSize(30),
  regular: getAdjustedFontSize(20),
  regularMedium: getAdjustedFontSize(16),
  medium: getAdjustedFontSize(13),
  small: getAdjustedFontSize(12)
  // small: 12,
  // tiny: 8.5
  /*h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  large: 32,
  regular: 20,
  medium: 14,
  small: 12,
  tiny: 8.5*/
}

const patterns = {
  robotoRegularMedium:{
    fontSize: size.regularMedium,
    fontFamily: type.robotoRegular,
  },
  robotoLightSmall: {
    fontFamily: type.robotoLight,
    fontSize: size.small
  },
  robotoLightRegular: {
    fontFamily: type.robotoLight,
    fontSize: size.regular
  },
  robotoLightMedium:{
    fontSize: size.medium,
    fontFamily: type.robotoLight
  },
  robotoLightLarge: {
    fontFamily: type.robotoLight,
    fontSize: size.large,
  },
  robotoMedium:{
    fontFamily: type.robotoMedium,
    fontSize: size.medium
  },
  robotoMediumRegular: {
    fontFamily: type.robotoMedium,
    fontSize: size.regular
  },
  robotoLightRegularMedium:{
    fontFamily: type.robotoLight,
    fontSize: size.regularMedium
  },
  robotoMediumLarge:{
    fontFamily: type.robotoMedium,
    fontSize: size.large,
  },
  officinaBoldLarge:{
    fontFamily: type.officinaBold,
    fontSize: size.large
  }
}

const style = {
  onboardingTitle: patterns.officinaBoldLarge,
  onboardingTitleSmall: patterns.robotoLightRegular,
  onboardingFooter:patterns.robotoMedium,
  tabLabel: patterns.robotoLightMedium,
  headerCounter:patterns.robotoMedium,
  headerTitle: patterns.robotoMediumLarge,
  headerSubtitle: patterns.robotoLightLarge,
  collapsibleTitle: patterns.robotoLightRegular,
  modalText: patterns.robotoLightRegular,
  button: patterns.robotoMediumRegular,
  listSubtitle: patterns.robotoLightRegularMedium,
  label: patterns.robotoLightRegularMedium,
  input: patterns.robotoLightRegular,
  /*h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  }, normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  title:{
    fontFamily: type.title,
    fontSize: size.large
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }*/
}

export default {
  type,
  size,
  style,
  patterns
}
