import React, { Component } from 'react'
import { ScrollView, Text, View, AsyncStorage, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import PropTypes from 'prop-types';
// import { ListItem, Button } from 'react-native-elements'

import { Images, Colors, Fonts, Metrics } from '../Themes'
import CapitalizeFirstLetter from '../Transforms/CapitalizeFirstLetter'
import ResponsiveImage from 'react-native-responsive-image';
import CollapsibleVisit from '../Components/CollapsibleVisit';
import Header from '../Components/Header';
import List from '../Components/List';
import Spinner from '../Components/Spinner';
import VisitsActions from '../Redux/VisitsRedux'

// Styles
import styles from './Styles/VisitsScreenStyle'
const actualArea = 'visits';

class VisitsScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    visitsRequest: PropTypes.func,
  }



  constructor (props) {
    super(props)

	this.state = {
		refreshing: false,
		first: true
	}

	global.visitScreen = this;

    const { navigation, visitsRequest, fetching, visits } = this.props;
    let loginVisits = '';



    if(navigation.state.params){
      let { loginVisits } = navigation.state.params
    }

    console.log(visits, loginVisits)

    if(!visits){
      visitsRequest(loginVisits);
    }

    // SplashScreen.hide();
  }

	reloadContents (){
		const { navigation, visitsRequest, fetching, visits } = this.props;
	    let loginVisits = '';

	    if(navigation.state.params){
	      let { loginVisits } = navigation.state.params
	    }


		visitsRequest(loginVisits);
	}

	_onRefresh (){
		if(!this.state.first){
			this.reloadContents();
		}

		this.state.first = false;
		this.state.refreshing = false;
	}

  render () {
    const { navigation, fetching, visits } = this.props;
    let {selected} = this.props;
    // const { loginVisits } = navigation.state.params;
    // let newVisits = [];
    // const { loading } = this.state;

    const pageColor = Colors['background' + CapitalizeFirstLetter(actualArea)];


    const header = {
      title: 'Minhas Visitas',
      subtitle: 'Acompanhe as\nvisitas agendadas e realizadas',
      image: Images.home[actualArea],
      viewStyle: {
        backgroundColor: pageColor,
        borderBottomColor: pageColor,
      },
      imgStyle:{
        height: 181,
        width: 218,
        marginTop: -60,
        marginRight: -40
      }
    }

    console.log('render visits', visits, fetching)

    // if(visits && !visits.length){
    //   return (
    //     <View>
    //       <Text style={styles.noVisits} textBreakStrategy='simple'>Nenhuma visita agendada até o momento</Text>
    //     </View>)
    // }

    return (
      <View style={styles.container}>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <Header {...header} />
        {
          fetching  ?
            <Spinner pageColor={pageColor}  />
          :
            visits && visits.length > 0 ?
            <CollapsibleVisit
            sections={visits}
            pageColor={pageColor}
            steps={visits && visits.length >= 1 ? true : false} /> :
            <View>
              <Text style={styles.noVisits} textBreakStrategy='simple'>Nenhuma visita agendada até o momento</Text>
            </View>

        }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    fetching: state.visits.fetching,
    visits: state.visits.visits
    // phone: state.form.user.phone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    visitsRequest: (visits) => {
      // console.log('visitsRequest')
      return dispatch(VisitsActions.visitsRequest(visits))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitsScreen)
