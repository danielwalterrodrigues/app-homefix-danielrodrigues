/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import FormActions from '../Redux/FormRedux'
import HomeActions from '../Redux/HomeRedux'
import HomeInstallationActions from '../Redux/HomeInstallationRedux'

import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash'
import Moment from 'moment'
// import { FormSelectors } from '../Redux/FormRedux'

const addressRequest = function *(api, { zip }) {

  const response = yield call(api.getAddress, zip)

  if (response.ok) {
    const address = {
      street: response.data.logradouro,
      district: response.data.bairro,
      city: response.data.localidade,
      state: response.data.uf,
    }

    yield put(FormActions.addressSuccess(address))
  } else {
    yield put(FormActions.addressFailure())
  }
}

const submitForm = function *(api, { user, fromPage, parent, phone }) {
  let newUser = {
    ...user,
    phone: phone
  }
  let routeName = parent ? parent : fromPage;
  let action = 'calendar'
  let dates = []
  let newDates = {}
  let response = yield call(api.submitForm, newUser)

  console.log('submitForm', response)

  if (response.ok) {
    let result = response.data.pop();
    console.log('result', result)
    if(result.flOk === 1){
      newUser.clientId = result.ID_CLIENTE;

      let response = yield call(api.getDates, newUser)
      console.log('response getDates', response)
      if (response.ok) {
        let resultD = response.data.pop();
        console.log('result getDates', resultD)
        if(resultD.flOk === 1){
          dates = resultD.DATAS


          _.forEach(dates, (value) => {
            value = value.split('/');
            value = value[2] + '-' + value[1] + '-' + value[0];

            newDates[value] = {
              marked: true,
            }
          })

          const minDate = Object.keys(newDates)[0];
          const maxDate = Object.keys(newDates)[Object.keys(newDates).length-1];

          newUser.dates = {
            minDate: minDate,
            maxDate: maxDate,
            futureScrollRange: Moment(maxDate).diff(minDate, 'months'),
            markedDates: newDates
          }

          // console.log('after get dates', newUser)
          AsyncStorage.setItem('@User', JSON.stringify(newUser))

          // console.log('submitForm navigationActions', newUser, routeName, action, fromPage, parent)
          yield put(FormActions.success())
          yield put(NavigationActions.navigate({
            index: 0,
            routeName: routeName,
            action: NavigationActions.navigate({
              routeName: action,
              params: {
                logged: true,
                fromPage: fromPage || '',
                parent: parent,
                user: newUser
              },
            }),
          }));
        }
        else{
          console.log('Taki Error')
          var errorMessage = (resultD.MENSAGEM_RETORNO == 'ERRO Endereco nao localizado') ? 'CEP inválido, favor confirmar no cadastro dos Correios.': null;
          yield put(FormActions.failure(errorMessage))
        }
      }
      else{
        console.log('Taki Error')
        yield put(FormActions.failure())
      }


    }
    else{
      console.log('Taki Error')
      yield put(FormActions.failure())
    }
  } else {
    yield put(FormActions.failure())
  }
}


const periodsRequest = function *(api, { selected, user }) {
  console.log('periodsRequest', selected, user);

  let response = yield call(api.periodsRequest, selected, user)
  console.log('response periodsRequest', response)
  if (response.ok) {
    let result = response.data.pop();
    console.log('result periodsRequest', result)
    if(result.flOk === 1){
      let periodsResult = result.VISITA_PERIODO;
      let avaliablePeriods = [];

      _.forEach(periodsResult, (hour) => {

        avaliablePeriods.push({
          id: hour.ID_VISITA_PERIODO,
          description: hour.DESCRICAO,
          time: Moment(hour.HR_INICIO).format('HH') + 'h às ' + Moment(hour.HR_FIM).format('HH') + 'h' + Moment(hour.HR_FIM).format('mm')
        })

      });

      console.log('avaliablePeriods', avaliablePeriods)

      yield put(FormActions.periodsSuccess(avaliablePeriods))
    }
    else{
      yield put(FormActions.periodsFailure())
    }
  }
  else{
      yield put(FormActions.periodsFailure())
    }
}

const sendSchedule = function *(api, { user, parent, pageAnswers, pageTakiSelection }) {
  console.log('sendSchedule', user, parent, pageAnswers);

  let response = yield call(api.sendSchedule, user, pageTakiSelection)
  let routeName = parent ? parent : fromPage;
  let action = 'success'
  console.log('sendSchedule', response)
  if (response.ok) {
    let result = response.data.pop();

    if(result.flOk === 1){
      const visitId = result.RETORNO.ID_VISITA;

      console.log(visitId)
      if(visitId){
         let sendAnswers = yield call(api.sendAnswers, visitId, pageAnswers)
         console.log('sendAnswers', sendAnswers)
         if (sendAnswers.ok) {
          let result = sendAnswers.data.pop();
          console.log('result sendAnswers', result)

          if(result.flOk === 1){
             yield put(FormActions.scheduleSuccess(visitId))

             //
             yield put(HomeActions.clean());
             yield put(HomeInstallationActions.clean());

             yield put(NavigationActions.navigate({
              index: 0,
              routeName: routeName,
              action: NavigationActions.navigate({
                routeName: action,
                params: {
                  visitId: visitId,
                  user: user
                },
              }),
            }));
          }
          else{
            yield put(FormActions.scheduleFailure())
          }
        }
        else{
          yield put(FormActions.scheduleFailure())
        }
      }
      else{
        yield put(FormActions.scheduleFailure())
      }

      //let send = yield call(api.sendSchedule, user)
    }
    else{
      yield put(FormActions.scheduleFailure())
    }
  }
  else{
    yield put(FormActions.scheduleFailure())
  }
}

export {
  addressRequest,
  submitForm,
  periodsRequest,
  sendSchedule
}
