import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route, withRouter } from 'react-router-dom'
import store from '../../store'
import TeacherReducer from './store/reducer'
import { combineReducers } from 'redux-immutable'
import { Icon, Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import './index.css'
import loadable from '../../util/Loadable'
import {} from './store/actionCreators'
import {} from '../admin/store/actionCreators'
import { getShowUserAction } from '../admin/store/actionCreators'
import { getLogoutAction } from '../Login/store/actionCreators'

const ChangePassword = loadable(() => import('./components/changePassword'))
const LookInformation = loadable(() => import('./components/LookInformation'))
const AddTitle = loadable(() => import('./components/AddTitle'))

store.asyncReducers['teacher'] = TeacherReducer

store.replaceReducer(
  combineReducers({
    ...store.asyncReducers,
  })
)

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

class Teacher extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
    }
    this.rootSubmenuKeys = ['sub1', 'sub2']
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
            <span className="adminFont">Teacher</span>
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
                  <Link to="/teacher/lookInformation" />
                  <Icon type="caret-right" />
                  查看个人信息
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/teacher/changePassword" />
                  <Icon type="caret-right" />
                  修改密码
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="book" />
                    <span>题目管理</span>
                  </span>
                }
              >
                <Menu.Item key="3">
                  <Link to="/teacher/addTitle" />
                  <Icon type="caret-right" />
                  题目增加
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/" />
                  <Icon type="caret-right" />
                  题目维护
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/" />
                  <Icon type="caret-right" />
                  题目管理
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Content>
            <Route path="/teacher/changePassword" component={ChangePassword} />
            <Route
              path="/teacher/lookInformation"
              component={LookInformation}
            />
            <Route path="/teacher/addTitle" component={AddTitle} />
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
    username: state.get('Login').get('username'),
    name: state.get('teacher').get('name'),
    isLogin: state.get('Login').get('isLogin'),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Teacher))
