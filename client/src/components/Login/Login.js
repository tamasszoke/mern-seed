import React, { Component } from 'react'
import {
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid
} from '@material-ui/core'
import styles from './login.module.scss'
import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue, green } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { setAuth, setUser } from '../../actions/connectionActions'
import { withRouter } from 'react-router'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green
  },
  typography: {
    useNextVariants: true
  }
})

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: 'user@email.com',
      password: 'password',
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
    const response = await axios.post(`${this.props.url}/api/user/login`, userdata)
    if (response.data.success) {
      this.props.setAuth(true)
      this.props.setUser(response.data.user)
      this.props.history.push('/')
    } else {
      this.setState({
        loading: false
      })
      this.props.notification({
        type: 'danger',
        title: 'Login failed!',
        message: 'Bad email or password!'
      })
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render = () => {
    const { loading } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        {/* <ReactNotification ref={this.notificationDOMRef} /> */}
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
                  onChange={ this.handleChange('email') }
                  name="email"
                  value={ this.state.email }
                  validators={[ 'required', 'isEmail', 'minStringLength:5', 'maxStringLength:100' ]}
                  errorMessages={[ 'this field is required', 'email is not valid', 'min length 5', 'max length 100' ]}
                  margin="normal"
                  fullWidth
                />
                <TextValidator
                  label="Password"
                  onChange={ this.handleChange('password') }
                  name="password"
                  type="password"
                  value={ this.state.password }
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
              </ValidatorForm>
            </Paper>
          </Grid>
        </div>
      </MuiThemeProvider>
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
