import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {  ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
const system = createSystem(defaultConfig);

createRoot(document.getElementById('root')!).render(
<ChakraProvider value={system}>
  
  <App />
</ChakraProvider>

)
