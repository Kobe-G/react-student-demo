import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import LoginSaga from '../components/Login/store/sagas'
import AdminSaga from '../components/admin/store/sagas'
import StudentSaga from '../components/student/store/sagas'
import TeacherSaga from '../components/teacher/store/sagas'

export default function* rootSaga() {
  yield all([LoginSaga(), AdminSaga(), StudentSaga(), TeacherSaga()])
}
