'use client';

import Skeleton from '@mui/material/Skeleton';

import './skeletonMain.css';

export function SkeletonMain() {
    return (
        <div className='skeletonMain'>
            <Skeleton variant='text' sx={{ fontSize: '3rem', width: '40%' }} />
            <Skeleton variant='text' sx={{ fontSize: '2rem', width: '30%', mt: 2 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 4 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
            <div className='grid'>
                <div className='left'>
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 4 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 4 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                </div>
                <div className='right'>
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 4 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
                </div>
            </div>
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 4 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
        </div>
    );
}
