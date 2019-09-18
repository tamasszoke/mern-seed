import React, { Component } from 'react'
import styles from './logout.module.scss'
import { connect } from 'react-redux'
import { setAuth } from '../../actions/connectionActions'
import { withRouter } from 'react-router'
import { Typography, CircularProgress } from '@material-ui/core'
import axios from 'axios'

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
    this.logout()
  }

  logout = async () => {
    const response = await axios.post(`${this.props.url}/api/user/logout`)
    if (response.data.success) {
      this.props.setAuth(false)
      this.props.history.push('/')
    } else {
      this.setState({
        loading: false
      })
      this.props.notification({
        type: 'danger',
        title: 'Logout failed!',
        message: 'Try again!'
      })
    }
  }

  render = () => {
    const { loading } = this.state
    return (
      <div className={ styles.logout }>
        {
          loading ?
          <Typography variant="h5" gutterBottom>
            Signing out
            <CircularProgress
              className={ styles.circle }
              color="inherit"
              size={ 24 }
            />
          </Typography> :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    notification: state.notification,
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (authenticated) => { dispatch(setAuth(authenticated)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))
