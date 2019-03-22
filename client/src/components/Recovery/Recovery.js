import React, { Component } from 'react'
import {
  Paper,
  Typography,
  Button,
  Grid
} from '@material-ui/core'
import styles from './recovery.module.scss'
import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue, green } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
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
    const response = await axios.post(`${this.props.url}/api/user/recovery`, userdata)
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

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render = () => {
    const { loading } = this.state

    return (
      <MuiThemeProvider theme={theme}>
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

export default connect(mapStateToProps)(Recovery)
