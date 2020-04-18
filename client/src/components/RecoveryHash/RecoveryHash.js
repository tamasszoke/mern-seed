import React, { Component } from 'react'
import styles from './recoveryHash.module.scss'
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

class RecoveryHash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      passwordAgain: '',
      hash: this.props.match.params.hash,
      loading: false
    }
  }

  recover = async () => {
    const { password, hash } = this.state
    const userdata = {
      hash,
      password
    }
    this.setState({
      loading: true
    })
    const response = await axios.post(`${this.props.url}/api/auth/recovery`, userdata)
    this.setState({
      loading: false
    })
    if (response.data.success) {
      this.props.notification({
        type: 'success',
        title: 'Password updated!',
        message: 'You can sign in now!'
      })
      this.props.history.push('/login')
    } else {
      this.props.notification({
        type: 'danger',
        title: 'Update failed!',
        message: 'Try again later!'
      })
      this.props.history.push('/')
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
      <div className={ styles.recoveryHash }>
        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
          <Paper>
            <Typography className={ styles.title } component="h1" variant="h5">
              Recovery
            </Typography>
            <ValidatorForm
              ref="form"
              onSubmit={ this.recover }
              // onError={ errors => console.log(errors) }
              className={ styles.content }
            >
              <TextValidator
                label="New password"
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
                label="New password again"
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
                  fullWidth
                >
                  Update password
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

export default connect(mapStateToProps)(RecoveryHash)
