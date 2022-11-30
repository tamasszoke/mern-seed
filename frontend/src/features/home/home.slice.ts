import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HomeState {
  appName: string
  apiUrl: string
  theme: string
}

const initialState: HomeState = {
  appName: 'mern-seed',
  apiUrl: 'https://localhost:3001/api',
  theme: 'theme-light',
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload
    },
    setApiUrl: (state, action: PayloadAction<string>) => {
      state.apiUrl = action.payload
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    switchTheme: (state) => {
      state.theme = state.theme === 'theme-light' ? 'theme-dark' : 'theme-light'
    },
  },
})

export type { HomeState }
export const { setAppName, setApiUrl, setTheme, switchTheme } =
  homeSlice.actions
export default homeSlice

// const dispatch = useAppDispatch()
// dispatch(incrementByAmount(incrementValue))
// dispatch(homeSlice.actions.incrementByAmount(incrementValue))

// export const selectUrl = (state: RootState) => state.home.url
// const url = useAppSelector(selectUrl)

// const url = useSelector((state) => state.home.url)
// dispatch(homeSlice.actions.setUrl(false))
