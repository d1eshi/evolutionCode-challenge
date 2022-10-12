import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { PokemonProvider } from './PokemonContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>
)
