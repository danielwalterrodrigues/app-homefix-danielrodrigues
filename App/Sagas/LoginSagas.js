import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationActions } from 'react-navigation';
// attempts to login
export function * login (api, { phone, fromPage, parent }) {
  const phoneNumber = phone.replace(/\D/g,"")
  const response = yield call(api.loginUser, phoneNumber)

  console.log('login response', response)

  if (response.ok) {
    const result = response.data.produto.response.pop();
    const visits = response.data.visitas ? response.data.visitas.pop() : [];
    if(result.status === 'NO'){
    	yield put(LoginActions.loginFailure('unauthorized'))
    }
    else{
      let routeName = parent ? parent : fromPage;
      let action = parent === 'visits' ? 'home' : 'form'
      let params = {
        logged: true,
        fromPage: fromPage,
        parent: parent,
        phone: phone
      }
      console.log('login', response)
      // console.log('login Saga', routeName, action, parent, fromPage);

      if(parent === 'visits'){
        params.loginVisits = visits;
      }

      AsyncStorage.setItem('@Login:phone', phone)
      // AsyncStorage.setItem('@Login:visits',  JSON.stringify(visits))

      yield put(LoginActions.loginSuccess())
      // NavigationActions.pop()
      yield put(NavigationActions.navigate({
        index: 0,
        routeName: routeName,

        action: NavigationActions.navigate({
          routeName: action,
          params: params
        })
      }));
    }
  }
  else {
    yield put(LoginActions.loginFailure('fail'))
  }

}
