import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Icon, Input, Modal } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import {
  getLookPerAction,
  getUpdateStuAction,
  getEmailInputChangeAction,
  getTellInputChangeAction,
} from '../store/actionCreators'

class LookInformation extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
  }

  render() {
    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>个人信息</b>
            </span>
          </div>
          <div className="big-title">查看个人信息</div>
          <hr />

          <div
            className="studentInformation-wrapper bfc"
            style={{ textAlign: 'center' }}
          >
            <Form
              wrapperCol={{ sm: { span: 20 } }}
              labelCol={{ sm: { span: 2 } }}
              style={{ marginLeft: 38, marginTop: 40 }}
            >
              <Form.Item label="姓名" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入姓名"
                  ref="name"
                  value={this.props.studentInformation.sname}
                  disabled
                />
              </Form.Item>

              <Form.Item label="学号" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入学号"
                  ref="sno"
                  value={this.props.studentInformation.sno}
                  disabled
                />
              </Form.Item>

              <Form.Item label="专业" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入专业"
                  ref="major"
                  value={this.props.studentInformation.smajor}
                  disabled
                />
              </Form.Item>

              <Form.Item label="年级" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入年级"
                  ref="grade"
                  value={this.props.studentInformation.sgrade}
                  disabled
                />
              </Form.Item>

              <Form.Item label="绩点" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入绩点"
                  ref="jidian"
                  value={this.props.studentInformation.jidian}
                  disabled
                />
              </Form.Item>

              <Form.Item label="邮箱" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入邮箱"
                  ref="email"
                  value={this.props.studentInformation.semail}
                  disabled={this.state.disabled}
                  onChange={() => {
                    this.props.emailInputChange(this.refs.email.input.value)
                  }}
                />
              </Form.Item>

              <Form.Item label="电话" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入电话"
                  ref="tell"
                  value={this.props.studentInformation.sphone}
                  disabled={this.state.disabled}
                  onChange={() => {
                    this.props.tellInputChange(this.refs.tell.input.value)
                  }}
                />
              </Form.Item>
            </Form>
            <span className="button-wrapper">
              <Button
                type="primary"
                style={{ marginRight: 7 }}
                onClick={() => {
                  this.setState({ disabled: false })
                }}
              >
                编辑个人信息
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  this.props.updateStu(
                    this.props.username,
                    this.refs.email.input.value,
                    this.refs.tell.input.value
                  )
                }}
              >
                提交修改
              </Button>
            </span>
          </div>
        </div>
      </>
    )
  }

  componentDidMount() {
    this.props.look_pers(this.props.username, this.props.tableType)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.get('Login').get('username'),
    tableType: state.get('Login').get('tableType'),
    studentInformation: state.get('student').get('studentInformation').toJS()
      .data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    look_pers(username, tableType) {
      dispatch(getLookPerAction(2017, 0))
    },
    updateStu(username, email, tell) {
      dispatch(getUpdateStuAction(username, email, tell))
    },
    emailInputChange(value) {
      dispatch(getEmailInputChangeAction(value))
    },
    tellInputChange(value) {
      dispatch(getTellInputChangeAction(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookInformation)
