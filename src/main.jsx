import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

/**
 * OTRA FORMA DE HACERLO
 * import {createRoot} from 'react-dom'
 * 
 * const root = createRoot(document.getElementById('root'))
 * root.render(<App />)
 */