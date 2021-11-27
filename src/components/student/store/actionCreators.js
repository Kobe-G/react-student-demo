import {
  change_password,
  look_per,
  change_student_information,
  update_stu,
  emailInputChange,
  tellInputChange,
  stu_title_list,
  change_stu_title_list,
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
    type: change_student_information,
    data,
  }
}

export const getUpdateStuAction = (username, email, tell) => {
  return {
    type: update_stu,
    username,
    email,
    tell,
  }
}

export const getEmailInputChangeAction = (value) => {
  return {
    type: emailInputChange,
    value,
  }
}

export const getTellInputChangeAction = (value) => {
  return {
    type: tellInputChange,
    value,
  }
}

export const getStuTitleListAction = () => {
  return {
    type: stu_title_list,
  }
}

export const getChangeTitleListAction = (data) => {
  return {
    type: change_stu_title_list,
    data,
  }
}
