import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['phone', 'fromPage', 'parent'],
  loginSuccess: null,
  loginFailure: ['error'],
  logout: null,
  logged: null,
  autoLogin: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false
})


/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => {
  // console.log('request', state)
  return state.merge({ fetching: true })

}

// we've successfully logged in
export const success = (state, { phone, fromPage, parent }) =>{
  // console.log('success', phone, fromPage)

  return state.merge({ fetching: false, error: null, logged: true })
}

// we've had a problem logging in
export const failure = (state, { error }) =>{

  // console.log('failure', error)
  return state.merge({ fetching: false, error })
}

// we've logged out
export const logout = (state) => INITIAL_STATE

// startup saga invoked autoLogin
export const autoLogin = (state) => state

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null