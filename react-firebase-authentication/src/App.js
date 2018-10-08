import React, { Component } from 'react'
import firebase from 'firebase'

import './App.css'
import { CONFIG } from './firebase'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: 0,
      list: []
    }
    
    firebase.initializeApp(CONFIG)
    let db = firebase.database().ref('/name')
    db.on('value', snapshot => {
      this.setState({
        list: snapshot.val()
      })
    })
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  onAgeChange(e) {
    this.setState({
      age: e === 'increase' ? this.state.age + 1 : this.state.age - 1
    })
  }

  onSubmit() {
    let db = firebase.database().ref('/name')
    const { name, age } = this.state
    db.push({
      name,
      age
    })

  }

  render() {
    const { name, age, list } = this.state
    return (
      <div className="App">
        <div>
          <h1>Name</h1>
          <input type="text" onChange={this.onNameChange.bind(this)}></input>
          <h3>{name}</h3>
        </div>
        <div>
          <h1>Age</h1>
          <button onClick={() => this.onAgeChange("increase")}>+</button>
          <p>{age}</p>
          <button onClick={() => this.onAgeChange("decrease")}>-</button>
        </div>
        <button onClick={this.onSubmit.bind(this)}>submit</button>

        <table className="table">
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
          {
            Object.keys(list).map((data, index) => {
              return (
                <tr>
                  <td>{list[data].name}</td>
                  <td>{list[data].age}</td>
                </tr>
              )
            })
          }
        </table>
      </div>
    )
  }
}

export default App
