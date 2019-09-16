import React, { Component } from 'react'
import styles from './profile.module.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  removeUser = async () => {
    const { id, email } = this.props.user
    const userdata = {
      data: {
        id,
        email
      }
    }
    this.setState({
      loading: true
    })
    const response = await axios.delete(`${this.props.url}/api/user/profileremove`, userdata)
    this.setState({
      loading: false
    })
    if (response.data.success) {
      this.props.notification({
        type: 'success',
        title: 'Success!',
        message: 'Profile deleted!'
      })
      this.props.history.push('/logout')
    } else {
      this.props.notification({
        type: 'danger',
        title: 'Delete failed!',
        message: 'Try again later!'
      })
    }
  }

  removeDialogClick = () => {
    this.setState({
      open: this.state.open ? false : true
    })
  }

  render() {
    return (
      <div className={ styles.profile }>
        <Card className={ styles.card }>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Profile
            </Typography>
            <Typography color="textSecondary">
              Username
            </Typography>
            <Typography component="p" gutterBottom>
              { this.props.user.username }
            </Typography>
            <Typography color="textSecondary">
              Name
            </Typography>
            <Typography component="p" gutterBottom>
              { this.props.user.name }
            </Typography>
            <Typography color="textSecondary">
              Email
            </Typography>
            <Typography component="p" gutterBottom>
              { this.props.user.email }
            </Typography>
            <Typography color="textSecondary">
              Age
            </Typography>
            <Typography component="p" gutterBottom>
              { this.props.user.age }
            </Typography>
            <Typography color="textSecondary">
              Location
            </Typography>
            <Typography component="p" gutterBottom>
              { this.props.user.location }
            </Typography>
          </CardContent>
        </Card>
        <Button
          onClick={ this.removeDialogClick }
          className={ styles.button }
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
        <Button
          className={ styles.button }
          variant="contained"
        >
          <Link className={ styles.link } to="/profile/modify">Modify</Link>
        </Button>
        <Dialog
          open={ this.state.open }
          onClose={ this.removeDialogClick }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete your profile?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure?<br/>This action is irreversible, you will lose all your data!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.removeDialogClick } color="primary">
              No
            </Button>
            <Button onClick={ this.removeUser } color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    user: state.user,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Profile)
