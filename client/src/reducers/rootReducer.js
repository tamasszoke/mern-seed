const initState = {
  user: null,
  authenticated: false,
  notification: null,
  paypal: null
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'setUrl':
      return {
        ...state,
        url: action.url
      }
    case 'setNotifications':
      return {
        ...state,
        notification: action.notification
      }
    case 'setAuth':
      return {
        ...state,
        authenticated: action.authenticated
      }
    case 'setUser':
      return {
        ...state,
        user: action.user
      }
    case 'setPaypal':
      return {
        ...state,
        paypal: action.paypal
      }
    default:
      return state
  }
}

export default rootReducer
