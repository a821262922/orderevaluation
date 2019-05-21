import React, { Component } from 'react'
import './App.css';
import OrderList from './components/OrderList/OrderList'
import Header from './components/Header/Header'

export default class App extends Component {
    constructor(props) {
      super(props)

      this.state = {}
    }
    
  render() {
    return (
      <div>
        <Header/>
        <OrderList/>
      </div>
    )
  }
}
