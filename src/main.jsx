import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import { theme } from './theme';
import App from './App';
import './index.css';

if (!window.ethereum) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
Web3 wallet NOT detected! Consider installing a browser wallet like MetaMask. If you're on incognito, open this app in a normal tab and retry.
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </React.StrictMode>
  </ChakraProvider>
  );
}
