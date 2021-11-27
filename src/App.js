import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, HashRouter } from 'react-router-dom'
import './reset.css'
import loadable from './util/Loadable'

import Login from './components/Login/Login'
const Admin = loadable(() => import('./components/admin/admin'))
const Student = loadable(() => import('./components/student/student'))
const Teacher = loadable(() => import('./components/teacher/teacher'))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Route path="/" exact component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/student" component={Student} />
          <Route path="/teacher" component={Teacher} />
        </HashRouter>
      </Provider>
    )
  }
}

export default App
