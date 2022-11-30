import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../core/store/store'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import useConfig from '../../../core/hooks/useConfig'
import Profile from './profile'
import { Response } from '../../../app.interface'

// Hide console messages
console.warn = () => {}

const { getApiUrl } = useConfig()
const apiUrl = getApiUrl()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockData = {
  success: false,
  status: 401,
  result: false,
  error: '*',
}

describe('Profile', () => {
  describe('#init', () => {
    beforeEach(async () => {
      await waitFor(() =>
        render(
          <Provider store={store}>
            <BrowserRouter>
              <Profile />
            </BrowserRouter>
          </Provider>
        )
      )
    })
    it('should have title', () => {
      expect(
        screen.getByText(/profile/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
  })

  describe('#request', () => {
    it('should return success false', async () => {
      mockedAxios.post.mockResolvedValue(mockData)

      const response: Response = await axios.post(
        `${apiUrl}/user/profile/check`
      )
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
