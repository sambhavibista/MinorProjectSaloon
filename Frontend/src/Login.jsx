import React, { useState } from 'react';
import {  useNavigate,Link } from 'react-router-dom';
import Validation from './SignUpValidation';
import axios from 'axios';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';

function Login() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
      .then(res => {
        if(res.data === 'Success'){
          navigate('/home');
        }else{
          alert("No record existed");
        }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', height: '100vh' }}>
      <Container component={Paper} elevation={3} sx={{ width: "250px" }}>
        <Typography variant="h5">Log In</Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box sx={{ mb: 3 }}>
            <label htmlFor="email"><strong>Email</strong></label>
            <TextField
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={handleInput}
              fullWidth
              variant="outlined"
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </Box>
          <Box sx={{ mb: 3 }}>
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
          <Button type='submit' variant="contained" color="success" fullWidth>Log In</Button>
          <Typography variant="body2" sx={{ mt: 2 }}>By signing up, you agree to our terms and conditions.</Typography>
          <Button
      component={Link}
      to="/signup"
      variant="contained"
      fullWidth
      sx={{
        bgcolor: 'lightgray', // Adjust background color as needed
        borderRadius: 0, // Set border radius to 0 for sharp corners
        textDecoration: 'none', // Remove text decoration
        '&:hover': {
          bgcolor: 'lightgray', // Adjust hover background color if needed
        },
      }}
    >
      Create account
    </Button>
        </form>
      </Container>
    </Box>
  )
}

export default Login;
