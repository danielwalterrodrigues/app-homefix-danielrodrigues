import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import API from '../Services/Api'
const api = API.create()
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // formRequest: ['data'],
  // formSuccess: ['payload'],
  addressRequest: ['zip'],
  addressSuccess: ['address'],
  addressFailure: null,
  submit: ['user', 'fromPage', 'parent', 'phone'],
  success: ['user'],
  failure: ['errorMessage'],
  periodsRequest: ['selected', 'user'],
  periodsSuccess: ['avaliablePeriods'],
  periodsFailure: null,
  setPeriodsUnavaliable: null,
  sendSchedule: ['user', 'parent', 'pageAnswers', 'pageTakiSelection'],
  scheduleSuccess: ['visitId'],
  scheduleFailure: null,
  setLoader: ['type'],
  showModal: ['isVisible'],
  reset: null,
  resetCalendar: null
})

export const FormTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  errorMessage: null,
  address: null,
  loadingHours: null,
  periodsUnavaliable: null,
  avaliablePeriods: null,
  selectedDate: null,
  selectedHour: null,
  user: null,
  submiting: null,
  visitId: null,
  modalVisible: false
})

/* ------------- Selectors ------------- */

export const FormSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// successful api lookup
export const success = (state, action) => {
  const { payload } = action

  // console.log('success', action)
  return state.merge({ fetching: false, error: null })
}

export const addressRequest = (state) => {
  // console.log(state)
  return state.merge({ addressFetching: true, error: null, address:null })
}


export const periodsRequest = (state, { selected, user }) => {

  return state.merge({ loadingHours: true, error: null, user: user, periodsUnavaliable: false, avaliablePeriods: null})
}



export const failure = (state, { errorMessage }) =>
  state.merge({ fetching: false, error: true, errorMessage: errorMessage, payload: null })

export const addressFailure = state =>
  state.merge({ fetching: false, error: true, address: null })

export const periodsFailure = state =>
  state.merge({ loadingHours: false, error: true })

export const scheduleFailure = state =>
  state.merge({ submiting: false, error: true,  modalVisible: !state.selectedDate, visitId: null })

export const addressSuccess = (state, { address }) => {
  // console.log('addressSuccess', state, address)
  return state.merge({ addressFetching: false, error: null, address: address })
}

export const periodsSuccess = (state, { avaliablePeriods }) => {
  console.log('periodsSuccess', avaliablePeriods)
  return state.merge({ loadingHours: false, error: null, avaliablePeriods: avaliablePeriods, periodsUnavaliable: false })
}

export const scheduleSuccess = (state, { visitId }) => {

  return state.merge({ submiting: false, modalVisible: false, visitId: visitId, avaliablePeriods: null })
}

export const submit = (state, { user }) => {
  return state.merge({ fetching: true, error: null, errorMessage: null })
}

export const setPeriodsUnavaliable = state => {
  console.log('setPeriodsUnavaliable')
  return state.merge({periodsUnavaliable: true, loadingHours: false})
}


export const sendSchedule = state => {
  console.log('sendSchedule')
  return state.merge({submiting: true})
}

export const setLoader = (state, {type}) => {
  console.log('setLoader', type)
  return state.merge({[type]: true})
}


export const showModal = (state, {isVisible}) => {
  console.log('showModal', isVisible)
  return state.merge({modalVisible: isVisible, submiting: false})
}


export const reset = state => {
  console.log('RESET');
  return state.merge(INITIAL_STATE);
}
export const resetCalendar = state => {
  console.log('RESET CALENDAR');
  return state.merge({
    loadingHours: null,
    periodsUnavaliable: null,
    avaliablePeriods: null,
    selectedDate: null,
    selectedHour: null,
    user: null,
    submiting: null,
    visitId: null,
    modalVisible: false
  });
}




/*
export const setPeriods = (state, { selected, user }) => {

  return state.merge({ loading: true, error: false, user: user})
}

*/
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.FORM_REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SUBMIT]: submit,
  [Types.ADDRESS_REQUEST]: addressRequest,
  [Types.ADDRESS_SUCCESS]: addressSuccess,
  [Types.ADDRESS_FAILURE]: addressFailure,
  [Types.PERIODS_REQUEST]: periodsRequest,
  [Types.PERIODS_SUCCESS]: periodsSuccess,
  [Types.PERIODS_FAILURE]: periodsFailure,
  [Types.SET_PERIODS_UNAVALIABLE]: setPeriodsUnavaliable,
  [Types.SEND_SCHEDULE]: sendSchedule,
  [Types.SCHEDULE_SUCCESS]: scheduleSuccess,
  [Types.SCHEDULE_FAILURE]: scheduleFailure,
  [Types.SET_LOADER]: setLoader,
  [Types.SHOW_MODAL]: showModal,
  [Types.RESET]: reset,
  [Types.RESET_CALENDAR]: resetCalendar

})
