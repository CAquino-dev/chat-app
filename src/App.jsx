import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
