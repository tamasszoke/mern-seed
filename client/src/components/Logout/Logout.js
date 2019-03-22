import React, { Component } from 'react'
import styles from './logout.module.scss'
import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue, green } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { setAuth } from '../../actions/connectionActions'
import { withRouter } from 'react-router'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green
  },
  typography: {
    useNextVariants: true
  }
})

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
    this.logout()
  }

  logout = async () => {
    this.setState({
      loading: true
    })
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
      <MuiThemeProvider theme={theme}>
        <div className={ styles.logout }>
          {
            loading ?
            <div
              className={ styles.link }
              disabled
            >
              <h2>Signing out
                <CircularProgress
                  className={ styles.circle }
                  color="primary"
                  size={ 24 }
                />
              </h2>
            </div> :
            null
          }
        </div>
      </MuiThemeProvider>
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
