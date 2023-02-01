import ReduxPersist from '../Config/ReduxPersist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore } from 'redux-persist'
import StartupActions from '../Redux/StartupRedux'
import IntroActions from '../Redux/IntroRedux'
import DebugConfig from '../Config/DebugConfig'

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const startup = () => store.dispatch(StartupActions.startup())
  // const intro = () => store.dispatch(IntroActions.intro())

  // console.log(reducerVersion)
  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      if (DebugConfig.useReactotron) {
        console.tron.display({
          name: 'PURGE',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion
          },
          preview: 'Reducer Version Change Detected',
          important: true
        })
      }
      // Purge store
      persistStore(store, null, startup).purge()
      // persistStore(store, null, intro).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, null, startup)
      // persistStore(store, null, intro)
    }
  }).catch(() => {
    persistStore(store, null, startup)
    // persistStore(store, null, intro)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default { updateReducers }
