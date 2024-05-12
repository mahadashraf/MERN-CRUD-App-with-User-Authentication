import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:3000/login' , {email,password})
      
      .then(res => {console.log(res)
        if(res.data === "Success"){
          navigate('/home')
        }
      
        
      })
      .catch(err =>console.log(err))

    };
  return (
    <form onSubmit={handleSubmit}>
    <div className="container">
      <h1>Login</h1>
      <p>Please fill in this form to log into your account.</p>
      <hr />

      <label htmlFor="email"><b>Email</b></label>
      <input 
        type="text" 
        placeholder="Enter Email" 
        name="email" 
        id="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        
      />

      <label htmlFor="password"><b>Password</b></label>
      <input 
        type="password" 
        placeholder="Enter Password" 
        name="psw" 
        id="psw" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
         
      />
      <hr />

      <button type="submit" className="loginbtn">Login</button>
    </div>
    
    <div className="container signin">
      <p>Don't have an account? <Link to="/signup">Register</Link>.</p>
    </div>
  </form>
  )
}

export default Login