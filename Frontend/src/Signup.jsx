import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from './SignUpValidation';
import axios from 'axios';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import './signup.css'
import logo from "../src/assets/images/SELOGO 1.png";


function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          if (res.data === "Email already exists") {
            setServerError("Email already exists. Please use a different email.");
          } else {
            navigate('/');
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <Box className='main_container'>
    
    <Box className='form_container'>
   
    <Container className='form' component={Paper} elevation={3} >
    
  <Paper elevation={1} sx={{ padding: 1, marginTop: 2,  }}>
  <img className='logo' src={logo} alt="Style Easy" style={{  }} />

        <Typography variant="h5">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 1, }}>
            <label htmlFor="name"><strong>Name</strong></label>
            <TextField
              type='text'
              placeholder='Enter Name'
              name='name'
              onChange={handleInput}
              fullWidth
              variant="outlined"
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </Box>
          <Box sx={{ className:'' }}>
            <label htmlFor="email"><strong>Email</strong></label>
            <TextField
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              fullWidth
              variant="outlined"
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </Box>
          <Box sx={{ className:'form', mb: 3 }}>
            <label htmlFor="password"><strong>Password</strong></label>
            <TextField
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={handleInput}
              fullWidth
              variant="outlined"
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </Box>
          {serverError && (
            <Typography color="error" variant="body2" gutterBottom>
              {serverError}
            </Typography>
          )}        
            <Button  type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#ff4742', color: 'white', }}>
  Sign Up
</Button>
          <Typography padding='10px' variant="body2" sx={{ mt: 2 }}>By signing up, you agree to our terms and conditions.</Typography>
        </form>
        </Paper>

      </Container>
    </Box>
    </Box>
  );
}

export default Signup;
