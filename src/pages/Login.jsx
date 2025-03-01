import React from 'react'

const Login = () => {
  const handleLogin = () => {
    console.log("login")
  }
  
    return (
    <div>
      <form onSubmit={handleLogin}></form>
    </div>
  )
}

export default Login
