'use client';

import * as React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import GoogleIcon from '@mui/icons-material/Google';
import Logout from '@mui/icons-material/Logout';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import { UserMenuProps } from './UserMenu.props.interface';
import { signIn, signOut, useSession } from 'next-auth/react';

export const UserMenu: React.FC<UserMenuProps> = ({ handleDownload, handlePrint }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const router = useRouter();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onPrint = () => {
        handlePrint();
        handleClose();
    };
    const onDownload = () => {
        handleDownload();
        handleClose();
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
        handleClose();
    };
    const handleLogin = () => {
        signIn();
        handleClose();
    };
    const handleProfile = () => {
        router.push('/profile');
        handleClose();
    };

    const session = useSession();

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip
                    title={
                        session.status === 'authenticated'
                            ? `Signed in as ${session.data?.user?.email}`
                            : 'Sign in to get more features'
                    }>
                    <IconButton
                        onClick={handleClick}
                        size='small'
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}>
                        {session.status === 'loading' ? (
                            <Avatar sx={{ width: 32, height: 32 }} />
                        ) : session.status === 'authenticated' && session.data?.user?.image ? (
                            <Image
                                src={session.data.user.image}
                                width={32}
                                height={32}
                                style={{ borderRadius: '50%' }}
                                alt={`Logo ${session.data.user.name}`}
                            />
                        ) : (
                            <Avatar sx={{ width: 32, height: 32 }}>{session.data?.user?.name?.charAt(0) || 'U'}</Avatar>
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                disableScrollLock
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0
                            }
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                {session.status === 'authenticated' && (
                    <MenuItem onClick={onDownload}>
                        <PictureAsPdfIcon sx={{ paddingRight: '10px' }} /> Save to PDF
                    </MenuItem>
                )}
                {session.status === 'authenticated' && (
                    <MenuItem onClick={onPrint}>
                        <PrintIcon sx={{ paddingRight: '10px' }} /> Print
                    </MenuItem>
                )}
                {session.status === 'authenticated' && <Divider />}
                {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Another account
        </MenuItem> */}
                <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Profile
                </MenuItem>

                {session.status === 'authenticated' ? (
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize='small' />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                ) : (
                    <MenuItem onClick={handleLogin}>
                        <ListItemIcon>
                            <GoogleIcon fontSize='small' />
                        </ListItemIcon>
                        Login
                    </MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
};
