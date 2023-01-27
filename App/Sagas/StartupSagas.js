import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { is } from 'ramda'
import { IntroSelectors } from '../Redux/IntroRedux'
// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar
export const selectIntroStatus = (state) => {
  // console.log(state)
  return IntroSelectors.isSkiped(state)
}

// process STARTUP actions
export function * startup (action) {
  /*const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }*/

  // const isSkiped = yield select(selectIntroStatus);

  // console.log('isSkiped', isSkiped)
  // if (isSkiped) {
  //   yield put({skiped: true})
  // }
}
