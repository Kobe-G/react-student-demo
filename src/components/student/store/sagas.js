import { all, take, put } from 'redux-saga/effects'
import axios from 'axios'
import {
  change_password,
  look_per,
  update_stu,
  stu_title_list,
} from './actionTypes'
import {
  getChangeInformationAction,
  getChangeTitleListAction,
} from './actionCreators'

function* watch_change_password() {
  while (true) {
    const action = yield take(change_password)
    try {
      const res = yield axios.get(
        'api/Web/Rset_stu?Sno=' +
          action.username +
          '&password=' +
          action.password
      )
      alert(res.data[0].msg)
    } catch {
      alert('修改密码失败!')
    }
  }
}

function* watch_look_per() {
  while (true) {
    const action = yield take(look_per)
    try {
      const res = yield axios.get(
        'api/Web/Look_pers?number=' +
          action.username +
          '&TableType=' +
          action.tableType
      )
      yield put(getChangeInformationAction(res.data[0]))
    } catch {
      alert('获取个人信息失败!')
    }
  }
}

function* watch_update_stu() {
  while (true) {
    const action = yield take(update_stu)
    try {
      const res = yield axios.get(
        'api/Web/Update_stu?number=' +
          action.username +
          '&Semail=' +
          action.email +
          '&Sphone=' +
          action.tell
      )
      alert(res.data[0])
    } catch {
      alert('修改个人信息失败!')
    }
  }
}

function* watch_stuTitle_list() {
  while (true) {
    const action = yield take(stu_title_list)
    try {
      const res = yield axios.get('api/Web/stu_show')
      yield put(getChangeTitleListAction(res.data))
    } catch {
      alert('修改个人信息失败!')
    }
  }
}

export default function* StudentSaga() {
  yield all([
    watch_change_password(),
    watch_look_per(),
    watch_update_stu(),
    watch_stuTitle_list(),
  ])
}
