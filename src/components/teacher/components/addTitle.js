import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Icon, Input } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'

import { getAddTitleAction } from '../store/actionCreators'

class AddTitle extends PureComponent {
  render() {
    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>题目增加</b>
            </span>
          </div>
          <div className="big-title">题目增加</div>
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
              <Form.Item label="题目名" help="" hasFeedback={true}>
                <Input placeholder="请输入题目名" ref="titleName" />
              </Form.Item>

              <Form.Item label="题目编号" help="" hasFeedback={true}>
                <Input placeholder="请输入题目编号" ref="titleID" />
              </Form.Item>

              <Form.Item label="题目类型" help="" hasFeedback={true}>
                <Input placeholder="请输入题目类型" ref="titleType" />
              </Form.Item>

              <Form.Item label="题目来源" help="" hasFeedback={true}>
                <Input placeholder="请输入题目来源" ref="titleSource" />
              </Form.Item>

              <Form.Item label="开发工具" help="" hasFeedback={true}>
                <Input placeholder="请输入开发工具" ref="titleTool" />
              </Form.Item>

              <Form.Item label="题目内容" help="" hasFeedback={true}>
                <Input placeholder="请输入题目内容" ref="titleText" />
              </Form.Item>
            </Form>
            <span className="button-wrapper">
              <Button
                type="primary"
                onClick={() => {
                  this.props.addTitle(
                    this.refs.titleName.input.value,
                    this.refs.titleID.input.value,
                    this.refs.titleType.input.value,
                    this.refs.titleSource.input.value,
                    this.refs.titleTool.input.value,
                    this.refs.titleText.input.value,
                    this.props.username
                  )
                }}
              >
                确认增加
              </Button>
            </span>
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
    addTitle(
      TitleName,
      TitleID,
      TitleType,
      TitleSource,
      TitleTool,
      TitleText,
      Tno
    ) {
      dispatch(
        getAddTitleAction(
          TitleName,
          TitleID,
          TitleType,
          TitleSource,
          TitleTool,
          TitleText,
          Tno
        )
      )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTitle)
