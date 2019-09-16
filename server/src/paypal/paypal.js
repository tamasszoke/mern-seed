'use strict'

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')
const { paypal } = require('../config')
const payPalClient = paypal

/**
 * Call PayPal to set up a transaction
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest()
  request.prefer('return=representation')
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '10.00'
      }
    }]
  })
  let order
  try {
    order = await payPalClient.client().execute(request)
  } catch (err) {
    return res.sendStatus(500)
  }
  res.status(200).send({ orderID: order.result.id })
}

/**
 * After payment completed
 * @param {*} req
 * @param {*} res
 */
const complete = async (req, res) => {
  const orderID = req.body.orderID
  let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID)
  let order
  try {
    order = await payPalClient.client().execute(request)
  } catch (err) {
    return res.sendStatus(500)
  }
  // Validate the transaction details are as expected
  if (order.result.purchase_units[0].amount.value !== '10.00') {
    return res.sendStatus(400)
  }
  // Save the transaction in your database
  // await database.saveTransaction(orderID)
  return res.sendStatus(200)
}

module.exports = {
  create,
  complete
}
