import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  login: require('./LoginRedux').reducer,
  intro: require('./IntroRedux').reducer,
  home: require('./HomeRedux').reducer,
  homeInstallation: require('./HomeInstallationRedux').reducer,
  visits: require('./VisitsRedux').reducer,
  form: require('./FormRedux').reducer,

})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  // if (ReduxPersist.active && false) {
  //   const persistConfig = ReduxPersist.storeConfig
  //   finalReducers = persistReducer(persistConfig, reducers)
  // }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
