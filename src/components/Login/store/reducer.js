import { fromJS } from 'immutable'
import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_LOGIN,
  logout,
} from './actionTypes'

const defaultState = fromJS({
  isLogin: false,
  username: '',
  password: '',
  tableType: '',
})

export default (state = defaultState, action) => {
  if (action.type === CHANGE_USERNAME) {
    const username = action.value
    return state.set('username', username)
  }

  if (action.type === CHANGE_PASSWORD) {
    const password = action.value
    return state.set('password', password)
  }

  if (action.type === logout) {
    return state.set('isLogin', false)
  }

  if (action.type === CHANGE_LOGIN) {
    const msg = action.msg
    if (msg.state === 'ERR') {
      alert(msg.msg)
      return state
    } else {
      if (parseInt(msg.tableType) === action.CTableType) {
        return state.set('isLogin', true).set('tableType', msg.tableType)
      } else {
        alert('您选择的账号类型不正确！')
        return state
      }
    }
  }
  return state
}
