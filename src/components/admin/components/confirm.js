import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Icon, Input, Modal, Table } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import {
  getConfirmListAction,
  getConfirmTitleAction,
} from '../store/actionCreators'

const { confirm } = Modal

class Confirm extends PureComponent {
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
        title: '题目名称',
        dataIndex: 'titleName',
        key: 'titleName',
        render: (name) => <a>{name}</a>,
      },
      {
        title: '题目编号',
        dataIndex: 'titleID',
        key: 'titleID',
      },
      {
        title: '题目类型',
        dataIndex: 'titleType',
        key: 'titleType',
      },
      {
        title: '题目来源',
        key: 'titleSource',
        dataIndex: 'titleSource',
      },
      {
        title: '开发工具',
        key: 'titleTool',
        dataIndex: 'titleTool',
      },
      {
        title: '老师工号',
        key: 'tno',
        dataIndex: 'tno',
      },
      {
        title: '选中学生',
        key: 'sno',
        dataIndex: 'sno',
        render: (value) => {
          if (value === '') {
            return '未选'
          } else {
            return value
          }
        },
      },
      {
        title: '操作',
        key: 'titleState',
        dataIndex: 'titleState',
        render: (text, record) => {
          if (text === '1') {
            return (
              <Button
                type="danger"
                className="dangerButton"
                onClick={() => {
                  alert('此题目已发布！')
                }}
              >
                已确认
              </Button>
            )
          } else {
            return (
              <Button
                type="primary"
                className="dangerButton"
                onClick={() => {
                  this.showDeleteConfirm(record.titleID)
                }}
              >
                确认发布
              </Button>
            )
          }
        },
      },
    ]
    this.data = []
    this.showDeleteConfirm = (id) => {
      let that = this
      confirm({
        title: '您确定要发布此选题吗?',
        content: '发布后将无法恢复',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          that.props.confirmTitle(id)
        },
        onCancel() {},
      })
    }
  }

  render() {
    this.data = this.props.confirmList.map((data, index) => {
      return {
        key: index + 1,
        titleName: data.titleName,
        titleID: data.titleID,
        titleType: data.titleType,
        titleSource: data.titleSource,
        titleTool: data.titleTool,
        tno: data.tno,
        titleState: data.titleState,
        sno: data.sno,
      }
    })

    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>确认发布选题</b>
            </span>
          </div>
          <div className="big-title">确认发布选题</div>
          <hr />
        </div>

        <div className="teacher-wrapper">
          <div className="bfc"></div>
          <Table
            columns={this.columns}
            dataSource={this.data}
            bordered={true}
            size="middle"
          />
        </div>
      </>
    )
  }

  componentDidMount() {
    this.props.getConfirmList()
  }
}

const mapStateToProps = (state) => {
  return {
    confirmList: state.get('admin').get('confirmList').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConfirmList() {
      dispatch(getConfirmListAction())
    },
    confirmTitle(id) {
      dispatch(getConfirmTitleAction(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
