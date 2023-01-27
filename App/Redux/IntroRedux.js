import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  introRequest: null,
  introSuccess: ['payload'],
  introFailure: null,
  introSkiped: null,
  intro: null
})

export const IntroTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  skip: null
})

/* ------------- Selectors ------------- */

export const IntroSelectors = {
  getData: state => state.data,
  isSkiped: state => state.skip
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => {
  return state.merge({ fetching: true})
}

// successful api lookup
export const success = (state, action) => {

  // console.log('success', state, action)
 
  return state.merge({ fetching: false, error: null })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

// Something went wrong somewhere.
export const skip = state => {
  // console.log('skiped')

  /*AsyncStorage.setItem('@Intro:skiped', 'true').then((isSkiped) => {
    return state.merge({ skiped: true })
  })*/
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INTRO_REQUEST]: request,
  [Types.INTRO_SUCCESS]: success,
  [Types.INTRO_FAILURE]: failure,
  [Types.INTRO_SKIPED]: skip
})
