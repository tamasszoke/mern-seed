import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './core/store/store'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import useConfig from './core/hooks/useConfig'
import App from './app'
import { Response } from './app.interface'

const { getApiUrl } = useConfig()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockData = {
  success: false,
  status: 401,
  result: false,
  error: '*',
}

describe('App', () => {
  describe('#init', () => {
    beforeEach(async () => {
      await waitFor(() =>
        render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        )
      )
    })
    it('should have title', () => {
      expect(
        screen.getByText(/welcome/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
    it('should have navigation', () => {
      expect(
        screen.getByRole('link', {
          name: /home/i,
        })
      ).toBeInTheDocument()
    })
    it('should have background', () => {
      expect(screen.getByTestId('background')).toBeInTheDocument()
    })
  })

  describe('#request', () => {
    const apiUrl = getApiUrl()

    it('should return success false', async () => {
      mockedAxios.get.mockResolvedValue(mockData)

      const response: Response = await axios.get(`${apiUrl}/auth/check`)
      expect(response.success).toEqual(false)
      expect(response.status).toEqual(401)
      expect(response.result).toEqual(false)
      expect(response.error).toEqual('*')
    })

    afterEach(() => {
      jest.resetAllMocks()
    })
  })
})
