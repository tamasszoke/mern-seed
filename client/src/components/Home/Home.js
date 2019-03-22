import React, { Component } from 'react'
import styles from './home.module.scss'

class Home extends Component {  
  render() {
    return (
      <div className={ styles.home }>
        <h1>Home</h1>
        <h2>Welcome</h2>
        <p>node-react-boilerplate</p>
      </div>
    )
  }
}

export default Home
