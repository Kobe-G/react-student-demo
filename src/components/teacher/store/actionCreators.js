import {
  change_password,
  look_per,
  change_teacher_information,
  jianjieInputChange,
  update_tea,
  add_title,
} from './actionTypes'

export const getChangePasswordAction = (username, password) => {
  return {
    type: change_password,
    username,
    password,
  }
}

export const getLookPerAction = (username, tableType) => {
  return {
    type: look_per,
    username,
    tableType,
  }
}

export const getChangeInformationAction = (data = {}) => {
  return {
    type: change_teacher_information,
    data,
  }
}

export const getJianjieInputChangeAction = (value) => {
  return {
    type: jianjieInputChange,
    value,
  }
}

export const getUpdateTeaAction = (username, jianjie) => {
  return {
    type: update_tea,
    username,
    jianjie,
  }
}

export const getAddTitleAction = (
  TitleName,
  TitleID,
  TitleType,
  TitleSource,
  TitleTool,
  TitleText,
  Tno
) => {
  return {
    type: add_title,
    TitleName,
    TitleID,
    TitleType,
    TitleSource,
    TitleTool,
    TitleText,
    Tno,
  }
}
