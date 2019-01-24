import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Divider } from "antd";

// 通过获取hash值，修改Child内容，达到路由切换的效果
class About extends Component {
  render() {
    return (
      <h2>I am About</h2>
    )
  }
}

class Inbox extends React.Component {
  render() {
    return (
      <h2>I am Inbox</h2>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <h2>I am Home</h2>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: window.location.hash.substr(1)
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }

  render() {
    let Child
    switch (this.state.route) {
      case '/about':
        Child = About
        break;
      case '/inbox':
        Child = Inbox
        break;
      default:
        Child = Home
        break;
    }
    return (
      <div>
        <Home />
        <ul>
          <li><a href="#/about">about</a></li>
          <li><a href="#/inbox">inbox</a></li>
        </ul>
        <Child />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))