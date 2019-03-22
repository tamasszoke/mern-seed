import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './profile.module.scss'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
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
        <h1>Profile</h1>
        <p><b>Username:</b> { this.props.user.username }</p>
        <p><b>Name:</b> { this.props.user.name }</p>
        <p><b>Email:</b> { this.props.user.email }</p>
        <p><b>Age:</b> { this.props.user.age || '-' }</p>
        <p><b>Location:</b> { this.props.user.location || '-' }</p>
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
