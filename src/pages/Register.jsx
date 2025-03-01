import React, { useState } from 'react'

const Register = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(password != confirmPassword){
            alert("passwords dont match!")
            return
        }

        console.log(`logging with email: ${email} and password: ${password} confirm Password: ${confirmPassword}`)
      }


    return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        value={email}
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" 
        value={password}
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        />
        <input type="password" 
        value={confirmPassword}
        placeholder='Confirm Password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
