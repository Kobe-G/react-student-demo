import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Icon, Input, Modal } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import {
  getLookPerAction,
  getJianjieInputChangeAction,
  getUpdateTeaAction,
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
                  disabled
                  value={this.props.teaInformation.tname}
                />
              </Form.Item>

              <Form.Item label="工号" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入工号"
                  ref="tno"
                  disabled
                  value={this.props.teaInformation.tno}
                />
              </Form.Item>

              <Form.Item label="职称" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入职称"
                  ref="zhicheng"
                  disabled
                  value={this.props.teaInformation.zhicheng}
                />
              </Form.Item>

              <Form.Item label="简介" help="" hasFeedback={true}>
                <Input
                  placeholder="请输入简介"
                  ref="jianjie"
                  disabled={this.state.disabled}
                  value={this.props.teaInformation.jianjie}
                  onChange={() => {
                    this.props.jianjieInputChange(this.refs.jianjie.input.value)
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
                  this.props.updateTea(
                    this.props.username,
                    this.refs.jianjie.input.value
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
    this.props.look_per(this.props.username, this.props.tableType)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.get('Login').get('username'),
    tableType: state.get('Login').get('tableType'),
    teaInformation: state.get('teacher').get('teaInformation').toJS().data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    look_per(username, tableType) {
      dispatch(getLookPerAction('T002', 1))
    },
    updateTea(username, jianjie) {
      dispatch(getUpdateTeaAction('T002', jianjie))
    },
    jianjieInputChange(value) {
      dispatch(getJianjieInputChangeAction(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookInformation)
