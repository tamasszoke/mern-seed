import React, { Component } from 'react'
import styles from './registration.module.scss'
import { connect } from 'react-redux'
import {
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress
} from '@material-ui/core'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: null,
      email: null,
      password: null,
      passwordAgain: null,
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
    const response = await axios.put(`${this.props.url}/api/auth/registration`, userdata)
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

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
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
                onChange={ this.handleChange }
                name="username"
                value={ this.state.username || '' }
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
              <TextValidator
                label="Name"
                onChange={ this.handleChange }
                name="name"
                value={ this.state.name || '' }
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
              <TextValidator
                label="Email"
                onChange={ this.handleChange }
                name="email"
                value={ this.state.email || '' }
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
              <TextValidator
                label="Password again"
                onChange={ this.handleChange }
                name="passwordAgain"
                type="password"
                value={ this.state.passwordAgain || '' }
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
                autoComplete="new-password"
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
