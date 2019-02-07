import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import './App.css';
import * as server from './api/login'
import Login from './pages/login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: "",
      username: "admin",
      password: "hefeng6500"
    }
    this.login = this.login.bind(this)
    this.getCode = this.getCode.bind(this)
    this.test = this.test.bind(this)
  }

  componentDidMount(){
    // this.getCode()
  }
	
	test = async () => {
		server.test().then(res => {
		  console.log(res)
		}).catch(err => {
		  console.log(err)
		})
	}

  getCode= async ()=> {
    let code = await server.getCode()
    this.setState({
      code: code.data.data
    })
  }

  login= () => {
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    server.login(data).then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('token_exp', new Date().getTime());
    }).catch(err => {
      console.log(err)
    })
  }
  usernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  passwordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    return (
      <div>
				<Login></Login>

          {/* <div>Home</div>
          <Input type="text" value={this.state.username} onChange={this.usernameChange} />
          <Input type="password" value={this.state.password} onChange={this.passwordChange} />
          <Button onClick={this.login}>登录</Button>
          <Button onClick={this.getCode}>验证码获取</Button>
          <Button onClick={this.test}>测试</Button>
          <div dangerouslySetInnerHTML={{__html: this.state.code}}></div> */}
      </div>
    )
  }
}

export default App;
