import { Platform, StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

  

export default StyleSheet.create({
   container: {
    height: Platform.OS === 'ios' ? Metrics.screenHeight : Metrics.navBarHeight + 10,
    justifyContent: 'flex-end'
  },
  containerFull:{
    maxHeight: Metrics.screenHeight - 60
  },
  buttonsContainer:{
  	flex: 1,
  	flexDirection: 'row'
  },
  titleContainer:{
		// flex: 1,
    position: 'absolute',
    left: Metrics.doubleBaseMargin,
    top: (Metrics.baseMargin * 2) + Metrics.baseMargin,
    width: Metrics.screenWidth - Metrics.doubleBaseMargin * 2,
  },
  title: {
  	...Fonts.style.headerTitle,
  	color: Colors.defaultNavColor,
  	marginBottom: Metrics.baseMargin,
  	marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
  input:{
  	...Fonts.style.headerTitle,
  	color: Colors.inputColor,
  	// borderColor: 'red'
  },
  wrapper:{
    width: '100%',
    flex: 1
  },
  contentPadding:{
    padding: Metrics.baseMargin * 2,
    paddingTop: (Metrics.baseMargin * 2) + Metrics.baseMargin,
    backgroundColor: Colors.defaultBackgroundNav,
    borderBottomWidth: Metrics.borderBottomWidthNav,
    borderBottomColor: Colors.defaultNavBorder
  },
  nextButton:{
    width: '100%',
    left: 0,
    right: 0, 
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
  },
  disabledButton:{
  	color: 'grey'
  },
  error:{
  	...Fonts.style.button,
  	color: Colors.error
  }
})
