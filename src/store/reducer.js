import { combineReducers } from 'redux-immutable'
import LoginReducer from '../components/Login/store/reducer'
import AdminReducer from '../components/admin/store/reducer'

const reducer = combineReducers({
  Login: LoginReducer,
})

export default reducer
