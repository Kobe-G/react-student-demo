import {
  show_user,
  change_show_user,
  reset_password,
  get_teacher_list,
  change_teacher_list,
  delete_user,
  insert_teacher,
  get_student_teacher,
  change_student_list,
  get_confirm_list,
  change_confirm_list,
  confirm_title,
  insert_student,
} from './actionTypes'

export const getShowUserAction = (username) => {
  return {
    type: show_user,
    username,
  }
}

export const getChangeShowUserAction = (name) => {
  return {
    type: change_show_user,
    name,
  }
}

export const getResetPasswordAction = (username, tableType) => {
  return {
    type: reset_password,
    username,
    tableType,
  }
}

export const getTeacherListAction = () => {
  return {
    type: get_teacher_list,
  }
}

export const getChangeTeacherListAction = (data) => {
  return {
    type: change_teacher_list,
    data,
  }
}

export const getDeleteUserAction = (number, tableType) => {
  return {
    type: delete_user,
    number,
    tableType,
  }
}

export const getInsertTeacherAction = (
  tname,
  tno,
  tpassword,
  zhicheng,
  jianjie
) => {
  return {
    type: insert_teacher,
    tname,
    tno,
    tpassword,
    zhicheng,
    jianjie,
  }
}

export const getStudentListAction = () => {
  return {
    type: get_student_teacher,
  }
}

export const getChangeStudentListAction = (data) => {
  return {
    type: change_student_list,
    data,
  }
}

export const getConfirmListAction = () => {
  return {
    type: get_confirm_list,
  }
}

export const getChangeConfirmListAction = (data) => {
  return {
    type: change_confirm_list,
    data,
  }
}

export const getConfirmTitleAction = (data) => {
  return {
    type: confirm_title,
    data,
  }
}

export const getInsertStudentAction = (
  name,
  sno,
  password,
  major,
  grade,
  email,
  tell,
  jidian
) => {
  return {
    type: insert_student,
    name,
    sno,
    password,
    major,
    grade,
    email,
    tell,
    jidian,
  }
}
