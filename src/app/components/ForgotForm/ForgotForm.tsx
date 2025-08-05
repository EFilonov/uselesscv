'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Card } from '@/app/components/Card/Card';
import OutgoingMailIcon from '@mui/icons-material/OutgoingMail';
import { Alert, Button, TextField } from '@mui/material';

import './ForgotForm.css';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useForm } from 'react-hook-form';

export const ForgotForm = () => {
    const [formKey, setFormKey] = useState<number>(0);
    const [status, setStatus] = useState<string>('');
    const { executeRecaptcha } = useReCaptcha();
    const router = useRouter();

    interface Inputs {
        email: string;
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>();

    const onSubmit = async ({ email }: Inputs) => {
        const token = await executeRecaptcha('form_submit');
        if (!token) {
            setStatus('Please confirm you are not a robot.');
            return;
        }

        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token })
        });

        if (res.ok) {
            setStatus('Reset email sent successfully. Please check your inbox.');
        } else if (res.status === 404) {
            setStatus('User with this email was not found.');
        } else {
            const { error } = await res.json();
            setStatus(`Error: ${error}`);
        }
    };

    const onAlertClose = () => {
        if (status !== 'User with this email was not found.') {
            router.push('/auth/signin');
        }
        setStatus('');
        reset({ email: '' });
        setFormKey((prev) => prev + 1);
    };

    return (
        <div className='formWrapper'>
            <Card className='loginForm'>
                <h3 className='loginTitle'>Reset password</h3>

                <form
                    key={formKey} // add key
                    className='loginFormContent'
                    id='form'
                    onSubmit={handleSubmit(onSubmit)}>
                    <h4>Enter your email below</h4>
                    <div className='login'>
                        <TextField
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
                            startIcon={<OutgoingMailIcon />}>
                            {isSubmitting ? 'Sending' : 'Reset password'}
                        </Button>
                    </div>
                    <div className='register'>
                        <span>{'Back to main '}</span>
                        <Link className='registerLink' href='/'>
                            Click here
                        </Link>
                    </div>
                    {status && (
                        <Alert
                            severity={status.includes('Reset email') ? 'success' : 'error'}
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
