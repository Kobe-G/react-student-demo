import { fromJS } from 'immutable'
import { change_show_user } from '../../admin/store/actionTypes'
import {
  change_student_information,
  emailInputChange,
  tellInputChange,
  change_stu_title_list,
} from './actionTypes'

const defaultState = fromJS({
  name: '',
  studentInformation: { data: {} },
  stuTitleList: [],
})

export default (state = defaultState, action) => {
  if (action.type === change_show_user) {
    return state.set('name', action.name)
  }

  if (action.type === change_student_information) {
    return state.set('studentInformation', fromJS({ data: action.data }))
  }

  if (action.type === emailInputChange) {
    const newState = state.toJS()
    newState.studentInformation.data.semail = action.value
    return fromJS(newState)
  }

  if (action.type === tellInputChange) {
    const newState = state.toJS()
    newState.studentInformation.data.sphone = action.value
    return fromJS(newState)
  }

  if (action.type === change_stu_title_list) {
    return state.set('stuTitleList', fromJS(action.data))
  }

  return state
}
