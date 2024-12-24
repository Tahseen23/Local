import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Index.jsx'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store/store.js'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

export const persistor=persistStore(store)

createRoot(document.getElementById('root')).render(




  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
)
