import AppNavigation from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)

  // console.log(state, action, newState)
  return newState || state
}
