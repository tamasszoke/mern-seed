import homeSlice, {
  HomeState,
  setAppName,
  setApiUrl,
  setTheme,
} from './home.slice'

describe('Home slice', () => {
  const homeReducer = homeSlice.reducer
  const initialState: HomeState = {
    appName: 'mern-seed',
    apiUrl: 'https://localhost:3001/api',
    theme: 'theme-light',
  }

  const appName = 'appName'
  const apiUrl = 'apiLink'
  const theme = 'light'

  describe('#init', () => {
    it('should handle initial state', () => {
      expect(homeReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })
  })
  describe('#functions', () => {
    it('should handle setAppName', () => {
      const actual = homeReducer(initialState, setAppName(appName))
      expect(actual.appName).toEqual(appName)
    })
    it('should handle setApiUrl', () => {
      const actual = homeReducer(initialState, setApiUrl(apiUrl))
      expect(actual.apiUrl).toEqual(apiUrl)
    })
    it('should handle setTheme', () => {
      const actual = homeReducer(initialState, setTheme(theme))
      expect(actual.theme).toEqual(theme)
    })
  })
})
