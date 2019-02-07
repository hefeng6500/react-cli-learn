import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import "../css/login.css"

import * as server from '../api/login'

class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: "admin",
			password: "hefeng6500"
		}
		this.usernameChange = this.usernameChange.bind(this)
		this.passwordChange = this.passwordChange.bind(this)
		this.login = this.login.bind(this)
	}

	usernameChange(e){
		this.setState({username: e.target.value})
	}

	passwordChange(e){
		this.setState({password: e.target.value})
	}

	login(){
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
	
	render(){
		return (
			<div>
				<div className="container">
					<div className="userBox">
						<span className="title">兰亭古墨</span>
						<span className="welcome">Welcome!</span>
						<Input className="login-input" type="text" value={this.state.username} onChange={this.usernameChange} />
						<Input className="login-input" type="password" value={this.state.password} onChange={this.passwordChange} />
						<Button className="login-btn" onClick={this.login}>登录</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default Login