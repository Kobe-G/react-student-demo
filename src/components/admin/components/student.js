import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Icon, Input, Modal, Table, Tag } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import {
  getDeleteUserAction,
  getStudentListAction,
  getInsertStudentAction,
} from '../store/actionCreators'

const { confirm } = Modal

class Student extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        render: (key) => <b>{key}</b>,
      },
      {
        title: '姓名',
        dataIndex: 'sname',
        key: 'sname',
        render: (name) => <a>{name}</a>,
      },
      {
        title: '体温',
        dataIndex: 'tiwen',
        key: 'tiwen',
        render: (key) => <b>37.1°C</b>,
      },
      {
        title: '学号',
        dataIndex: 'sno',
        key: 'sno',
      },
      {
        title: '密码',
        dataIndex: 'spassword',
        key: 'spassword',
      },
      {
        title: '账号类型',
        key: 'tableType',
        dataIndex: 'tableType',
      },
      {
        title: '专业',
        key: 'smajor',
        dataIndex: 'smajor',
      },
      {
        title: '年级',
        key: 'sgrade',
        dataIndex: 'sgrade',
      },

      {
        title: '邮箱',
        key: 'semail',
        dataIndex: 'semail',
      },

      {
        title: '电话',
        key: 'sphone',
        dataIndex: 'sphone',
      },

      {
        title: '绩点',
        key: 'jidian',
        dataIndex: 'jidian',
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              <Button
                type="danger"
                className="dangerButton"
                onClick={() => {
                  this.showDeleteConfirm(text.sno, text.tableType)
                }}
              >
                删除
              </Button>
              <Button
                type="danger"
                className="dangerButton"
                style={{ marginLeft: 15 }}
                onClick={() => {
                  alert('已通知swpu保卫处！')
                }}
              >
                体温报警
              </Button>
            </div>
          )
        },
      },
    ]
    this.data = []
    this.state = {
      visible: false,
      confirmLoading: false,
      nameValidateStatus: '',
      tnoValidateStatus: '',
      passwordValidateStatus: '',
      zhichengValidateStatus: '',
      jianjieValidateStatus: '',
    }
    this.showDeleteConfirm = (tno, tableType) => {
      let that = this
      confirm({
        title: '您确定要删除此条信息吗?',
        content: '删除后将无法恢复',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          that.props.deleteStudent(tno, tableType)
        },
        onCancel() {},
      })
    }

    this.showModal = () => {
      this.setState({
        visible: true,
      })
    }

    this.handleSubmit = () => {
      this.setState({
        ModalText: '提交成功',
        confirmLoading: true,
      })
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        })
      }, 1000)
    }

    this.handleCancel = () => {
      this.setState({
        visible: false,
      })
    }
  }

  render() {
    this.data = this.props.studentList.map((data, index) => {
      return {
        key: index + 1,
        sname: data.sname,
        sno: data.sno,
        spassword: data.spassword,
        tableType: data.tableType,
        jidian: data.jidian,
        semail: data.semail,
        sphone: data.sphone,
        sgrade: data.sgrade,
        smajor: data.smajor,
      }
    })
    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>学生管理</b>
            </span>
          </div>
          <div className="big-title">学生管理</div>
          <hr />
          <div className="teacher-wrapper">
            <div className="bfc">
              <div className="add-div">
                <Button type="primary" onClick={this.showModal}>
                  添加信息
                </Button>
              </div>
            </div>
            <Table
              columns={this.columns}
              dataSource={this.data}
              bordered={true}
              size="middle"
            />
          </div>

          <Modal
            width={600}
            title="添加学生信息"
            visible={this.state.visible}
            onOk={() => {
              this.handleSubmit()
              this.props.insertStudent(
                this.refs.name.input.value,
                this.refs.sno.input.value,
                this.refs.password.input.value,
                this.refs.major.input.value,
                this.refs.grade.input.value,
                this.refs.email.input.value,
                this.refs.tell.input.value,
                this.refs.jidian.input.value
              )
            }}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            okText="确认添加"
          >
            <Form
              wrapperCol={{ sm: { span: 20 } }}
              labelCol={{ sm: { span: 2 } }}
            >
              <Form.Item
                label="姓名"
                validateStatus={this.state.nameValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入姓名"
                  ref="name"
                  onBlur={() => this.nameInputBlur()}
                />
              </Form.Item>

              <Form.Item
                label="学号"
                validateStatus={this.state.tnoValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入学号"
                  ref="sno"
                  onBlur={() => this.tnoInputBlur()}
                />
              </Form.Item>

              <Form.Item
                label="密码"
                validateStatus={this.state.passwordValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入密码"
                  ref="password"
                  onBlur={() => this.passwordInputBlur()}
                />
              </Form.Item>

              <Form.Item
                label="专业"
                validateStatus={this.state.zhichengValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入专业"
                  ref="major"
                  onBlur={() => this.majorInputBlur()}
                />
              </Form.Item>

              <Form.Item
                label="年级"
                validateStatus={this.state.jianjieValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入年级"
                  ref="grade"
                  onBlur={() => this.jianjieInputBlur()}
                />
              </Form.Item>

              <Form.Item
                label="邮箱"
                validateStatus={this.state.jianjieValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入邮箱"
                  ref="email"
                  onBlur={() => this.jianjieInputBlur()}
                />
              </Form.Item>

              <Form.Item
                label="电话"
                validateStatus={this.state.jianjieValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入电话"
                  ref="tell"
                  onBlur={() => this.jianjieInputBlur()}
                />
              </Form.Item>

              <Form.Item
                label="绩点"
                validateStatus={this.state.jianjieValidateStatus}
                help=""
                hasFeedback={true}
              >
                <Input
                  placeholder="请输入绩点"
                  ref="jidian"
                  onBlur={() => this.jianjieInputBlur()}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </>
    )
  }

  componentDidMount() {
    this.props.getStudentList()
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.get('admin').get('studentList').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentList() {
      dispatch(getStudentListAction())
    },

    deleteStudent(number, tableType) {
      dispatch(getDeleteUserAction(number, tableType))
    },

    insertStudent(name, sno, password, major, grade, email, tell, jidian) {
      dispatch(
        getInsertStudentAction(
          name,
          sno,
          password,
          major,
          grade,
          email,
          tell,
          jidian
        )
      )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)
