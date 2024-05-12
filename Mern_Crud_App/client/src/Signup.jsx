import React from 'react'
import { useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const signup = () => {
   
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()


  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3000/register' , {name,email,password})
    .then(res => {console.log(res)
      navigate('/')
    })
    .catch(err =>console.log(err))
}

  return (
    <form onSubmit={handleSubmit}>
    <div className="container">
      <h1>Register</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />

      <label htmlFor="name"><b>Name</b></label>
      <input 
        type="text" 
        placeholder="Enter Name" 
        name="name" 
        id="name" 
        
        onChange={(e) => setName(e.target.value)} 
       
      />

      <label htmlFor="email"><b>Email</b></label>
      <input 
        type="text" 
        placeholder="Enter Email" 
        name="email" 
        id="email" 
        
        onChange={(e) => setEmail(e.target.value)} 
        
      />

      <label htmlFor="password"><b>Password</b></label>
      <input 
        type="password" 
        placeholder="Password" 
        name="psw" 
        id="psw" 
        
        onChange={(e) => setPassword(e.target.value)} 
        
      />
      <hr />
     

      <button type="submit" className="registerbtn">Register</button>
    </div>
    
    <div className="container signin">
    <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
    </div>
  </form>
  )
}

export default signup