import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default {
  title: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: Fonts.size.regular,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,

  },
  description:{
    fontFamily: Fonts.type.officinaBold,
    fontSize: Fonts.size.large,
    marginBottom: Metrics.doubleBaseMargin,
  },
  slide: {
    padding: Metrics.smallMargin,
    justifyContent: 'flex-start',
  },
  info:{
    alignItems: 'flex-start',
  },
  nextButtonText:{
    fontFamily: Fonts.type.robotoLight,
    fontSize: Fonts.size.medium,
  },
  controllText:{
    fontFamily: Fonts.type.robotoLight,
    fontSize: Fonts.size.medium
  },
  dotStyle: {
    width: Metrics.smallMargin,
    height: Metrics.smallMargin,
    borderRadius: Metrics.smallRadius,
    marginLeft: Metrics.smallMargin,
    marginRight: Metrics.smallMargin,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  btnContainer: {
    flex: 1
  }
};
