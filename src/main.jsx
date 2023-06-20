import React from 'react'
import ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from './theme.js'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
)
