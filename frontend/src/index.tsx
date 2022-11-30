import './index.scss'
import { Provider } from 'react-redux'
import { store, persistor } from './core/store/store'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './app'

// Routing based on
// https://github.com/remix-run/react-router/blob/main/docs/getting-started/installation.md#basic-installation

// Redux toolkit persist based on
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

const container = document.getElementById('root')!
const root = ReactDOM.createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
