import { all, take, put } from 'redux-saga/effects'
import axios from 'axios'
import { change_password, look_per, update_tea, add_title } from './actionTypes'
import { getChangeInformationAction } from './actionCreators'

function* watch_change_password() {
  while (true) {
    const action = yield take(change_password)
    try {
      const res = yield axios.get(
        'api/Web/Rset_tea?Tno=' +
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

function* watch_update_tea() {
  while (true) {
    const action = yield take(update_tea)
    try {
      const res = yield axios.get(
        'api/Web/Update_tea?Tno=' +
          action.username +
          '&Jianjie=' +
          action.jianjie
      )
      alert(res.data[0].msg)
    } catch {
      alert('修改个人信息失败!')
    }
  }
}

function* watch_add_title() {
  while (true) {
    const action = yield take(add_title)
    try {
      const res = yield axios.get(
        'api/Web/Add_title?TitleName=' +
          action.TitleName +
          '&TitleID=' +
          action.TitleID +
          '&TitleType=' +
          action.TitleType +
          '&TitleSource=' +
          action.TitleSource +
          '&TitleTool=' +
          action.TitleTool +
          '&TitleText=' +
          action.TitleText +
          '&Tno=' +
          action.Tno
      )
      alert(res.data[0].msg)
    } catch {
      alert('增加题目失败!')
    }
  }
}

export default function* TeacherSaga() {
  yield all([
    watch_change_password(),
    watch_look_per(),
    watch_update_tea(),
    watch_add_title(),
  ])
}
