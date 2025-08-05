'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Card } from '@/app/components/Card/Card';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import { Alert, Button, Switch, TextField } from '@mui/material';

import './resetPassword.css';
import { useForm } from 'react-hook-form';

export const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [messageToUser, setMessageToUser] = useState<string | null>(null);
    const [formKey, setFormKey] = useState(0);
    const router = useRouter();
    const token = useSearchParams().get('token');
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    interface Inputs {
        password: string;
        confirm: string;
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = async (data: Inputs) => {
        const { password, confirm } = data;
        if (password !== confirm) {
            setMessageToUser('Passwords do not match');
            return;
        }
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, password })
            });

            const data = await res.json();

            if (res.ok) {
                setMessageToUser('Password changed. Redirecting to sign in...');
                setTimeout(() => router.push('/auth/signin'), 5000);
            } else if (res.status === 404) {
                setMessageToUser('Invalid or expired password reset link.');
            } else {
                setMessageToUser(data.error || 'An unexpected error occurred. Please try again later.');
            }
        } catch (error) {
            setMessageToUser('An unexpected error occurred. Please try again later.');
        }
    };

    const onAlertClose = () => {
        if (messageToUser?.includes('Success')) {
            router.push('/auth/signin');
        }
        setMessageToUser(null);
        reset({ confirm: '', password: '' });
        setFormKey((prev) => prev + 1); // rerender form to reset state to reset FormControl
    };

    if (!token) return <p className='restricted'>This password reset link is invalid or has expired</p>;
    return (
        <div className='formWrapper'>
            <Card className='loginForm'>
                <h3 className='loginTitle'>Password reset</h3>

                <form
                    key={formKey} // ← добавьте key
                    className='loginFormContent'
                    id='form'
                    onSubmit={handleSubmit(onSubmit)}>
                    <h4>Input new password</h4>
                    <div className='passSwitch'>
                        <span>{showPassword ? 'Hide password' : 'Show password'}</span>
                        <Switch {...label} defaultChecked color='default' onClick={handleClickShowPassword} />
                    </div>

                    <div className='login'>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='password'
                            {...register('password', {
                                required: { value: true, message: 'Password is required' },
                                minLength: { value: 8, message: 'Must be at least 8 characters' },
                                maxLength: { value: 20, message: 'Must be at most 20 characters' }
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
                            label={errors.password ? errors.password.message : 'Password'}
                            variant='standard'
                            error={errors.password ? true : false}
                        />
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='password'
                            {...register('confirm', {
                                required: { value: true, message: 'Confirm is required' },
                                minLength: { value: 8, message: 'Must be at least 8 characters' },
                                maxLength: { value: 20, message: 'Must be at most 20 characters' }
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
                            label={errors.confirm ? errors.confirm.message : 'Confirm password'}
                            variant='standard'
                            error={errors.confirm ? true : false}
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
                            startIcon={<SyncLockIcon />}>
                            {isSubmitting ? 'Confirming...' : 'Confirm password reset'}
                        </Button>
                    </div>
                    <div className='register'>
                        <span>{'Or back to '}</span>
                        <Link className='registerLink' href='/'>
                            Main
                        </Link>
                    </div>
                    {messageToUser && (
                        <Alert
                            severity={messageToUser.includes('Success') ? 'success' : 'error'}
                            sx={{ mt: 2, mb: 2 }}
                            onClose={onAlertClose}>
                            {messageToUser}
                        </Alert>
                    )}
                </form>
            </Card>
        </div>
    );
};
