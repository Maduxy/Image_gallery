import './App.css';
import {BrowserRouter} from "react-router-dom"
import React from 'react'
import Pages from './pages/Pages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Pages/>
      </BrowserRouter>
    </div>
  )
}

export default App
