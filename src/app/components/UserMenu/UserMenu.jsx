'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import GoogleIcon from '@mui/icons-material/Google';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export const  UserMenu = ({handleDownload, handlePrint}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onPrint = () => {
    handlePrint();
    handleClose();
  }
  const onDownload = () => {
    handleDownload();
    handleClose();
  }

  const handleLogout = () => {
    signOut();
    handleClose();
  }
  const handleLogin = () => {
    signIn();
    handleClose();
  }

  const session = useSession()
  
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="User Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            { 
              (session.status === 'loading') ? 
                <Avatar sx={{ width: 32, height: 32 }}/>
                  :
              (session.status === 'authenticated') ?
                <Avatar sx={{ width: 32, height: 32 }} src={session.data?.user?.image}/> 
                  :
                <Avatar sx={{ width: 32, height: 32 }}/>
            }
          </IconButton>
          
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow:"visible",
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
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
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onDownload}>
          <PictureAsPdfIcon sx={{paddingRight :'10px'}}/>  Save to PDF
        </MenuItem>
        <MenuItem onClick={onPrint}>
          <PrintIcon sx={{paddingRight :'10px'}}/> Print
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        {session.status === 'authenticated' ? 
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
          Logout
          </MenuItem>
      : 
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <GoogleIcon fontSize="small" />
            </ListItemIcon>
          Login
          </MenuItem>
        }
      </Menu>
    </React.Fragment>
  );
}