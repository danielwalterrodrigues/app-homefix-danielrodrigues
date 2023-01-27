import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  visitsRequest: ['visits'],
  visitsSuccess: ['visits'],
  visitsFailure: null,
  cancelRequest: ['modalItem'],
  cancelSuccess: ['visit'],
  cancelFailure: null,
  datesRescheduleRequest: ['modalItem'],
  datesRescheduleSuccess: ['dates'],
  datesRescheduleFail: ['dates'],
  periodsRescheduleRequest: ['visit', 'date'],
  periodsRescheduleSuccess: ['periods'],
  periodsRescheduleFail: ['periods'],
  sendRescheduleRequest: ['visit', 'date', 'hour'],
  sendRescheduleSuccess: ['date', 'hour'],
  sendRescheduleFail: null,
  toggleModal: ['toggle'],
  toggleSuccess: ['toggle']
})

export const VisitsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  // visits: null,
  modalVisible: false,
  modalSuccess: false,
  error: null,
  avaliablePeriods: null,
  periodsUnavaliable: false,
  modalItem: false
})

/* ------------- Selectors ------------- */

export const VisitsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, visits: [] })

// successful api lookup
export const success = (state, { visits }) => {
  console.log('success', visits)
  return state.merge({ fetching: false, error: null, visits: visits })
}

export const clean = state => {
  return state.merge({
	  data: null,
	  fetching: null,
	  error: null
  })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, visits: null, modalVisible: true })


// request the data from an api
export const cancelRequest = (state, { modalItem }) => {
  console.log('cancel request', visit)
  let visit = modalItem.id;
  return state.merge({ fetching: true, visit, modalItem, error: false, modalSuccessSchedule: null})
}

// successful api lookup
export const cancelSuccess = (state, { visit }) => {
  console.log('cancel success', visit)
  return state.merge({ fetching: false, error: false  , modalVisible: true, modalSuccess: true})
}

export const cancelFailure = (state, {response}) => {
  console.log('cancel fail', state, response)
  return state.merge({ fetching: false, error: true, modalVisible: true })
}

export const toggleModal = (state, { toggle }) => {
  return state.merge({ modalVisible: toggle });
}

export const toggleSuccess = (state, { toggle }) => {
  return state.merge({ modalSuccess: toggle});
}


export const datesRescheduleRequest = (state, {modalItem}) => {
  let visit = modalItem.id;
  return state.merge({ fetching: true, visit, modalItem, avaliablePeriods: null, error: false, modalSuccessSchedule: null })
}
export const datesRescheduleSuccess = (state, {dates}) => {
  console.log('dates success', state)
  return state.merge({ fetching: false , modalVisible: false, modalSuccess: false, error: false })
}
export const datesRescheduleFail = (state, {}) => {

  return state.merge({ fetching: false , modalVisible: true, error: true });
}
export const periodsRescheduleRequest = (state, {visit, date}) => {
  console.log('periods request', state)
  return state.merge({ fetching: true, visit , date, avaliablePeriods: null, periodsUnavaliable: false, error: false});
}
export const periodsRescheduleSuccess = (state, {periods}) => {
  console.log('periods success', state)
  return state.merge({ fetching: false, avaliablePeriods: periods, periodsUnavaliable: false , error: false})
}

export const periodsRescheduleFail = (state, {}) => {
  console.log('periods success', state)
  return state.merge({ fetching: false, periodsUnavaliable: true })
}
export const sendRescheduleRequest = (state, {visit, date, hour}) => {
  console.log('sendRescheduleRequest request', state)
  return state.merge({ fetching: true, visit, date, hour, error: false});
}
export const sendRescheduleSuccess = (state, {date, hour}) => {
  console.log('periods success', state)
  let modalSuccessSchedule = [date, hour.description, hour.time].join(' - ')
  return state.merge({ fetching: false, modalVisible: true, modalSuccess: true, modalSuccessSchedule, error: false })
}

export const sendRescheduleFail = (state, {}) => {
  console.log('periods success', state)
  return state.merge({ fetching: false , modalVisible: true, error: true });
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VISITS_REQUEST]: request,
  [Types.VISITS_SUCCESS]: success,
  [Types.VISITS_FAILURE]: failure,
  [Types.CANCEL_REQUEST]: cancelRequest,
  [Types.CANCEL_SUCCESS]: cancelSuccess,
  [Types.CANCEL_FAILURE]: cancelFailure,
  [Types.DATES_RESCHEDULE_REQUEST]: datesRescheduleRequest,
  [Types.DATES_RESCHEDULE_SUCCESS]: datesRescheduleSuccess,
  [Types.DATES_RESCHEDULE_FAIL]: datesRescheduleFail,
  [Types.PERIODS_RESCHEDULE_REQUEST]: periodsRescheduleRequest,
  [Types.PERIODS_RESCHEDULE_SUCCESS]: periodsRescheduleSuccess,
  [Types.PERIODS_RESCHEDULE_FAIL]: periodsRescheduleFail,
  [Types.SEND_RESCHEDULE_REQUEST]: sendRescheduleRequest,
  [Types.SEND_RESCHEDULE_SUCCESS]: sendRescheduleSuccess,
  [Types.SEND_RESCHEDULE_FAIL]: sendRescheduleFail,
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.TOGGLE_SUCCESS]: toggleSuccess,
})
