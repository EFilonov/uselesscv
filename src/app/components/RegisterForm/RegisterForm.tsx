'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Card } from '@/app/components/Card/Card';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Alert, Button, Switch, TextField } from '@mui/material';

import './RegisterForm.css';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
    const [formKey, setFormKey] = useState(0);
    const [status, setStatus] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    interface Inputs {
        name: string;
        email: string;
        password: string;
        confirm: string;
    }

    const {
        reset,
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>();

    const onSubmit = async ({ name, email, password, confirm }: Inputs) => {
        if (password !== confirm) {
            setStatus('Passwords do not match.');
            return;
        }

        const normalizedEmail = email.toLowerCase().trim();

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email: normalizedEmail, password })
        });

        if (res.ok) {
            setStatus('Registration successful. Redirecting to sign in...');
            setTimeout(() => router.push('/auth/signin'), 5000);
        } else if (res.status === 409) {
            setStatus('User with this email already exists.');
        } else {
            const { error } = await res.json();
            setStatus(`Error: ${error}`);
        }
    };

    const onAlertClose = () => {
        if (status.includes('Registration successful')) {
            router.push('/auth/signin');
        }
        setStatus('');
        reset({ name: '', email: '', password: '', confirm: '' });
        setFormKey((prev) => prev + 1);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className='formWrapper'>
            <Card className='loginForm'>
                <h3 className='loginTitle'>Register</h3>
                <form key={formKey} className='loginFormContent' id='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='login'>
                        <TextField
                            autoComplete='name'
                            {...register('name', {
                                required: { value: true, message: 'Name is required' },
                                minLength: { value: 2, message: 'Must be at least 2 characters' },
                                maxLength: { value: 40, message: 'Must be at most 40 characters' }
                            })}
                            sx={{
                                mt: 2,
                                width: '100%',
                                background: 'transparent',
                                backgroundColor: 'transparent',
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'var(--secondary)'
                                },
                                '& label.Mui-focused': { color: 'var(--secondary)' }
                            }}
                            id='name'
                            label={errors.name ? errors.name.message : 'Name'}
                            variant='standard'
                            error={!!errors.name}
                        />
                    </div>
                    <div className='login'>
                        <TextField
                            autoComplete='email'
                            {...register('email', {
                                required: { value: true, message: 'Email is required' },
                                pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Input valid email' }
                            })}
                            sx={{
                                mt: 2,
                                width: '100%',
                                background: 'transparent',
                                backgroundColor: 'transparent',
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'var(--secondary)'
                                },
                                '& label.Mui-focused': { color: 'var(--secondary)' }
                            }}
                            id='email'
                            label={errors.email ? errors.email.message : 'Email'}
                            variant='standard'
                            error={!!errors.email}
                        />
                    </div>
                    <div className='passSwitch'>
                        <span>{showPassword ? 'Hide password' : 'Show password'}</span>
                        <Switch defaultChecked color='default' onClick={handleClickShowPassword} />
                    </div>
                    <div className='login'>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='new-password'
                            {...register('password', {
                                required: { value: true, message: 'Password is required' },
                                minLength: { value: 8, message: 'Must be at least 8 characters' },
                                maxLength: { value: 20, message: 'Must be at most 20 characters' }
                            })}
                            sx={{
                                mb: 2,
                                width: '100%',
                                background: 'transparent',
                                backgroundColor: 'transparent',
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'var(--secondary)'
                                },
                                '& label.Mui-focused': { color: 'var(--secondary)' }
                            }}
                            id='password'
                            label={errors.password ? errors.password.message : 'Password'}
                            variant='standard'
                            error={!!errors.password}
                        />
                    </div>
                    <div className='login'>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='new-password'
                            {...register('confirm', {
                                required: { value: true, message: 'Please confirm your password' }
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
                            id='confirm-password'
                            label={errors.confirm ? errors.confirm.message : 'Confirm password'}
                            variant='standard'
                            error={!!errors.confirm}
                        />
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
                            startIcon={<HowToRegIcon />}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                    <div className='register'>
                        <span>{'Already have an account? '}</span>
                        <a className='registerLink' href='/auth/signin'>
                            Sign in
                        </a>
                    </div>
                    {status && (
                        <Alert
                            severity={status.includes('successful') ? 'success' : 'error'}
                            sx={{ mt: 2, mb: 2 }}
                            onClose={onAlertClose}>
                            {status}
                        </Alert>
                    )}
                </form>
            </Card>
        </div>
    );
};
