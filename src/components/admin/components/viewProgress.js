import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Icon, Input } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'

import {} from '../store/actionCreators'

class Progress extends PureComponent {
  render() {
    return (
      <>
        <div>
          <div className="small-title">
            <Icon type="home" style={{ marginLeft: 20 }} />
            <span>
              Home > <b>选题进度</b>
            </span>
          </div>
          <div className="big-title">选题进度</div>
          <hr />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
