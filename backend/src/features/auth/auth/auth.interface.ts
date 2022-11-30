'use strict'

interface UserResponse {
  id: string
  email: string
  active?: boolean
  created: string
  updated: string
}

interface UserData {
  email: string
  password: string
  salt?: string
  activationCode?: string
  created?: string
  updated?: string
}

export { UserResponse, UserData }
