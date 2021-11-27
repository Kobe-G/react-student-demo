import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { toJS } from 'redux-immutable'
import { Button, Form, Icon, Input, Modal, Table, Tag } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import {
  getDeleteUserAction,
  getInsertTeacherAction,
  getTeacherListAction,
} from '../store/actionCreators'

const { confirm } = Modal

class Teacher extends PureComponent {
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
        dataIndex: 'tname',
        key: 'tname',
        render: (name) => <a>{name}</a>,
      },
      {
        title: '体温',
        dataIndex: 'tiwen',
        key: 'tiwen',
        render: (key) => <b>37.2°C</b>,
      },
      {
        title: '工号',
        dataIndex: 'tno',
        key: 'tno',
      },
      {
        title: '密码',
        dataIndex: 'tpassword',
        key: 'tpassword',
      },
      {
        title: '账号类型',
        key: 'tableType',
        dataIndex: 'tableType',
      },
      {
        title: '职称',
        key: 'zhicheng',
        dataIndex: 'zhicheng',
        render: (zhicheng) => {
          const color = zhicheng === '教授' ? 'geekblue' : 'green'
          return (
            <Tag
              color={color}
              key={zhicheng}
              style={{ margin: 0 }}
              className="Tag"
            >
              {zhicheng}
            </Tag>
          )
        },
      },
      {
        title: '简介',
        key: 'jianjie',
        dataIndex: 'jianjie',
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
                  this.showDeleteConfirm(text.tno, text.tableType)
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
          that.props.deleteTeacher(tno, tableType)
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

  nameInputBlur() {
    this.setState({
      nameValidateStatus: 'validating',
    })

    setTimeout(() => {
      this.setState({
        nameValidateStatus: 'success',
      })
    }, 400)
  }

  tnoInputBlur() {
    this.setState({
      tnoValidateStatus: 'validating',
    })

    setTimeout(() => {
      this.setState({
        tnoValidateStatus: 'success',
      })
    }, 400)
  }

  passwordInputBlur() {
    this.setState({
      passwordValidateStatus: 'validating',
    })

    setTimeout(() => {
      this.setState({
        passwordValidateStatus: 'success',
      })
    }, 400)
  }

  zhichengInputBlur() {
    this.setState({
      zhichengValidateStatus: 'validating',
    })

    setTimeout(() => {
      this.setState({
        zhichengValidateStatus: 'success',
      })
    }, 400)
  }

  jianjieInputBlur() {
    this.setState({
      jianjieValidateStatus: 'validating',
    })

    setTimeout(() => {
      this.setState({
        jianjieValidateStatus: 'success',
      })
    }, 400)
  }

  render() {
    this.data = this.props.teacherList.map((data, index) => {
      return {
        key: index + 1,
        tname: data.tname,
        tno: data.tno,
        tpassword: data.tpassword,
        tableType: data.tableType,
        zhicheng: data.zhicheng,
        jianjie: data.jianjie,
      }
    })

    return (
      <div>
        <div className="small-title">
          <Icon type="home" style={{ marginLeft: 20 }} />
          <span>
            Home > <b>老师管理</b>
          </span>
        </div>
        <div className="big-title">老师管理</div>
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
          title="添加老师信息"
          visible={this.state.visible}
          onOk={() => {
            this.handleSubmit()
            this.props.insertTeacher(
              this.refs.name.input.value,
              this.refs.tno.input.value,
              this.refs.password.input.value,
              this.refs.zhicheng.input.value,
              this.refs.jianjie.input.value
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
              label="工号"
              validateStatus={this.state.tnoValidateStatus}
              help=""
              hasFeedback={true}
            >
              <Input
                placeholder="请输入工号"
                ref="tno"
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
              label="职称"
              validateStatus={this.state.zhichengValidateStatus}
              help=""
              hasFeedback={true}
            >
              <Input
                placeholder="请输入职称"
                ref="zhicheng"
                onBlur={() => this.zhichengInputBlur()}
              />
            </Form.Item>

            <Form.Item
              label="简介"
              validateStatus={this.state.jianjieValidateStatus}
              help=""
              hasFeedback={true}
            >
              <Input
                placeholder="请输入简介"
                ref="jianjie"
                onBlur={() => this.jianjieInputBlur()}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    this.props.getTeacherList()
  }
}

const mapStateToProps = (state) => {
  return {
    teacherList: state.get('admin').get('teacherList').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeacherList() {
      dispatch(getTeacherListAction())
    },

    deleteTeacher(number, tableType) {
      dispatch(getDeleteUserAction(number, tableType))
    },

    insertTeacher(tname, tno, tpassword, zhicheng, jianjie) {
      dispatch(getInsertTeacherAction(tname, tno, tpassword, zhicheng, jianjie))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
