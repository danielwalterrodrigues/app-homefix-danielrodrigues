import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default StyleSheet.create({
  container: {
    width: '100%',
    height: Metrics.navBarHeight,
    justifyContent: 'flex-end',
    padding: Metrics.baseMargin * 2,
    paddingTop: (Metrics.baseMargin * 2) + Metrics.baseMargin ,
    backgroundColor: Colors.defaultBackgroundNav,
  },
  containerFull:{
    height: Metrics.screenHeight + ifIphoneX(30, 0)
  },

  containerWithoutButton:{
    height: Metrics.navBarHeight - Metrics.navBarButtonsContainer  + ifIphoneX(30, 0),
  },
  buttonsContainer:{
  	flex: 1,
  	flexDirection: 'row',
    height: Metrics.navBarButtonsContainer,
  },
  buttonsContainerWithoutBack:{
  	justifyContent: 'center',
  },
  titleContainer:{
		// flex: 1,
    position: 'absolute',
    left: Metrics.doubleBaseMargin,
    top: (Metrics.navBarButtonsContainer +  Metrics.baseMargin * 2) + Metrics.baseMargin  + ifIphoneX(30, 0),
    width: Metrics.screenWidth - Metrics.doubleBaseMargin * 2,
  },

  titleWithoutButton:{
    top: Metrics.tripleBaseMargin + Metrics.baseMargin  + ifIphoneX(30, 0),
  },

  backButton: {
    marginTop:  ifIphoneX(30, 0),
  	marginRight: Metrics.baseMargin,
  },
  containerCounter:{
  	flex: 0.9,
  	height: Metrics.doubleBaseMargin,
  	justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.smallMargin
  },
  counter: {
  	color: Colors.defaultNavColor,
  	fontFamily: Fonts.headerCounter,
  },

  counterTotal:{
  	color: Colors.defaultNavColor
  },
  title: {
  	...Fonts.style.headerTitle,
  	color: Colors.defaultNavColor,
  	marginBottom: Metrics.baseMargin,
  },
  subtitle: {
  	...Fonts.style.headerSubtitle,
  	color: Colors.defaultNavColor,
  	marginBottom: Metrics.baseMargin
  },
  containerImage:{
  	flex: 1,
  	alignItems: 'flex-end',
  },
  image:{

  },
  wrapper:{
    width: '100%',
    flex: 1
  },
  nextButton:{
    width: '100%',
    height: 84,
    backgroundColor: Colors.backgroundInstallation,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  nextButonText:{
    ...Fonts.style.button,
    color: Colors.defaultNavColor,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    alignSelf: 'center',
  }

})
