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

class LoginScreen extends Component {
  constructor (props) {
    super(props)

    const { navigation, error, logged, fetching } = this.props;
    const { parent, fromPage } = navigation.state.params;
    let routeName = parent ? parent : fromPage;
    let action = parent === 'visits' ? 'home' : 'form';

    this.state = {
      //phone: '(16) 99643-3112',//(11) 99247-2305',//null,
      phone: null,
      disabled: false, //true,
      loading: false,
      error: false,
      fetching: false,
      routeName: routeName
    }

    // AsyncStorage.removeItem('@Login:logged')

    if(parent || fromPage){

      AsyncStorage.getItem('@Login:phone').then((phone) => {
        // console.log('login navigate', phone, fromPage, parent, phone)

        if(phone !== null){
          // NavigationActions.pop()
          navigation.dispatch(NavigationActions.navigate({
            routeName: routeName,
            action: NavigationActions.navigate({
              routeName: action,
              params: {
                logged: true,
                fromPage: fromPage || '',
                parent: parent,
                phone: phone
              }
            })
          }))


        }
        else{
          this.setState({
            loading: false
          })
        }
      })
    }


    SplashScreen.hide();

    this.onPress = this.onPress.bind(this);
    this.backButton = this.backButton.bind(this);
  }

  onPress(){
    const { phone } = this.state
    const { navigation, login } = this.props;
    const { fromPage, isInitial, logged, parent } = navigation.state.params;
    if (!phone) {
      return;
    }
    Keyboard.dismiss();


    this.setState({
      submiting: true
    })

    // if(ohibe)
    login(phone, fromPage, parent);
  }

  backButton(){
    const { navigation } = this.props

    navigation.goBack();

  }

  validateField(field, value){
    value = FormatPhone(value);

    this.setState({
      phone: value,
      disabled: value.length < 15
    })
  }

  render () {
    const { phone, disabled, submiting } = this.state;
    const { navigation, error, logged, fetching } = this.props;
    const { loading } = this.state;

    const { fromPage, isInitial } = navigation.state.params;

    let actualArea = this.state.routeName || 'assistance';
    let actualError = null;

    const pageColor = Colors['background' + CapitalizeFirstLetter(actualArea)];
    const pageColorButton = Colors['button' + CapitalizeFirstLetter(actualArea)];

    switch(error){
      case 'unauthorized':
        actualError = 'O número digitado não está autorizado.';
        break;
      case 'fail':
        actualError = 'Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde.';
    }


    return (
      <View style={[styles.wrapper]}>
        {
          loading ? <Spinner pageColor={pageColor}  /> :
          <KeyboardAvoidingView style={[styles.container, styles.containerFull, {backgroundColor: pageColor}]} behavior='height'>
              <View style={[styles.titleContainer]}>
              {!isInitial &&
                <View style={[styles.buttonsContainer]}>
                  <TouchableHighlight
                    onPress={this.backButton}
                    underlayColor={'transparent'}
                    style={styles.backButton}>
                    <ResponsiveImage
                      source={Images.icons.backButtonWhite}
                      initWidth={20}
                      initHeight={26} />
                  </TouchableHighlight>
                </View>
              }

                  <Text style={styles.title} textBreakStrategy='simple'>Qual é o número do seu celular com DDD?</Text>

                  <TextInput
                    autoCorrect={false}
                    maxLength={15}
                    ref="login"
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    autoFocus={true}
                    style={styles.input}
                    value={phone}
                    onChangeText={(text) => {
                      this.validateField('phone', text);
                    }}
                  />
                  {
                    error &&
                    <Text style={[styles.error]} textBreakStrategy='simple'>{actualError}</Text>
                  }
              </View>

              {
                fetching && !error ?
                <Spinner pageColor={'#fff'}  /> :
                <TouchableHighlight
                  onPress={this.onPress}
                  style={[styles.nextButton, {backgroundColor: pageColorButton}]}
                  disabled={disabled}
                  underlayColor={'transparent'}>
                    <Text style={[styles.nextButonText, disabled ? styles.disabledButton : '' ]} textBreakStrategy='simple'>{error ? 'Tentar novamente?' : 'Continuar'}</Text>
                </TouchableHighlight>
              }
          </KeyboardAvoidingView>
      }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    logged: state.login.logged
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (phone, fromPage, parent) => dispatch(LoginActions.loginRequest(phone, fromPage, parent)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
