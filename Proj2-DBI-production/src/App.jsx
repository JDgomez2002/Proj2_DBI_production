import { useEffect } from 'react'
import Page from './pages'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </div>
  )
}

export default App
