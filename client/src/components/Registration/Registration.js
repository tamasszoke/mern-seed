import React, { Component } from 'react'
import {
  Paper,
  Typography,
  Button,
  Grid
} from '@material-ui/core'
import styles from './registration.module.scss'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue, green } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { connect } from 'react-redux'
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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordAgain: '',
      loading: false
    }
  }

  register = async () => {
    const { username, name, email, password } = this.state
    const userdata = {
      username,
      name,
      email,
      password
    }
    this.setState({
      loading: true
    })
    const response = await axios.put(`${this.props.url}/api/user/registration`, userdata)
    this.setState({
      loading: false
    })
    if (response.data.success) {
      this.props.notification({
        type: 'success',
        title: 'Signed up!',
        message: 'Check your emails!'
      })
      this.props.history.push('/')
    } else {
      this.props.notification({
        type: 'danger',
        title: 'Sign up failed!',
        message: 'Email already registered!'
      })
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false
      }
      return true
    })
  }

  render = () => {
    const { loading } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <div className={ styles.registration }>
          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Paper>
              <Typography className={ styles.title } component="h1" variant="h5">
                Sign up
              </Typography>
              <ValidatorForm
                ref="form"
                onSubmit={ this.register }
                // onError={ errors => console.log(errors) }
                className={ styles.content }
              >
                <TextValidator
                  label="Username"
                  onChange={ this.handleChange('username') }
                  name="username"
                  value={ this.state.username }
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
                <TextValidator
                  label="Name"
                  onChange={ this.handleChange('name') }
                  name="name"
                  value={ this.state.name }
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
                <TextValidator
                  label="Email"
                  onChange={ this.handleChange('email') }
                  name="email"
                  value={ this.state.email }
                  validators={[
                    'required',
                    'isEmail',
                    'minStringLength:5',
                    'maxStringLength:100'
                  ]}
                  errorMessages={[
                    'this field is required',
                    'email is not valid',
                    'min 5 characters',
                    'max 100 characters'
                  ]}
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
                <TextValidator
                  label="Password again"
                  onChange={ this.handleChange('passwordAgain') }
                  name="passwordAgain"
                  type="password"
                  value={ this.state.passwordAgain }
                  validators={[
                    'required',
                    'isPasswordMatch',
                    'minStringLength:5',
                    'maxStringLength:100'
                  ]}
                  errorMessages={[
                    'this field is required',
                    'password mismatch',
                    'min 5 characters',
                    'max 100 characters'
                  ]}
                  margin="normal"
                  fullWidth
                />
                {
                  loading ?
                  <Button
                    className={ this.button }
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled
                  >
                    <CircularProgress color="primary" size={ 24 } />
                  </Button> :
                  <Button
                    type="submit"
                    className={ this.button }
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Sign up
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
    notification: state.notification
  }
}

export default connect(mapStateToProps)(App)
