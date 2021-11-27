import { fromJS } from 'immutable'
import {
  change_show_user,
  change_teacher_list,
  change_student_list,
  change_confirm_list,
} from './actionTypes'

const defaultState = fromJS({
  name: '',
  teacherList: [],
  studentList: [],
  confirmList: [],
})

export default (state = defaultState, action) => {
  if (action.type === change_show_user) {
    return state.set('name', action.name)
  }

  if (action.type === change_teacher_list) {
    return state.set('teacherList', fromJS(action.data))
  }

  if (action.type === change_student_list) {
    return state.set('studentList', fromJS(action.data))
  }

  if (action.type === change_confirm_list) {
    return state.set('confirmList', fromJS(action.data))
  }

  return state
}
