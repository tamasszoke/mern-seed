import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../core/store/store'
import { BrowserRouter } from 'react-router-dom'
import Error from './error'

describe('Error', () => {
  describe('#init', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Error status={404} message="Page not found" />
          </BrowserRouter>
        </Provider>
      )
    })
    it('should have title', () => {
      expect(
        screen.getByText(/404/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
    it('should have message', () => {
      expect(
        screen.getByText(/page not found/i, { selector: '.text' })
      ).toBeInTheDocument()
    })
    it('should have link to main page', () => {
      expect(
        screen.getByRole('link', { name: /go to main page/i })
      ).toBeInTheDocument()
    })
  })
})
