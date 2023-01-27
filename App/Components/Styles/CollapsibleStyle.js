import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  listContainer:{
    margin: 0,
    padding: 0,
    borderBottomColor: Colors.defaultNavBorder
  },
  listNoBorder:{
    paddingLeft:0,
    paddingRight:0,
  	borderBottomWidth: 0
  },
  titleView: {
    margin: 0,
    padding: 0,
  },
  titleViewWithIcon: {
    margin: 0,
    padding: 0,
    marginLeft: Metrics.tripleBaseMargin * 1.25,
  },
  title:{
  	...Fonts.style.collapsibleTitle,
    padding: Metrics.tripleBaseMargin * .75,
    paddingRight: Metrics.tripleBaseMargin * 1.5,
  	color: Colors.black
  },
  titleWithSubtitle:{
    ...Fonts.style.collapsibleTitle,
    padding: Metrics.tripleBaseMargin,
    paddingTop: 0,
    paddingBottom: 0,
    color: Colors.black
  },
  titleButton:{
		...Fonts.style.button,
		color: Colors.defaultButtonColor
	},
  icon:{
    position: 'absolute',
    right: 0,
    top: 0,
  	marginRight: Metrics.tripleBaseMargin,
    alignSelf: 'flex-start' ,
    marginTop:  Metrics.tripleBaseMargin
  },
  iconVisit:{
    position: 'absolute',
    right: (Metrics.doubleBaseMargin * .5),
    top: (Metrics.doubleBaseMargin * .5),
  },
  leftIcon:{
    position: 'absolute',
    left: (Metrics.doubleBaseMargin * .5),
    top: (Metrics.doubleBaseMargin * .9),
  },
  leftIconWithSubtitle:{
    left: (Metrics.doubleBaseMargin * .75),
    top: (Metrics.doubleBaseMargin * .25),
  },
  listSubtitle:{
    width: '100%',
    left:0,
    right: 0,
    margin: 0,
    padding: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0
  },
  subtitle:{
    ...Fonts.style.listSubtitle,
    margin: 0,
    padding: Metrics.tripleBaseMargin,
    paddingTop: Metrics.tripleBaseMargin * .05,
    paddingBottom: 0,
    color: Colors.gray
  },
  wrapper:{
    width: '100%',
    margin: 0,
    padding: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  descriptionView:{
    left: 0,
    right: 0,
    width: '100%',
    margin: 0,
    padding: Metrics.tripleBaseMargin * .75,
    marginTop: Metrics.tripleBaseMargin * .30,
    borderTopWidth: 1,
	},
  description:{
    ...Fonts.style.collapsibleTitle,
    width: '100%',
    margin: 0,
    padding: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
  	color: Colors.black
  },
	button:{
    width: '100%',
    margin: 0,
    padding: 0,
    height: 84,
    backgroundColor: '#660099',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: Colors.white,
    borderTopWidth: 1,
  },
  buttonText:{
    ...Fonts.style.button,
    color: Colors.white,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)'
	},
	modal: {
	  width: Metrics.screenWidth,
	  backgroundColor: Colors.white,
	  alignItems: 'center',
	},

  modalTitle: {
    ...Fonts.style.modalText,
    padding: Metrics.doubleBaseMargin,
    color: Colors.black,
    textAlign: 'center'
  },
  modalContent: {
    ...Fonts.style.modalText,
    marginBottom: Metrics.doubleBaseMargin,
    alignItems: 'center',
    textAlign: 'center'
  }
})
