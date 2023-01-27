import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundForm,// marginTop: Metrics.navBarHeight,
    // borderWidth: 1

  },
  inputContainer:{
    /*marginLeft: 0,
    marginRight: 0,
    paddingLeft: 15,
    paddingRight: 15,*/
    backgroundColor: '#fff',
    // borderBottomWidth: 0
  },
  fieldContainer:{
  	backgroundColor: '#fff',
  	borderBottomWidth: 0,
  	padding: Metrics.doubleBaseMargin,
  	borderBottomWidth: 1,
  	borderBottomColor: Colors.backgroundForm
  },
  label:{
  	...Fonts.style.label,
  	color: Colors.labelColor,
		fontWeight: 'normal',
  },
  input:{
		...Fonts.style.input,
		fontWeight: 'normal',
  	color: Colors.inputFormColor
  },
  nextButton:{
    width: '100%',
    height: 84,
    backgroundColor: Colors.backgroundInstallation,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextButonText:{
    ...Fonts.style.button,
    color: Colors.defaultNavColor,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    alignSelf: 'center',
  },
  errorContainer: {
    ...Fonts.style.label,
    color: Colors.error,
    padding: 20,
    backgroundColor: '#fff'
  },
  disabledButton:{
    color: 'grey'
  },
  picker:{
    paddingTop: 0,
    height: 30
  },
  pickerText:{
    ...Fonts.style.input,
    fontWeight: 'normal',
    color: Colors.inputFormColor,
    paddingLeft: 0,
    paddingRight: 0,
    /*fontWeight: 'normal',
    color: Colors.inputFormColor    */
  }
})
