'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@mui/material';

import { BackButtonProps } from './BackButton.props';

export const BackButton: React.FC<BackButtonProps> = ({ caption, icon }: BackButtonProps) => {
    const router = useRouter();
    return (
        <Button
            sx={{
                mt: 2,
                backgroundColor: 'var(--secondary)',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                width: '100%'
            }}
            type='submit'
            variant='contained'
            startIcon={icon}
            onClick={() => router.push('/')}>
            {caption}
        </Button>
    );
};
