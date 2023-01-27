import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { IntroTypes } from '../Redux/IntroRedux'
import { HomeTypes } from '../Redux/HomeRedux'
import { HomeInstallationTypes } from '../Redux/HomeInstallationRedux'
import { VisitsTypes } from '../Redux/VisitsRedux'
import { FormTypes } from '../Redux/FormRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { intro } from './IntroSagas'
import { home } from './HomeSagas'
import { homeInstallation } from './HomeInstallationSagas'
import { getVisits, cancelVisit, datesReschedule, periodsReschedule, sendReschedule} from './VisitsSagas'
import { addressRequest, submitForm, periodsRequest, sendSchedule } from './FormSagas'

// import { getUserAvatar } from './GithubSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    // console.log('root', getAddress)
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(IntroTypes.INTRO_REQUEST, intro, api),
    takeLatest(HomeTypes.HOME_REQUEST, home, api),
    takeLatest(HomeInstallationTypes.HOME_INSTALLATION_REQUEST, homeInstallation, api),
    takeLatest(VisitsTypes.VISITS_REQUEST, getVisits, api),
    takeLatest(VisitsTypes.CANCEL_REQUEST, cancelVisit, api),
    takeLatest(VisitsTypes.DATES_RESCHEDULE_REQUEST, datesReschedule, api),
    takeLatest(VisitsTypes.PERIODS_RESCHEDULE_REQUEST, periodsReschedule, api),
    takeLatest(VisitsTypes.SEND_RESCHEDULE_REQUEST, sendReschedule, api),
    takeLatest(FormTypes.ADDRESS_REQUEST, addressRequest, api),
    takeLatest(FormTypes.SUBMIT, submitForm, api),
    takeLatest(FormTypes.PERIODS_REQUEST, periodsRequest, api),
    takeLatest(FormTypes.SEND_SCHEDULE, sendSchedule, api),




    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ]
}
