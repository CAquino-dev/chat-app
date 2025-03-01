import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`logging with email: ${email} and password: ${password}`)
  }
  
    return (
    <div>
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
            <input type="text" 
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" 
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
