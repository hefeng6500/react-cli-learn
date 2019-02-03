import React, { Component } from 'react';
// import logo from './logo.svg';
import { Input, Button, Icon } from 'antd';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { id: '1', text: 'first one' },
        { id: '2', text: 'second one' }
      ],
      inputValue: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleAdd = () => {
    if(!this.state.inputValue){
      return
    }
    let newItem = {
      id: Date.now(),
      text: this.state.inputValue
    }
    this.setState(state => ({
      items: state.items.concat(newItem),
      inputValue: ""
    }))
  }

  handleDelete = (id) => {
    // let newItems = this.state.items.concat()
    // newItems.filter(item=>item.id!==id)
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Todolist</h1>
        <Input placeholder="Basic usage" className="myInput" value={this.state.inputValue} onChange={this.handleChange} />
        <Button type="primary" className="btn" onClick={this.handleAdd}>add Data</Button>
        <Todolist items={this.state.items} handleDelete={id => this.handleDelete(id)} />
      </div>
    )
  }
}


class Todolist extends Component {
  render() {
    return (
      <div className="todolist">
        <ul>
          {
            this.props.items.map(item => {
              return (
                <li key={item.id}>{item.text} <span><Icon type="close" onClick={() => this.props.handleDelete(item.id)} /></span></li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default App;
