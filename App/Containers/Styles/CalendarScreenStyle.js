import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundForm,// marginTop: Metrics.navBarHeight,
    height: Metrics.screenHeight

  },
  hourContainer: {

  },
  error: {
  	...Fonts.style.button,
  	color: Colors.error,
  	padding: Metrics.doubleBaseMargin

  },
  title:{
  	...Fonts.style.collapsibleTitle,
  	padding: Metrics.doubleBaseMargin,
  	color: Colors.black
  },
  icon:{
  	marginLeft: Metrics.doubleBaseMargin
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
  nextButtonReschedule:{
    width: '100%',
    height: 84,
    backgroundColor: Colors.backgroundInstallation,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextButonText:{
    ...Fonts.style.button,
    color: '#ffffff',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    alignSelf: 'center',
  },
  disabledButton:{
  	color: 'grey'
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.9)'
	},
	modal: {
	  width: Metrics.screenWidth,
	  height: Metrics.screenHeight / 1.2,
	  backgroundColor: Colors.white,
	  alignItems: 'center',
    padding: Metrics.doubleBaseMargin,
    paddingLeft: 0,
    paddingRight: 0
	},

  modalTitle: {
    ...Fonts.style.headerSubtitle,
    padding: Metrics.doubleBaseMargin,
    color: Colors.black,
    textAlign: 'center'
  },
  modalContent: {
    ...Fonts.style.collapsibleTitle,
    marginBottom: Metrics.doubleBaseMargin,
    alignItems: 'center',
    textAlign: 'center'
  }
})
