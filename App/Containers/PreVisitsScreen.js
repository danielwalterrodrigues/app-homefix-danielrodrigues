import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableHighlight, TextInput, AsyncStorage , Keyboard, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
import Spinner from '../Components/Spinner';
import { NavigationActions } from 'react-navigation';

import FormatPhone from '../Transforms/FormatPhone'
import CapitalizeFirstLetter from '../Transforms/CapitalizeFirstLetter'

import SplashScreen from 'react-native-splash-screen'

import LoginActions from '../Redux/LoginRedux'

// Styles
import ResponsiveImage from 'react-native-responsive-image';
// import PropTypes from 'prop-types';

import { Images, Colors } from '../Themes'

import styles from './Styles/LoginScreenStyle'

class PreVisitsScreen extends Component {

  constructor (props) {
    super(props)


    const { navigation, error, logged, fetching } = this.props;

    let parent = 'visits';


      AsyncStorage.getItem('@Login:phone').then((phone) => {
        let action = phone ? 'home' : 'login';
        let params = {
          logged: !!phone,
          fromPage: '',
          parent: parent
        }
        if (phone) {
          params.phone = phone;
        }
        navigation.dispatch(NavigationActions.navigate({
          routeName: parent,
          action: NavigationActions.navigate({
            routeName: action,
            params: params
          })
        }))

      })
      SplashScreen.hide();
    }
	
	
	componentWillFocus

  render () {
    const { navigation } = this.props;
    let actualArea = navigation.state && navigation.state.props && navigation.state.props.actualArea ? navigation.state.props.actualArea : 'assistance';
    const pageColor = Colors['background' + CapitalizeFirstLetter(actualArea)];

    return (
      <View>
          <Spinner pageColor={pageColor}  />
      </View>
    )
  }
}

export default PreVisitsScreen
