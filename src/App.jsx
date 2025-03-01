import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/chat' element={<Chat/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
