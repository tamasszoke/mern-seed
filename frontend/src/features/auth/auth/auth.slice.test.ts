import authSlice, { AuthState, setUser } from './auth.slice'

describe('Auth slice', () => {
  const authReducer = authSlice.reducer
  const initialState: AuthState = {
    user: {
      id: '',
      email: '',
      created: '',
      updated: '',
    },
  }

  const user = {
    name: 'name',
    email: 'name@email.com',
  }

  describe('#init', () => {
    it('should handle initial state', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })
  })
  describe('#functions', () => {
    it('should handle setUser', () => {
      const actual = authReducer(initialState, setUser(user))
      expect(actual.user).toEqual(user)
    })
  })
})
