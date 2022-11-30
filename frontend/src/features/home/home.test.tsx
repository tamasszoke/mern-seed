import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../core/store/store'
import { BrowserRouter } from 'react-router-dom'
import Home from './home'

describe('Home', () => {
  describe('#init', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </Provider>
      )
    })
    it('should have title', () => {
      expect(
        screen.getByText(/welcome/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
    it('should have summary', () => {
      expect(
        screen.getByText(/summary/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
    it('should have documentation', () => {
      expect(
        screen.getByText(/documentation/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
    it('should have credits', () => {
      expect(
        screen.getByText(/credits/i, { selector: '.title' })
      ).toBeInTheDocument()
    })
  })
})
