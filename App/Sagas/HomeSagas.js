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

import { call, put, select } from 'redux-saga/effects'
import HomeActions, {HomeSelectors} from '../Redux/HomeRedux'
// import { HomeSelectors } from '../Redux/HomeRedux'

export function * home (api,  { area } ) {

  // console.log('action', action)
  // const { area } = action;
  // get current data from Store
  const currentData = yield select(HomeSelectors.getData)

  // console.log('currentData', currentData)
  // make the call to the api
  const response = yield call(api.getHomeSections, area)

  // console.log('response home saga' , response)
  // success?
  if (response.ok) {
    const sections = response.data;
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(HomeActions.homeSuccess(sections))
  } else {
    yield put(HomeActions.homeFailure())
  }
}
