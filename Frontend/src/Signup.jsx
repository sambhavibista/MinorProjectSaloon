import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from './SignUpValidation';
import axios from 'axios';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';

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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', height: '100vh' }}>
      <Container component={Paper} elevation={3} sx={{ width: "250px" }}>
        <Typography variant="h5">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <label htmlFor="name"><strong>Name</strong></label>
            <TextField
              type='text'
              placeholder='Enter name'
              name='name'
              onChange={handleInput}
              fullWidth
              variant="outlined"
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </Box>
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
          {serverError && <Typography variant="body2" color="error">{serverError}</Typography>}
          <Button type='submit' variant="contained" color="success" fullWidth>Sign Up</Button>
          <Typography variant="body2" sx={{ mt: 2 }}>By signing up, you agree to our terms and conditions.</Typography>
        </form>
      </Container>
    </Box>
  );
}

export default Signup;
