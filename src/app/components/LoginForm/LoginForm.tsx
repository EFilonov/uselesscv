"use client";
import {Card} from "@/app/components/Card/Card";
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';
import { useForm, SubmitHandler } from "react-hook-form"

import './LoginForm.css';
import { Button, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    type Inputs = {
        email: string
        password: string
    }

    const { register, handleSubmit, watch, formState: { errors }, } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(errors.email?.message) // watch input value by passing the name of it
    console.log( errors.password?.message) // watch input value by passing the name of it`;
    return (
        <div className="formWrapper">
            <Card className="loginForm">
                <h3 className="loginTitle">Login to your account</h3>
                
                <form className="loginFormContent" onSubmit={handleSubmit(onSubmit)}>
                    <Button sx={{
                            mt: 2,
                            backgroundColor: "var(--secondary)",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                        }} 
                            variant="contained"
                            startIcon={<GoogleIcon />}>
                            Sign in with Google
                    </Button>
                    <Button sx={{
                            mt: 2,
                            backgroundColor: "var(--secondary)",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                        }} 
                            variant="contained"
                            startIcon={<GitHubIcon />}>
                            Sign in with GitHub
                    </Button>
                    <Divider sx ={{mt:4}}>or</Divider>
                    <h4>Enter your email and password below</h4>
                    <div className="forgotPassword">
                        <a className="forgotLink" href="/register">Forgot your password?</a> 
                    </div> 
                    <div className="login">
                        <TextField 
                            {...register("email", 
                                { required: true, maxLength: 20 })}
                            sx={{ m: 0, width: '100%',
                            '& .MuiInput-underline:after': {
                            borderBottomColor: 'var(--secondary)',},
                            '& label.Mui-focused': {color: 'var(--secondary)',},
                            }}
                            id="standard-basic" 
                            label="Email" 
                            variant="standard" 
        // error={true}
                        />
                    </div>
                    <div className="login">
                         <FormControl sx={{ mt: 2, width: '100%',
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'var(--secondary)',},
                            '& label.Mui-focused': {color: 'var(--secondary)',}, 
                        }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password"
        // error={true}
                            >
                                Password
                            </InputLabel>
                            <Input {...register("password", 
                                { required: true, minLength: 8, maxLength: 20 })}
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                            </FormControl>
                    </div>
                    <div>
                       <Button sx={{
                            mt: 4,
                            backgroundColor: "var(--secondary)",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                        }}
                            type="submit"
                            loading={false} 
                            variant="contained"
                            startIcon={<LoginIcon /> }>
                        Sign in
                        </Button>
                    </div>
                    <div className="register">
                        <span>Don't have an account? </span>
                        <a className="registerLink" href="/register">Register</a> 
                    </div> 
                </form>
            </Card>    
        </div>
    );
}