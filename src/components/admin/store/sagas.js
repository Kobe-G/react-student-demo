import { all, take, put } from 'redux-saga/effects'
import axios from 'axios'
import {
  show_user,
  reset_password,
  get_teacher_list,
  delete_user,
  insert_teacher,
  get_student_teacher,
  get_confirm_list,
  confirm_title,
  insert_student,
} from './actionTypes'
import {
  getChangeShowUserAction,
  getChangeTeacherListAction,
  getTeacherListAction,
  getChangeStudentListAction,
  getStudentListAction,
  getChangeConfirmListAction,
  getConfirmListAction,
} from './actionCreators'

function* watch_show_user() {
  while (true) {
    const action = yield take(show_user)
    try {
      const res = yield axios.get('api/Web/show_user?UID=' + action.username)
      const name = res.data[0].uname
      yield put(getChangeShowUserAction(name))
    } catch {
      alert('连接失败')
    }
  }
}

function* watch_reset_password() {
  while (true) {
    const action = yield take(reset_password)
    try {
      const res = yield axios.get(
        'api/Web/Reset_Pwd?TableType=' +
          action.tableType +
          '&Number=' +
          action.username
      )
      if (res.data[0]) {
        alert(res.data[0].msg + '密码已重置为123456')
      } else {
        alert('此账号不存在！')
      }
    } catch {
      alert('连接失败!')
    }
  }
}

function* watch_teacher_list() {
  while (true) {
    const action = yield take(get_teacher_list)
    try {
      const res = yield axios.get('api/Web/TeaInfo')
      yield put(getChangeTeacherListAction(res.data))
    } catch {
      alert('获取教师信息失败!')
    }
  }
}

function* watch_delete_user() {
  while (true) {
    const action = yield take(delete_user)
    try {
      const res = yield axios.get(
        'api/Web/Delete_data?Number=' +
          action.number +
          '&TableType=' +
          action.tableType
      )

      if (action.tableType === '1') yield put(getTeacherListAction())
      if (action.tableType === '0') yield put(getStudentListAction())
      alert(res.data[0].msg)
    } catch {
      alert('删除用户失败!')
    }
  }
}

function* watch_insert_teacher() {
  while (true) {
    const action = yield take(insert_teacher)
    try {
      const res = yield axios.get(
        'api/Web/Insert_tea?Tname=' +
          action.tname +
          '&Tno=' +
          action.tno +
          '&Tpassword=' +
          action.tpassword +
          '&Zhicheng=' +
          action.zhicheng +
          '&Jianjie=' +
          action.jianjie
      )
      yield put(getTeacherListAction())
      alert(res.data[0].msg)
    } catch {
      alert('添加失败!')
    }
  }
}

function* watch_student_list() {
  while (true) {
    const action = yield take(get_student_teacher)
    try {
      const res = yield axios.get('api/Web/StuInfo')
      yield put(getChangeStudentListAction(res.data))
    } catch {
      alert('获取学生信息失败!')
    }
  }
}

function* watch_confirm_list() {
  while (true) {
    const action = yield take(get_confirm_list)
    try {
      const res = yield axios.get('api/Web/admin_showTitle')
      yield put(getChangeConfirmListAction(res.data))
    } catch {
      alert('获取选题信息失败!')
    }
  }
}

function* watch_confirm_title() {
  while (true) {
    const action = yield take(confirm_title)
    try {
      const res = yield axios.get(
        'api/Web/admin_confirm_xt?TitleID=' + action.data
      )
      yield put(getConfirmListAction())
      alert(res.data[0].msg + '!')
    } catch {
      alert('发布失败!')
    }
  }
}

function* watch_insert_student() {
  while (true) {
    const action = yield take(insert_student)
    try {
      const res = yield axios.post(
        'api/Web/Insert_stu?Sname=' +
          action.name +
          '&Sno=' +
          action.sno +
          '&Spassword=' +
          action.password +
          '&Smajor=' +
          action.major +
          '&Semail=' +
          action.email +
          '&Sgrade=' +
          action.grade +
          '&Sphone=' +
          action.tell +
          '&Jidian=' +
          action.jidian
      )
      yield put(getStudentListAction())
      alert(res.data[0].msg)
    } catch {
      alert('添加学生信息失败!')
    }
  }
}

export default function* AdminSaga() {
  yield all([
    watch_show_user(),
    watch_reset_password(),
    watch_teacher_list(),
    watch_delete_user(),
    watch_insert_teacher(),
    watch_student_list(),
    watch_confirm_list(),
    watch_confirm_title(),
    watch_insert_student(),
  ])
}
