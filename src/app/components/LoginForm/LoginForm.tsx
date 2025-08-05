'use client';

import React, { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Card } from '@/app/components/Card/Card';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import {
    Alert,
    Button,
    Divider,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from '@mui/material';

import './LoginForm.css';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [userError, setUserError] = useState<string | null>(null);
    const [formKey, setFormKey] = useState(0);
    const router = useRouter();
    // const passwordRef = useRef<HTMLInputElement>(null);

    interface Inputs {
        email: string;
        password: string;
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (data: Inputs) => {
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false // не перенаправлять автоматически
            });

            if (result?.error) {
                console.warn('Login error:', result.error);
                setUserError(result.error === 'CredentialsSignin' ? 'Invalid email or password' : null); // Установить ошибку для отображения
            } else {
                router.push('/');
            }
        } catch (error) {
            setUserError('An unexpected error occurred. Please try again later.');
        }
    };

    const onSignGoogle = async () => {
        try {
            setIsGoogleLoading(true);
            await signIn('google');
        } catch (error) {
            console.warn('Google sign-in error:', error);
            setUserError('Failed to sign in with Google. Please try again later.');
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const onSubmitGithub = async () => {
        try {
            setIsGithubLoading(true);
            await signIn('github');
        } catch (error) {
            console.warn('GitHub sign-in error:', error);
            setUserError('Failed to sign in with GitHub. Please try again later.');
        } finally {
            setIsGithubLoading(false);
        }
    };

    const onAlertClose = () => {
        setUserError(null);
        reset({ email: '', password: '' });
        setTimeout(() => {
            // passwordRef.current?.blur();
        }, 0);
        setFormKey((prev) => prev + 1); // rerender form to reset state to reset FormControl
    };
    return (
        <div className='formWrapper'>
            <Card className='loginForm'>
                <h3 className='loginTitle'>Login to your account</h3>

                <form
                    key={formKey} // ← добавьте key
                    className='loginFormContent'
                    id='form'
                    onSubmit={handleSubmit(onSubmit)}>
                    <Button
                        onClick={() => onSignGoogle()}
                        loading={isGoogleLoading}
                        disabled={isGoogleLoading}
                        sx={{
                            mt: 2,
                            backgroundColor: 'var(--secondary)',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            width: '100%'
                        }}
                        variant='contained'
                        startIcon={<GoogleIcon />}>
                        {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
                    </Button>
                    <Button
                        onClick={() => onSubmitGithub()}
                        loading={isGithubLoading}
                        disabled={isGithubLoading}
                        sx={{
                            mt: 2,
                            backgroundColor: 'var(--secondary)',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            width: '100%'
                        }}
                        variant='contained'
                        startIcon={<GitHubIcon />}>
                        {isGithubLoading ? 'Signing in...' : 'Sign in with GitHub'}
                    </Button>
                    <Divider sx={{ mt: 4 }}>or</Divider>
                    <h4>Enter your email and password below</h4>
                    <div className='forgotPassword'>
                        <a className='forgotLink' href='/auth/forgot-password'>
                            Forgot your password?
                        </a>
                    </div>
                    <div className='login'>
                        <TextField
                            // focused={isInputFocused}
                            // onFocus={() => setIsInputFocused(true)}
                            autoComplete='email'
                            {...register('email', {
                                required: { value: true, message: 'Email is required' },
                                pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Input valid email' }
                            })}
                            sx={{
                                m: 0,
                                width: '100%',
                                background: 'transparent',
                                backgroundColor: 'transparent',
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'var(--secondary)'
                                },
                                '& label.Mui-focused': { color: 'var(--secondary)' }
                            }}
                            id='standard-basic'
                            label={errors.email ? errors.email.message : 'Email'}
                            variant='standard'
                            error={errors.email ? true : false}
                        />
                    </div>
                    <div className='login'>
                        <FormControl
                            sx={{
                                mt: 2,
                                width: '100%',
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'var(--secondary)'
                                },
                                '& label.Mui-focused': { color: 'var(--secondary)' }
                            }}
                            variant='standard'>
                            <InputLabel htmlFor='standard-adornment-password' error={errors.password ? true : false}>
                                {errors.password ? errors.password.message : 'Password'}
                            </InputLabel>
                            <Input
                                // inputRef={passwordRef}
                                autoComplete='current-password'
                                {...register('password', {
                                    required: { value: true, message: 'Password is required' },
                                    minLength: { value: 8, message: 'Must be at least 8 characters' },
                                    maxLength: { value: 20, message: 'Too long' }
                                })}
                                id='standard-adornment-password'
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div>
                        <Button
                            sx={{
                                mt: 4,
                                backgroundColor: 'var(--secondary)',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                width: '100%'
                            }}
                            type='submit'
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            variant='contained'
                            startIcon={<LoginIcon />}>
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                    <div className='register'>
                        <span>{"Don't have an account?  "}</span>
                        <a className='registerLink' href='/auth/register'>
                            Register
                        </a>
                    </div>
                    {userError && (
                        <Alert severity='error' sx={{ mt: 2, mb: 2 }} onClose={onAlertClose}>
                            {userError}
                        </Alert>
                    )}
                </form>
            </Card>
        </div>
    );
};
