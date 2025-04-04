import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { AuthContext } from '../contexts/AuthContext';
export const AppHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log("isLoggedIn:", isLoggedIn);

  const menuItems = [
    { text: '진로', path: '/career' },
    { text: '면접', path: '/interview' },
    { text: '관심분야', path: '/interests' },
    { text: '상담기록', path: '/history' },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} component="button" onClick={() => navigate(item.path)}>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      {isLoggedIn ? (
        <ListItem component="button" onClick={logout}>
          <ListItemText primary="로그아웃" />
        </ListItem>
      ) : (
        <>
          <ListItem component="button" onClick={() => navigate('/login')}>
            <ListItemText primary="로그인" />
          </ListItem>
          <ListItem component="button" onClick={() => navigate('/signup')}>
            <ListItemText primary="회원가입" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <AppBar position="static" color="inherit" elevation={1} sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          via.com
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {menuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <IconButton color="inherit" onClick={() => navigate('/mypage')}>
                  <AccountCircleIcon />
                </IconButton>
                <Button color="inherit" onClick={logout}>로그아웃</Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                >
                  로그인
                </Button>
                <Button
  variant="contained"
  className="signup-btn"
  onClick={() => navigate('/signup')}
>
  회원가입
</Button>

              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;