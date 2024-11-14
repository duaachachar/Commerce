import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import signInImg from '../../../assets/signin.svg';
import { Controller, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    firstName: yup.string().min(3).required("First Name is Required"),
    lastName: yup.string().min(3).required("Last Name is Required"),
    email: yup.string().required("Your Email is Required"),
    password: yup.string().required("Password is Required")
  });

  const signInValue = {

    email: "",
    password: ""
  };

  const { control, handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signInValue,
    resolver: yupResolver(schema),
  });

  const SignInHandler = (e, data) => {
    e.preventDefault();

  }

  return (
    <div className='container'>
      <Grid container>
        <Grid item xs={12} md={6} className='text-center mt-5'>
          <img src={signInImg} alt="img" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant='h4' className='mt-5 fw-semibold'>Sign in to FreshCart</Typography>
            <Typography variant='body2' className='my-3'>Welcome back to FreshCart! Enter your email to get started.</Typography>

            <form onSubmit={handleSubmit(SignInHandler)}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField type='email' fullWidth placeholder='Enter Email'
                        size='small' {...field} />
                    )}
                  />
                  <p className='text-danger fw-bold mt-2'>{errors.email?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        fullWidth
                        size='small'
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPassword ? 'hide password' : 'show password'}
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  <p className='text-danger fw-bold mt-2'>{errors.password?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" className='bg-success' variant='contained' fullWidth>Sign In</Button>
                </Grid>
              </Grid>
            </form>

          </Box>

        </Grid>

      </Grid>
    </div>
  );
};

// ya bhi same signup wala ki tahra same ha jasy hi from submit hu ga to from reset bhi hu jya ga!
{/* <div>
  import {Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography} from '@mui/material';
  import React, {useState} from 'react';
  import signInImg from '../../../assets/signin.svg';
  import {Controller, useForm} from 'react-hook-form';
  import {Visibility, VisibilityOff} from '@mui/icons-material';
  import * as yup from "yup";
  import {yupResolver} from '@hookform/resolvers/yup';

const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false);

  // Validation schema without firstName and lastName
  const schema = yup.object({
    email: yup.string().email("Invalid email format").required("Your Email is Required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is Required")
  });

  // Initial values
  const signInValue = {
    email: "",
  password: ""
  };

  const {control, handleSubmit, formState: {errors}, reset } = useForm({
    defaultValues: signInValue,
  resolver: yupResolver(schema),
  });

  // Form submit handler
  const SignInHandler = (data) => {
    console.log("Form Data: ", data);
  // Reset form fields after submission
  reset();
  };

  return (
  <div>
    <Grid container>
      <Grid item xs={12} md={6} className='text-center mt-5'>
        <img src={signInImg} alt="Sign In" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant='h4' className='mt-5 fw-semibold'>Sign in to FreshCart</Typography>
          <Typography variant='body2' className='my-3'>Welcome back to FreshCart! Enter your email to get started.</Typography>

          <form onSubmit={handleSubmit(SignInHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type='email'
                      fullWidth
                      placeholder='Enter Email'
                      size='small'
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      fullWidth
                      size='small'
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? 'hide password' : 'show password'}
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      error={!!errors.password}
                    />
                  )}
                />
                <p className='text-danger fw-bold mt-2'>{errors.password?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" sx={{ backgroundColor: "#0AAD0A" }} variant='contained' fullWidth>Sign In</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  </div>
  );
};

  export default SignIn;
</div> */}
export default SignIn
