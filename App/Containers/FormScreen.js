import React, { Component } from 'react'
import { ScrollView, Text, Keyboard, KeyboardAvoidingView, View, TouchableHighlight,TextInput } from 'react-native'
import { Picker } from "native-base";
import {FormatPhone, FormatZip, FormatCPF, validateForm} from '../Transforms'
import Spinner from '../Components/Spinner';

import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import { Colors, Fonts, Metrics } from '../Themes'
import Header from '../Components/Header';
import FormActions from '../Redux/FormRedux'
import CapitalizeFirstLetter from '../Transforms/CapitalizeFirstLetter'

import _ from 'lodash'


import styles from './Styles/FormScreenStyle'

class FormScreen extends Component {
  constructor (props) {
    super(props)
    this.props.reset();
    SplashScreen.hide();
    let disabled = true;

    const fields = [
      {
        id: 'name',
        label: 'Nome',
        type: 'text',
        required: true,
        // value: 'Lucas Pedroza'
      },
      {
        id: 'cpf',
        label: 'CPF',
        type: 'text',
        maxlength: 14,
        required: true,
        // value: '320.860.668-05'
      },

      {
        id: 'zip',
        label: 'CEP',
        type: 'text',
        maxlength: 9,
        required: true,
        // value: '05467-060'
      },

      {
        id: 'street',
        label: 'Logradouro',
        type: 'text',
        required: true,
        // value: 'Avenida X'
      },

      {
        id: 'number',
        label: 'Número',
        type: 'text',
        required: true,
        // value: '123'
      },
      {
        id: 'complement',
        label: 'Complemento',
        type: 'text',
      },
      {
        id: 'district',
        label: 'Bairro',
        type: 'text',
        required: true,
        // value: 'Bairro Y'
      },
      {
        id: 'city',
        label: 'Cidade',
        type: 'text',
        required: true,
        // value: 'Cidade Z'
      },
      {
        id: 'state',
        label: 'Estado',
        type: 'picker',
        required: true,
        // value: 'SP'
      }
    ];

    let userValues = {}

    fields.map((item, index) => {
      if(item.value){
        userValues[item.id] = item.value;
      }
    })



    if(userValues && userValues.hasOwnProperty('name')){
      disabled = false
    }
    this.state = {
      user: userValues,
      formError: {},
      disabled: disabled,
      fields: fields
    }


    // this.checkFilledFields();
    this.onPress = this.onPress.bind(this);
    this.backButton = this.backButton.bind(this);
  }

  backButton(){
    const { navigation } = this.props
    console.log(navigation)
    // removedSection(-1);
    return navigation.goBack();

  }

  changeState(newState){
    this.setState(newState);
  }

  checkFilledFields(){
    const { user, formError } = this.state;
    const { address } = this.props

    let newUser = address && address.state ? {...user, ...address} : {...user};

    this.changeState({
      user: newUser,
      disabled: true
    });

    // console.log('checkFilledFields', newUser)

    if(!_.size(formError)){

      if(newUser &&
        newUser.name &&
        newUser.cpf &&
        newUser.zip &&
        newUser.street &&
        newUser.number &&
        newUser.city &&
        newUser.state){
          this.changeState({disabled: false});
      }
    }
  }

  validateField(field, value){
    const { submitting, disabled, user, formError } = this.state;
    const errorMessage = validateForm(field, value);

    delete formError[field];

    if(errorMessage.length){
      formError[field] = errorMessage;
      this.changeState(formError);
    }

    switch(field){
      case 'phone':
        value = FormatPhone(value);
        break;
      case 'cpf':
        value = FormatCPF(value);
        break;
      case 'zip':
        value = FormatZip(value);

        this.postalChange(value)
        break;
    }

    user[field] = value;

    this.changeState(user);
    this.checkFilledFields();

  }

  postalChange(value){
    const { user } = this.state;
    const { addressRequest } = this.props;
    let zip = value.replace(/\D/g, "");

    if(zip.length < 8){
      return true;
    }

    addressRequest(zip)
  }

  onPress(){
    const { user } = this.state;
    const { submit, navigation } = this.props;
    // console.log('onPress', navigation.state.params, phone)

    const { parent, phone } = navigation.state.params;
    let fromPage = '';
    let isInitial = false;

    if(navigation.state.params.hasOwnProperty('fromPage')){
      fromPage = navigation.state.params.fromPage
    }



    Keyboard.dismiss();


    submit(user, fromPage, parent, phone);
  }



  render () {
    const { user, formError, disabled, fields } = this.state
    const { address, fetching, navigation, error, errorMessage } = this.props

    let newUser = address && address.state ? {...user, ...address} : {...user};

    console.log('navigation', navigation.state.params)

    const defaultPageColor = Colors.backgroundForm;
    const defaultPageColorButton = Colors.backgroundForm;


    const pageColor = Colors['background' + CapitalizeFirstLetter(navigation.state.params.parent)];
    const pageColorButton = Colors['button' + CapitalizeFirstLetter(navigation.state.params.parent)];


    const header = {
      title: 'Informe seus dados cadastrais',
      back: () => {
        return navigation.navigate('initial')
      },
      viewStyle: {
        backgroundColor: pageColor || defaultPageColor,
        pageColorButton: pageColorButton || defaultPageColorButton,
        borderBottomColor: pageColorButton || defaultPageColorButton,
        height: 190
      },
    }




    const total = fields.length -1;
    console.log('loading', fetching, error)

    return (
      <View style={[styles.container, {backgroundColor: header.viewStyle.backgroundColor}]}>
        <ScrollView>
        <Header {...header} />

          {/*<KeyboardAvoidingView>*/}
            {
              fields.map((item, index) => {

                let divider = index!==total;
                let value = newUser && newUser.hasOwnProperty(item.id) ? newUser[item.id] : ''
                let fieldError = formError && formError.hasOwnProperty(item.id) ? formError[item.id] : false
                let autoFocus = index === 0 && value === ''
                let isStatePicker = item.id === 'state'// console.log(_.size(item.options))

                // console.log(item)
                return (
                  <View key={'view' + index} style={[styles.fieldContainer, {borderBottomColor: header.viewStyle.backgroundColor}, divider ? styles.divider : '']}>

                    <Text style={styles.label} textBreakStrategy='simple'>{item.label} {item.hasOwnProperty('required') ? <Text style={styles.errorContainer}>*</Text> : ''}</Text>
                    {
                      isStatePicker ?
                        <Picker
                          key={'picker' + index}
                          selectedValue={newUser[item.id]}
                          mode="dialog"
                          style={styles.picker}
                          textStyle={styles.pickerText}
						  itemStyle={styles.pickerText}
                          itemTextStyle={styles.pickerText }
                          placeholder="Selecione um Estado"
                          prompt="Selecione um Estado"
                          iosHeader="Selecione um Estado"
                          onValueChange={(text) =>{
                            this.validateField(item.id, text);
                          }}
                          >
                            <Picker.Item label="Acre" value="AC" />
                            <Picker.Item label="Alagoas" value="AL" />
                            <Picker.Item label="Amapá" value="AP" />
                            <Picker.Item label="Amazonas" value="AM" />
                            <Picker.Item label="Bahia" value="BA" />
                            <Picker.Item label="Ceará" value="CE" />
                            <Picker.Item label="Distrito Federal" value="DF" />
                            <Picker.Item label="Espírito Santo" value="ES" />
                            <Picker.Item label="Goiás" value="GO" />
                            <Picker.Item label="Maranhão" value="MA" />
                            <Picker.Item label="Mato Grosso" value="MT" />
                            <Picker.Item label="Mato Grosso do Sul" value="MS" />
                            <Picker.Item label="Minas Gerais" value="MG" />
                            <Picker.Item label="Pará" value="PA" />
                            <Picker.Item label="Paraíba" value="PB" />
                            <Picker.Item label="Paraná" value="PR" />
                            <Picker.Item label="Pernambuco" value="PE" />
                            <Picker.Item label="Piauí" value="PI" />
                            <Picker.Item label="Rio de Janeiro" value="RJ" />
                            <Picker.Item label="Rio Grande do Norte" value="RN" />
                            <Picker.Item label="Rio Grande do Sul" value="RS" />
                            <Picker.Item label="Rondônia" value="RO" />
                            <Picker.Item label="Roraima" value="RR" />
                            <Picker.Item label="Santa Catarina" value="SC" />
                            <Picker.Item label="São Paulo" value="SP" />
                            <Picker.Item label="Sergipe" value="SE" />
                            <Picker.Item label="Tocantins" value="TO" />

                        </Picker> :
                        <TextInput
                          key={'input' + index}
                          autoCorrect={false}
                          maxLength={item.maxlength || 255}
                          underlineColorAndroid='transparent'
                          autoFocus={autoFocus}
                          style={styles.input}
                          value={value}
                          onChangeText={(text) => {
                            this.validateField(item.id, text);
                          }}
                        />
                    }



                    {fieldError && <Text style={styles.errorContainer}>{fieldError}</Text>}
                  </View>)
              })
            }

            {
              error &&
               <Text style={[styles.errorContainer]} textBreakStrategy='simple'>{errorMessage ?? 'Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde.'}</Text>
            }

            {

              fetching && !error ?
              <Spinner pageColor={'#fff'}  /> :
              <TouchableHighlight
                onPress={this.onPress}
                style={[styles.nextButton, {backgroundColor: header.viewStyle.pageColorButton}]}
                disabled={disabled}
                underlayColor={'transparent'}>
                  <Text style={[styles.nextButonText, disabled ? styles.disabledButton : '' ]} textBreakStrategy='simple'>{error ? 'Tentar novamente?' : 'Cadastrar'}</Text>
              </TouchableHighlight>
            }

          {/*</KeyboardAvoidingView>*/}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('mapStateToProps', state)
  return {
    addressFetching: state.form.addressFetching,
    fetching: state.form.fetching,
    address: state.form.address,
    error: state.form.error,
    errorMessage:  state.form.errorMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removedSection: (removedIndex) => {
      return dispatch(HomeActions.removedSection(removedIndex, true))
    },
    submit: (user, fromPage, parent, phone ) => dispatch(FormActions.submit(user, fromPage, parent, phone)),
    addressRequest: (zip) => dispatch(FormActions.addressRequest(zip)),
    reset: () => dispatch(FormActions.reset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen)
