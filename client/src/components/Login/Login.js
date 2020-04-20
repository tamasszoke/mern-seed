import React, { Component } from 'react'
import styles from './login.module.scss'
import { connect } from 'react-redux'
import { setAuth, setUser } from '../../actions/connectionActions'
import { withRouter } from 'react-router'
import {
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  CircularProgress
} from '@material-ui/core'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import axios from 'axios'
import GitHubIcon from '@material-ui/icons/GitHub'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      password: null,
      loading: false
    }
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    })
  }

  login = async () => {
    const { email, password } = this.state
    const userdata = {
      email: email,
      password: password
    }
    this.setState({
      loading: true
    })
    const response = await axios.post(`${this.props.url}/api/auth/login/local`, userdata)
    if (response.data.success) {
      this.props.setAuth(true)
      this.props.setUser(response.data.user)
      this.props.history.push('/')
    } else {
      this.props.notification({
        type: 'danger',
        title: 'Login failed!',
        message: 'Bad email or password!'
      })
    }
    this.setState({
      loading: false
    })
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  render = () => {
    const { loading } = this.state
    return (
      <div className={ styles.login }>
        <Grid
          item
          xs={ 12 }
          sm={ 6 }
          md={ 4 }
        >
          <Paper>
            <Typography className={ styles.title } component="h1" variant="h5">
              Sign in
            </Typography>
            <ValidatorForm
                ref="form"
                onSubmit={ this.login }
                // onError={ errors => console.log(errors) }
                className={ styles.content }
            >
              <TextValidator
                label="Email"
                onChange={ this.handleChange }
                name="email"
                value={ this.state.email || '' }
                validators={[ 'required', 'isEmail', 'minStringLength:5', 'maxStringLength:100' ]}
                errorMessages={[ 'this field is required', 'email is not valid', 'min length 5', 'max length 100' ]}
                margin="normal"
                fullWidth
                autoComplete="new-password"
              />
              <TextValidator
                label="Password"
                onChange={ this.handleChange }
                name="password"
                type="password"
                value={ this.state.password || '' }
                validators={[
                  'required',
                  'minStringLength:5',
                  'maxStringLength:100'
                ]}
                errorMessages={[
                  'this field is required',
                  'min 5 characters',
                  'max 100 characters'
                ]}
                margin="normal"
                fullWidth
                autoComplete="new-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              {
                loading ?
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled
                >
                  <CircularProgress color="primary" size={ 24 } />
                </Button> :
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign in
                </Button>
              }
              <Button
                href={ `${this.props.url}/api/auth/login/google` }
                variant="contained"
                className={ styles.google }
                fullWidth
              >
                <svg
                  className="svgIcon-use"
                  width="20"
                  height="25"
                  viewBox="0 0 25 25"
                >
                  <g fill="none">
                    <path
                      d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                      fill="#34A853"
                    />
                    <path
                      d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
                <font className={ styles.space }></font>
                Continue with Google
              </Button>
              <Button
                href={ `${this.props.url}/api/auth/login/github` }
                variant="contained"
                className={ styles.github }
                fullWidth
              >
                <GitHubIcon fontSize="small"></GitHubIcon>
                <font className={ styles.space }></font>
                Continue with GitHub
              </Button>
            </ValidatorForm>
          </Paper>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    authenticated: state.authenticated,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (authenticated) => { dispatch(setAuth(authenticated)) },
    setUser: (user) => { dispatch(setUser(user)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
