import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route, withRouter } from 'react-router-dom'
import store from '../../store'
import StudentReducer from './store/reducer'
import { combineReducers } from 'redux-immutable'
import { Icon, Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import './index.css'
import loadable from '../../util/Loadable'
import {} from './store/actionCreators'
import { getShowUserAction } from '../admin/store/actionCreators'
import { getLogoutAction } from '../Login/store/actionCreators'

const ChangePassword = loadable(() => import('./components/changePassword'))
const LookInformation = loadable(() => import('./components/LookInformation'))
const StuChoseTitle = loadable(() => import('./components/stuChoseTitle'))

store.asyncReducers['student'] = StudentReducer

store.replaceReducer(
  combineReducers({
    ...store.asyncReducers,
  })
)

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

class Student extends PureComponent {
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
            <span className="adminFont">Student</span>
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
                  <Link to="/student/changePassword" />
                  <Icon type="caret-right" />
                  修改密码
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/student/lookInformation" />
                  <Icon type="caret-right" />
                  查看个人信息
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="book" />
                    <span>题目查询</span>
                  </span>
                }
              >
                <Menu.Item key="3">
                  <Link to="/student/stuChoseTitle" />
                  <Icon type="caret-right" />
                  学生选题
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Content>
            <Route path="/student/changePassword" component={ChangePassword} />
            <Route
              path="/student/lookInformation"
              component={LookInformation}
            />
            <Route path="/student/stuChoseTitle" component={StuChoseTitle} />
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
    name: state.get('student').get('name'),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Student))
