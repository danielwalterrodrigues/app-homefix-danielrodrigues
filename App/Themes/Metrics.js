import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')
var getAdjustedFontSize = (size) => {
  return parseInt(size);
}
const smallMargin = getAdjustedFontSize(5);
const smallRadius = getAdjustedFontSize(2);


const metrics = {
  marginHorizontal: smallMargin * 2,
  marginVertical: smallMargin * 2,
  section: smallMargin * 5,
  baseMargin: smallMargin * 2,
  doubleBaseMargin: smallMargin * 4,
  tripleBaseMargin: smallMargin * 6,
  smallMargin: smallMargin,
  doubleSection: smallMargin * 10,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: getAdjustedFontSize(340),
  navBarButtonsContainer: smallMargin * 8,
  buttonRadius: smallRadius * 2,
  smallRadius: smallRadius,
  icons: {
    tiny: getAdjustedFontSize(15),
    small: getAdjustedFontSize(20),
    medium: getAdjustedFontSize(30),
    large: getAdjustedFontSize(45),
    xl: getAdjustedFontSize(50)
  },
  images: {
    small: getAdjustedFontSize(20),
    medium: getAdjustedFontSize(40),
    large: getAdjustedFontSize(60),
    logo: getAdjustedFontSize(200)
  },
  borderBottomWidthNav: 1
}

export default metrics
