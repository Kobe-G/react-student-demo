import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Icon, Input } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'

import { getResetPasswordAction } from '../store/actionCreators'

class ResetPassword extends PureComponent {
  render() {
    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>重置密码</b>
            </span>
          </div>
          <div className="big-title">重置密码</div>
          <hr />
          <div className="reset-wrapper">
            <div className="input-item">
              <h2>重置密码</h2>
            </div>

            <div className="input-item">
              <label htmlFor="">请输入学号：</label>
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="请输入学号"
                style={{ width: 300, height: 30 }}
                ref="username"
              />
            </div>

            <div className="input-item">
              <label htmlFor="" style={{ marginLeft: -28 }}>
                请输入账号类型：
              </label>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="text"
                placeholder="学生账号类型为0，老师账号类型为1"
                style={{ width: 300, height: 30 }}
                ref="tableType"
              />
            </div>

            <div className="input-item">
              <Button
                type="primary"
                className="login-form-button"
                style={{ width: 100, marginLeft: -114 }}
                onClick={() => {
                  this.props.resetPassword(
                    this.refs.username.input.value,
                    this.refs.tableType.input.value
                  )
                }}
              >
                确认重置
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword(username, tableType) {
      const action = getResetPasswordAction(username, tableType)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
