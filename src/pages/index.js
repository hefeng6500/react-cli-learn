import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


import { Button } from 'antd'
import * as server from '../api/login'

class Index extends Component {
  test(){
    server.test().then(res=>{
      
    })
  }
  render(){
    return (
      <div>
        <div>
          <h1>Index</h1>
          <Button onClick={this.test}>测试</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(Index)