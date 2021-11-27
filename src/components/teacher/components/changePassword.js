import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Icon, Input } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'

import { getChangePasswordAction } from '../store/actionCreators'

class ResetPassword extends PureComponent {
  render() {
    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>修改密码</b>
            </span>
          </div>
          <div className="big-title">修改密码</div>
          <hr />
          <div className="reset-wrapper">
            <div className="input-item">
              <h2>修改密码</h2>
            </div>

            <div className="input-item">
              <label htmlFor="">请输入新密码：</label>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="请输入新密码"
                style={{ width: 300, height: 30 }}
                ref="password"
              />
            </div>

            <div className="input-item">
              <label htmlFor="" style={{ marginLeft: -28 }}>
                请再次输入新密码：
              </label>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="请再次输入新密码"
                style={{ width: 300, height: 30 }}
                ref="secondPassword"
              />
            </div>

            <div className="input-item">
              <Button
                type="primary"
                className="login-form-button"
                style={{ width: 100, marginLeft: -114 }}
                onClick={() => {
                  if (
                    this.refs.password.input.value !==
                    this.refs.secondPassword.input.value
                  ) {
                    alert('两次密码输入不一致！')
                  } else
                    this.props.changePassword(
                      this.props.username,
                      this.refs.password.input.value
                    )
                }}
              >
                确认修改
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.get('Login').get('username'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword(username, password) {
      dispatch(getChangePasswordAction('T002', password))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
