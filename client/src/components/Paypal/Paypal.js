import React, { Component } from 'react'
import styles from './paypal.module.scss'
import { connect } from 'react-redux'
import { Card, CardContent, Typography } from '@material-ui/core'
import axios from 'axios'

class Paypal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }
  
  componentDidMount() {
    window.paypal.Buttons({
      createOrder: async () => {
        const response = await axios.post(`${this.props.url}/api/paypal/create`)
        return response.data.orderID
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(async (details) => {
          console.log('Transaction completed by ' + details.payer.name.given_name)
          // Call your server to save the transaction
          let response
          try {
            response = await axios.post(`${this.props.url}/api/paypal/complete`, { orderID: data.orderID })
          } catch (error) {
            return this.props.notification({
              type: 'danger',
              title: 'PayPal',
              message: 'Payment error!'
            })
          }
          if (response.status === 200) {
            return this.props.notification({
              type: 'success',
              title: 'PayPal',
              message: 'Payment success!'
            })
          } else {
            return this.props.notification({
              type: 'danger',
              title: 'PayPal',
              message: 'Payment error!'
            })
          }
        })
      }
    }).render('#paypal-button-container')
  }

  render() {
    return (
      <div className={ styles.paypal }>
        <Card className={ styles.card }>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              PayPal
            </Typography>
            <Typography component="p" gutterBottom>
              Pay $10 (sandbox)
            </Typography>
            <Typography component="div">
              <div id="paypal-button-container" className={ styles.button }></div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    user: state.user,
    notification: state.notification,
    paypal: state.paypal
  }
}

export default connect(mapStateToProps)(Paypal)
