import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../core/store/store'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import useConfig from '../../../core/hooks/useConfig'
import Activation from './activation'
import { Response } from '../../../app.interface'

const { getApiUrl } = useConfig()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Activation', () => {
  const apiUrl = getApiUrl()

  const mockData = {
    success: false,
    status: 400,
    result: false,
    error: '*',
  }

  describe('#init', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Activation />
          </BrowserRouter>
        </Provider>
      )
    })
    it('should have title', () => {
      expect(
        screen.getByText(/activation/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
    it('should have code input', () => {
      expect(
        screen.getByPlaceholderText(/activation code/i)
      ).toBeInTheDocument()
    })
    it('should have activate button', () => {
      expect(
        screen.getByText(/activate/i, { selector: 'input' })
      ).toBeInTheDocument()
    })
    it('should have resend button', () => {
      expect(screen.getByText(/resend email/i)).toBeInTheDocument()
    })
  })

  describe('#request', () => {
    it('should return success false', async () => {
      mockedAxios.post.mockResolvedValue(mockData)

      const response: Response = await axios.post(
        `${apiUrl}/auth/local/activate`
      )
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
