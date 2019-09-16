export const setUrl = (url) => {
  return {
    type: 'setUrl',
    url
  }
}

export const setAuth = (authenticated) => {
  return {
    type: 'setAuth',
    authenticated
  }
}

export const setNotifications = (notification) => {
  return {
    type: 'setNotifications',
    notification
  }
}

export const setUser = (user) => {
  return {
    type: 'setUser',
    user
  }
}

export const setPaypal = (paypal) => {
  return {
    type: 'setPaypal',
    paypal
  }
}

export const setTheme = (theme) => {
  return {
    type: 'setTheme',
    theme
  }
}
