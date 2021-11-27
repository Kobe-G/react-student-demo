import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Icon, Input, Radio } from 'antd'
import store from '../../store'
import LoginReducer from './store/reducer'
import 'antd/dist/antd.css'
import './index.css'
import {
  getChangePasswordAction,
  getChangeUsernameAction,
  getLoginAction,
} from './store/actionCreators'

store.asyncReducers['Login'] = LoginReducer

class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      CTableType: '',
    }
  }

  render() {
    if (this.props.isLogin) {
      if (this.props.tableType == 2) {
        return <Redirect to="/admin" />
      }
      if (this.props.tableType == 1) {
        return <Redirect to="/teacher" />
      }
      if (this.props.tableType == 0) {
        return <Redirect to="/student" />
      }
      return
    } else {
      return (
        <div className="login-wrapper">
          <h1 className="title">学生选课管理系统</h1>
          <div>
            <Form className="login-form">
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                  className="antd-input"
                  value={this.props.username}
                  onChange={this.props.changeUsername}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                  className="antd-input"
                  value={this.props.password}
                  onChange={this.props.changePassword}
                />
              </Form.Item>

              <div className="clearFix login-type">
                <Radio.Group
                  className="right"
                  onChange={(e) => {
                    this.getRadio(e)
                  }}
                >
                  <Radio value={0}>学生</Radio>
                  <Radio value={1}>老师</Radio>
                  <Radio value={2}>管理员</Radio>
                </Radio.Group>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={() => {
                    this.props.login(
                      this.props.username,
                      this.props.password,
                      this.state.CTableType
                    )
                  }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )
    }
  }

  getRadio(e) {
    this.setState({
      CTableType: e.target.value,
    })
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.get('Login').get('username'),
    password: state.get('Login').get('password'),
    isLogin: state.get('Login').get('isLogin'),
    tableType: state.get('Login').get('tableType'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeUsername(e) {
      const action = getChangeUsernameAction(e.target.value)
      dispatch(action)
    },
    changePassword(e) {
      const action = getChangePasswordAction(e.target.value)
      dispatch(action)
    },
    login(username, password, CTableType) {
      const action = getLoginAction(username, password, CTableType)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
