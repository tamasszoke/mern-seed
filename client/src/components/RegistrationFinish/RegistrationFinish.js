import React, { Component } from 'react'
import styles from './registrationFinish.module.scss'
import { setUser } from '../../actions/connectionActions'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import axios from 'axios'

class Setup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
      password: '',
      passwordAgain: '',
      email: this.props.user.email,
      loading: false
    }
  }
  
  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false
      }
      return true
    })
  }

  setPassword = async () => {
    const { email, password } = this.state
    const userdata = {
      email,
      password
    }
    this.setState({
      loading: true
    })
    const response = await axios.post(`${this.props.url}/api/auth/registration/finish`, userdata)
    this.setState({
      loading: false,
      open: false
    })
    if (response.data.success) {
      this.props.setUser(response.data.user)
      this.props.notification({
        type: 'success',
        title: 'Password saved!',
        message: 'Your registration is complete!'
      })
    } else {
      this.props.notification({
        type: 'danger',
        title: 'Save failed!',
        message: 'Try again later!'
      })
    }
  }

  handleClose = () => {
    this.setState({
      open: false
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
    const { open, loading, email } = this.state

    return (
      <div>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Finish registration</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a password to your account.<br/>
              Registered email: { email }
            </DialogContentText>
            <ValidatorForm
              ref="form"
              onSubmit={ this.setPassword }
              // onError={ errors => console.log(errors) }
              className={ styles.content }
            >
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
              <Button onClick={this.handleClose} color="primary">
                Later
              </Button>
              {
                loading ?
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled
                >
                  <CircularProgress color="primary" size={ 24 } />
                </Button> :
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={ styles.right }
                >
                  Save password
                </Button>
              }
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    authenticated: state.authenticated,
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => { dispatch(setUser(user)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Setup))