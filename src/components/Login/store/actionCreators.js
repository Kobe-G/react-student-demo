import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  LOGIN,
  CHANGE_LOGIN,
  logout,
} from './actionTypes'

export const getChangeUsernameAction = (value) => {
  return {
    type: CHANGE_USERNAME,
    value,
  }
}

export const getChangePasswordAction = (value) => {
  return {
    type: CHANGE_PASSWORD,
    value,
  }
}

export const getLoginAction = (username, password, CTableType) => {
  return {
    type: LOGIN,
    username,
    password,
    CTableType,
  }
}

export const getChangeLoginAction = (msg, CTableType) => {
  return {
    type: CHANGE_LOGIN,
    msg,
    CTableType,
  }
}

export const getLogoutAction = () => {
  return {
    type: logout,
  }
}
