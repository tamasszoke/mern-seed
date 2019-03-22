import React, { Component } from 'react'
import styles from './error.module.scss'

class Error extends Component {
  render() {
    return (
      <div className={ styles.error }>
        <h1>404</h1>
        <h2>Not found!</h2>
        <div
          onClick={() => { window.location.href = "/" }}
          className={ styles.link }
        >
          Home page
        </div>
      </div>
    )
  }
}

export default Error