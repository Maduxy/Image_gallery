import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Home'
import Signup from '../components/Signup'

function Pages() {
  return (
    <div>
        <Routes>
            <Route path='/home/:tags' element={<Home/>}/>
            <Route path='/' element={<Signup/>}/>
        </Routes>
    </div>
  )
}

export default Pages