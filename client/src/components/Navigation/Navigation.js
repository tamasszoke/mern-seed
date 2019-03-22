import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar
} from '@material-ui/core'
import styles from './navigation.module.scss'
import { connect } from 'react-redux'

class Navigation extends Component {
  render() {
    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Link className={ styles.link } to="/">Home</Link>
            {
              this.props.authenticated ? 
              <font>
                <Link className={ styles.link } to="/profile">Profile</Link>
                <Link className={ styles.link } to="/logout">Sign out</Link>
              </font> :
              <font>
                <Link className={ styles.link } to="/login">Login</Link>
                <Link className={ styles.link } to="/recovery">Recovery</Link>
                <Link className={ styles.link } to="/registration">Registration</Link>
              </font>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(Navigation)
