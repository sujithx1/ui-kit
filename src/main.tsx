import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme/index.ts'

createRoot(document.getElementById('root')!).render(
<ChakraProvider value={system}>
  <App />
</ChakraProvider>

)
