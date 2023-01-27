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
import VisitsActions from '../Redux/VisitsRedux'
import {AsyncStorage} from 'react-native'
// import { VisitsSelectors } from '../Redux/VisitsRedux'
import { NavigationActions } from 'react-navigation'
import Moment from 'moment'

const getVisits = function * (api, { visits }) {
  // if(!visits){

    console.log('getVisits logged')
    const response = yield call(api.getVisits);

    console.log(response )
    if (response.ok) {
      visits = response.data.visitas
    }
    else {
      yield put(VisitsActions.visitsFailure())
      return false
    }
  // }


  const visitsResponse = yield call(api.modifyVisits, visits)
  yield put(VisitsActions.visitsSuccess(visitsResponse))
}

const cancelVisit = function * (api, {modalItem}) {
  let visit = modalItem.id;
  console.log('cancelVisit logged', visit)
  if(visit){
    const response = yield call(api.cancelVisit, visit);

    console.log('response', response )
    if (!response.ok) {
      yield put(VisitsActions.cancelFailure())
      return false
    }
  }

  yield put(VisitsActions.cancelSuccess(visit))
}


const datesReschedule = function * (api, {modalItem}) {
  let visit = modalItem.id;
  console.log('datesReschedule', visit)

  if(visit){
    const response = yield call(api.datesReschedule, visit);

    if (response.ok) {
      let result = response.data[0];
      if(result.flOk === 1){
        var dates = {},
        formated = result.DATAS.map((value) => {
            let date = value.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, '$3-$2-$1');
            dates[date] = {marked:true};
            return date;
          });
        console.log('PORRRAR dates', dates);
        yield put(VisitsActions.datesRescheduleSuccess(dates));
        yield put(VisitsActions.toggleModal(false));
        yield put(NavigationActions.navigate({
          routeName: 'reschedule',
          params: {
            visit: visit,
            dates: {
              minDate: formated[0],
              maxDate: formated[formated.length - 1],
              futureScrollRange: Moment(formated[formated.length - 1]).diff(formated[0], 'months'),
              markedDates: dates
            }
          }
        }));
        return true;
      }
    }
  }
  yield put(VisitsActions.datesRescheduleFail());
  return false;
  // yield put(VisitsActions.cancelSuccess(visit))
}


const periodsReschedule = function * (api, { visit, date }) {
  console.log('periodsReschedule', visit)
  if(visit){
    const response = yield call(api.periodsReschedule, visit, date);
    console.log('PERIOD RESULT', response);
    if (response.ok) {
      let result = response.data[0];
      if(result.flOk === 1){
        let avaliablePeriods = result.VISITA_PERIODO.map((hour) => {
            return {
              id: hour.ID_VISITA_PERIODO,
              description: hour.DESCRICAO,
              time: Moment(hour.HR_INICIO).format('HH') + 'h às ' + Moment(hour.HR_FIM).format('HH') + 'h' + Moment(hour.HR_FIM).format('mm')
            }
        });

        yield put(VisitsActions.periodsRescheduleSuccess(avaliablePeriods));
        return true;
      }
    }
  }
  yield put(VisitsActions.periodsRescheduleFail());
  return false;
}
const sendReschedule = function * (api, { visit, date, hour }) {
  console.log('sendReschedule', visit)
  if(visit){
    console.log('PPPPAPAPSPAPSPAS sendReschedule',  visit, date, hour)
    const response = yield call(api.sendReschedule, visit, date, hour);
    console.log('sendReschedule RESULT', response);
    if (response.ok) {
      let result = response.data[0];
      console.log('SEND RESULT', response);
      if(result.flOk === 1 && result.RETORNO.COD_RETORNO === 0 ){

        yield put(VisitsActions.sendRescheduleSuccess(date, hour));
        yield put(NavigationActions.back());
        return true;
      }
    }
  }
  yield put(VisitsActions.sendRescheduleFail());
}
export {
  getVisits,
  cancelVisit,
  datesReschedule,
  periodsReschedule,
  sendReschedule
}
