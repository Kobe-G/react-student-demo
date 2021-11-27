import { fromJS } from 'immutable'
import { change_show_user } from '../../admin/store/actionTypes'
import { change_teacher_information, jianjieInputChange } from './actionTypes'

const defaultState = fromJS({
  name: '',
  teaInformation: { data: {} },
})

export default (state = defaultState, action) => {
  if (action.type === change_show_user) {
    return state.set('name', action.name)
  }

  if (action.type === change_teacher_information) {
    return state.set('teaInformation', fromJS({ data: action.data }))
  }

  if (action.type === jianjieInputChange) {
    const newState = state.toJS()
    newState.teaInformation.data.jianjie = action.value
    return fromJS(newState)
  }

  return state
}
