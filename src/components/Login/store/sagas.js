import { all, take, put } from 'redux-saga/effects'
import axios from 'axios'
import { LOGIN } from './actionTypes'
import { getChangeLoginAction } from './actionCreators'

function* watch_login() {
  while (true) {
    const action = yield take(LOGIN)
    try {
      const res = yield axios.post(
        'api/Web/Login_check?number=' +
          action.username +
          '&password=' +
          action.password
      )
      const msg = res.data[0]
      yield put(getChangeLoginAction(msg, action.CTableType))
    } catch {
      alert('连接失败！')
    }
  }
}

export default function* LoginSaga() {
  yield all([watch_login()])
}
