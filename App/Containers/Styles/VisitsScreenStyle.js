import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultViewBackground,// marginTop: Metrics.navBarHeight,
    // borderWidth: 1
    
  },
  noVisits: {
  	...Fonts.style.collapsibleTitle,
  	padding: Metrics.tripleBaseMargin,
  	color: Colors.black
  }
})
