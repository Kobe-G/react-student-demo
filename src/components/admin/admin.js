import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route, withRouter } from 'react-router-dom'
import store from '../../store'
import AdminReducer from './store/reducer'
import { combineReducers } from 'redux-immutable'
import { Icon, Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import './index.css'
import { getShowUserAction } from './store/actionCreators'
import { getLogoutAction } from '../Login/store/actionCreators'
import loadable from '../../util/Loadable'

store.asyncReducers['admin'] = AdminReducer

store.replaceReducer(
  combineReducers({
    ...store.asyncReducers,
  })
)

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

const ResetPassword = loadable(() => import('./components/resetPassword'))
const Teacher = loadable(() => import('./components/teacher'))
const Student = loadable(() => import('./components/student'))
const Confirm = loadable(() => import('./components/confirm'))
const FinishedList = loadable(() => import('./components/viewFinishedList'))
const Progress = loadable(() => import('./components/viewProgress'))

class Admin extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
    }
    this.rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4']
    this.onOpenChange = this.onOpenChange.bind(this)
  }

  //有关sidebar的逻辑操作
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    )
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  render() {
    // if (!this.props.isLogin) {
    //   alert('请先登录！')
    //   return <Redirect to="/login" />
    // }
    return (
      <Layout>
        <Header>
          <div style={{ height: '100%' }}>
            <Icon
              type="twitter"
              style={{
                height: '64px',
                width: '64px',
                fontSize: '64px',
                color: '#08c',
                float: 'left',
              }}
            />
            <span className="adminFont">Admin</span>
            <a
              className="logout"
              onClick={() => {
                this.props.logout()
              }}
            >
              注销
            </a>
            <span className="welcome">
              <span style={{ color: '#9c9c9c' }}>欢迎您，</span>
              {this.props.name}
            </span>
          </div>
        </Header>

        <Layout style={{ height: 1000 }}>
          <Sider width={256} theme="dark">
            <Menu
              mode="inline"
              style={{ width: 256, marginTop: 10 }}
              theme="dark"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>个人中心</span>
                  </span>
                }
              >
                <Menu.Item key="1">
                  <Link to="/admin/resetPassword" />
                  <Icon type="caret-right" />
                  重置密码
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>用户管理</span>
                  </span>
                }
              >
                <Menu.Item key="2">
                  <Link to="/admin/teacher" />
                  <Icon type="caret-right" />
                  老师管理
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/admin/student" />
                  <Icon type="caret-right" />
                  学生管理
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="book" />
                    <span>选题管理</span>
                  </span>
                }
              >
                <Menu.Item key="4">
                  <Link to="/admin/confirm" />
                  <Icon type="caret-right" />
                  确认发布选题
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/admin/finishedList" />
                  <Icon type="caret-right" />
                  查看完成选课名单
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="pie-chart" />
                    <span>统计数据</span>
                  </span>
                }
              >
                <Menu.Item key="6">
                  <Link to="/admin/progress" />
                  <Icon type="caret-right" />
                  查看选课进度
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            <Route path="/admin/resetPassword" component={ResetPassword} />
            <Route path="/admin/teacher" component={Teacher} />
            <Route path="/admin/student" component={Student} />
            <Route path="/admin/confirm" component={Confirm} />
            <Route path="/admin/finishedList" component={FinishedList} />
            <Route path="/admin/progress" component={Progress} />
          </Content>
        </Layout>
      </Layout>
    )
  }

  componentDidMount() {
    // this.props.show_user(this.props.username);
  }
}

const mapStateToProps = (state) => {
  return {
    tableType: state.get('Login').get('tableType'),
    username: state.get('Login').get('username'),
    isLogin: state.get('Login').get('isLogin'),
    name: state.get('admin').get('name'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    show_user(username) {
      const action = getShowUserAction(username)
      dispatch(action)
    },
    logout() {
      dispatch(getLogoutAction())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin))
