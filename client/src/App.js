import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import styles from './app.module.scss'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Registration from './components/Registration/Registration'
import ActivationHash from './components/ActivationHash/ActivationHash'
import Recovery from './components/Recovery/Recovery'
import RecoveryHash from './components/RecoveryHash/RecoveryHash'
import Error from './components/Error/Error'
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import { connect } from 'react-redux'
import { setUrl, setAuth, setNotifications } from './actions/connectionActions'
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import "animate.css"
import ProfileModify from './components/ProfileModify/ProfileModify'
// eslint-disable-next-line
import {// eslint-disable-next-line
  join,// eslint-disable-next-line
  send// eslint-disable-next-line
} from './components/SocketIo/Socket'
import axios from 'axios'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route { ...rest }
    render={(props) => (
      authenticated ?
      <Component { ...props } /> :
      <Redirect to='/login' />
    )}
  />
)

class App extends Component {
  constructor(props) {
    super(props)
    this.notification = this.notification.bind(this)
    this.notificationDOMRef = React.createRef()
    this.url = `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
    this.props.setNotifications(this.notification)
    this.props.setUrl(this.url)
    axios.defaults.withCredentials = true
  }

  componentDidMount() {
    axios.interceptors.response.use(undefined, (error) => {
      if(error.response.status === 401) {
        this.props.setAuth(false)
        this.notification({
          type: 'danger',
          title: 'Failed!',
          message: 'Not logged in!'
        })
        return Promise.reject(error)
      }
    })
  }

  notification(options) {
    const { type, title, message } = options
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceInRight"],
      animationOut: ["animated", "bounceOutRight"],
      dismiss: { duration: 5000 },
      dismissable: { click: true }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className={ styles.app }>
          <ReactNotification ref={this.notificationDOMRef} />
          <Navigation />
          <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/login" component={ Login } exact />
            <Route path="/logout" component={ Logout } exact />
            <Route path="/registration" component={ Registration } exact />
            <Route path="/activation/:hash" component={ ActivationHash } exact />
            <Route path="/recovery" component={ Recovery } exact />
            <Route path="/recovery/:hash" component={ RecoveryHash }/>
            <PrivateRoute path='/profile' component={ Profile } authenticated={ this.props.authenticated } exact/>
            <PrivateRoute path='/profile/modify' component={ ProfileModify } authenticated={ this.props.authenticated } exact/>
            <Route component={ Error } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUrl: url => { dispatch(setUrl(url)) },
    setAuth: authenticated => { dispatch(setAuth(authenticated)) },
    setNotifications: notifications => { dispatch(setNotifications(notifications)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
