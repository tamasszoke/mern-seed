import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../core/store/store'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import useConfig from '../../../core/hooks/useConfig'
import Reset from './reset'
import { Response } from '../../../app.interface'

const { getApiUrl } = useConfig()
const apiUrl = getApiUrl()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockData = {
  success: false,
  status: 400,
  result: false,
  error: '*',
}

describe('Reset', () => {
  describe('#init', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Reset />
          </BrowserRouter>
        </Provider>
      )
    })
    it('should have title', () => {
      expect(
        screen.getByText(/reset/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
    it('should have code input', () => {
      expect(screen.getByPlaceholderText('Code')).toBeInTheDocument()
    })
    it('should have password input', () => {
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    })
    it('should have password again input', () => {
      expect(screen.getByPlaceholderText('Password again')).toBeInTheDocument()
    })
    it('should have save button', () => {
      expect(
        screen.getByText(/save/i, { selector: 'input' })
      ).toBeInTheDocument()
    })
  })

  describe('#request', () => {
    it('should return success false', async () => {
      mockedAxios.post.mockResolvedValue(mockData)

      const response: Response = await axios.post(`${apiUrl}/auth/local/reset`)
      expect(response.success).toEqual(false)
      expect(response.status).toEqual(400)
      expect(response.result).toEqual(false)
      expect(response.error).toEqual('*')
    })

    afterEach(() => {
      jest.resetAllMocks()
    })
  })
})
