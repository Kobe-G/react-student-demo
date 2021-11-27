import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Icon, Input, Modal, Table } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import { getStuTitleListAction } from '../store/actionCreators'

class StuChoseTitle extends PureComponent {
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
        title: '题目来源',
        dataIndex: 'titleSource',
        key: 'titleSource',
      },
      {
        title: '老师工号',
        key: 'tno',
        dataIndex: 'tno',
      },
      {
        title: '开发工具',
        key: 'titleTool',
        dataIndex: 'titleTool',
      },
      {
        title: '题目类型',
        key: 'titleType',
        dataIndex: 'titleType',
      },

      {
        title: '学生学号',
        key: 'sno',
        dataIndex: 'sno',
      },

      {
        title: '题目状态',
        key: 'titleState',
        dataIndex: 'titleState',
      },

      {
        title: 'titleXTS',
        key: 'titleXTS',
        dataIndex: 'titleXTS',
      },

      {
        title: '操作',
        key: 'action',
        render: () => {
          return (
            <Button
              type="primary"
              className="dangerButton"
              onClick={() => {
                alert('选题成功！')
              }}
            >
              确认选题
            </Button>
          )
        },
      },
    ]
    this.data = []
    this.state = {}
  }

  render() {
    this.data = this.props.stuTitleList.map((data, index) => {
      return {
        key: index + 1,
        titleName: data.titleName,
        sno: data.sno,
        titleID: data.titleID,
        titleSource: data.titleSource,
        titleState: data.titleState,
        titleTool: data.titleTool,
        titleType: data.titleType,
        titleXTS: data.titleXTS,
        tno: data.tno,
      }
    })

    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>学生选题</b>
            </span>
          </div>
          <div className="big-title">学生选题</div>
          <hr />

          <div className="teacher-wrapper">
            <div className="bfc"></div>
            <Table
              columns={this.columns}
              dataSource={this.data}
              bordered={true}
              size="middle"
            />
          </div>
        </div>
      </>
    )
  }

  componentDidMount() {
    this.props.getStuTitleList()
  }
}

const mapStateToProps = (state) => {
  return {
    stuTitleList: state.get('student').get('stuTitleList').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStuTitleList() {
      dispatch(getStuTitleListAction())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StuChoseTitle)
