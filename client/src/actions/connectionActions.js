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
