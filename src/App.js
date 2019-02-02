import React, { Component } from 'react';
// import logo from './logo.svg';
import { Input, Button, Icon } from 'antd';
import './App.css';
import './css/todolist.css'


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { id: "1", text: "first one" },
        { id: "2", text: "first two" }
      ],
      inputText: ""
    }
  }

  handleChange = (e) => {
    this.setState({ inputText: e.target.value })
  }

  handSubmit = (e) => {
    e.preventDefault();
    if (!this.state.inputText.length) {
      return
    }
    const item = {
      id: Date.now(),
      text: this.state.inputText
    }

    this.setState(state => ({
      items: state.items.concat(item),
      inputText: ""
    }))
  }

  delete = (id) => {
    let copy = this.state.items.concat()
    this.setState({
      items: copy.filter(item => item.id !== id)
    })
  }

  render() {
    const inputText = this.state.inputText
    return (
      <div>
        <h1>TODO LIST</h1>
        <Input onChange={this.handleChange} value={inputText} className="myinputBox" placeholder="Basic usage" />

        <Button onClick={this.handSubmit} type="primary">Primary</Button>
        <TodoList items={this.state.items} delete={id => this.delete(id)} />
      </div>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text} <span><Icon type="close" onClick={() => { this.props.delete(item.id) }} /></span></li>
        ))}
      </ul>
    );
  }
}

export default App;
