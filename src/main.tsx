import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'


createRoot(document.getElementById('root')!).render(
  
  <>
    {/* <Router> */}
      <Provider store={store}>
        <App />
      {/* <AppRoutes />
      <Toaster /> */}
      </Provider>
    {/* </Router> */}
  </>,
)
