
import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SignUpImg from '../../../assets/signup.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const schema = yup.object({
        firstName: yup.string().min(3).required("First Name is Required"),
        lastName: yup.string().min(3).required("Last Name is Required"),
        email: yup.string().required("Your Email is Required"),
        password: yup.string().required("Password is Required").min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
    });

    const signUpValue = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: signUpValue,
        resolver: yupResolver(schema),
    });

    const signUpHandler = (data) => {
        console.log(data);
        reset(); 
    };

    return (
        <div className='container mt-5'>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} className='text-center'>
                    <img className='img-fluid' src={SignUpImg} alt="Sign Up" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                    <Box>
                        <Typography variant='h4' className='mt-3 fw-semibold'>Get Start Shopping</Typography>
                        <Typography variant='body2' className='my-3'>Welcome to FreshCart! Enter your email to get started.</Typography>

                        <form onSubmit={handleSubmit(signUpHandler)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField fullWidth placeholder='First Name' size='small' {...field} />
                                        )}
                                    />
                                    <p className='text-danger fw-bold mt-2'>{errors.firstName?.message}</p>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField fullWidth placeholder='Last Name' size='small' {...field} />
                                        )}
                                    />
                                    <p className='text-danger fw-bold mt-2'>{errors.lastName?.message}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField type='email' fullWidth placeholder='Enter Email' size='small' {...field} />
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
                                    <Button type="submit" className='bg-success' variant='contained' fullWidth>Register</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};


export default SignUp