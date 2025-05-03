import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      
      console.log(data.user);

      if(response.ok){
        setSuccess("Login Successfull")
        setTimeout(() => setSuccess(""), 3000)
        console.log("login successful")
        setEmail("");
        setPassword("");
        navigate('/chat');
      }else{
        setError("Login Failed")
        setTimeout(() => setError(""), 3000)
      }

    } catch (error) {
      setError("Database error")
      console.log(error);
    }

  }
  
    return (
    <div>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
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
