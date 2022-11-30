import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../core/store/store'
import { UserResponse } from './auth.interface'

interface AuthState {
  user: UserResponse
}

const initialState: AuthState = {
  user: {
    id: '',
    email: '',
    created: '',
    updated: '',
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
  },
})

export type { AuthState }
export const { setUser } = authSlice.actions
export const user = (state: RootState) => state.auth.user
export default authSlice
