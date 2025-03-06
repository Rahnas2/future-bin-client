import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'







createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
      <AppRoutes />
      <Toaster />
      </Provider>
    </Router>
  </StrictMode>,
)
