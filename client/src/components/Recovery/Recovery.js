import React, { Component } from 'react'
import styles from './recovery.module.scss'
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

class Recovery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      loading: false
    }
  }

  recover = async () => {
    const { email } = this.state
    const userdata = {
      email: email
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
        title: 'Recovery success!',
        message: 'Check your emails!'
      })
    } else {
      this.props.notification({
        type: 'danger',
        title: 'Recovery failed!',
        message: 'Email not found!'
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

  render = () => {
    const { loading } = this.state

    return (
      <div className={ styles.recover }>
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
                  Recover password
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

export default connect(mapStateToProps)(Recovery)
