import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NavDrawer from './NavDrawer';
import Link from 'next/link';
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import BookIcon from "@material-ui/icons/Book";

// import styles from '../../styles/ResponsiveAppBar.module.css'


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  ////////////////////
  let isAuth:boolean = true
  let pages: any;
    if(isAuth){
          pages = [
            {
                link: "/",
                name: "Home",
                icon: <HomeIcon  />
            },
            {
                link: "/about",
                name: "About",
                icon: <BookIcon  />
            },
            {
              link: "/info",
              name: "Info",
              icon: <BookIcon  />
            },
            {    link: "/confirmation",
                name: "Register",
                // onClick: props.openRegisterDialog,
                icon: <HowToRegIcon  />
            },
            {    link: "/confirmation",
                name: "Выход",
                // onClick: () => dispatch(logout()),
                icon: <ToggleOffIcon />
            }
        ];
    }else{
          pages = [
            {
                link: "/home",
                name: "Home",
                icon: <HomeIcon color="primary" />
            },
            {
                link: "/about",
                name: "about",
                icon: <BookIcon  />
            },
            {
                link: "/ott",
                name: "OT",
                icon: <BookIcon />
            },
            {
                name: "Register",
                // onClick: props.openRegisterDialog,
                icon: <HowToRegIcon />
            },
            {
                name: "Login",
                // onClick: props.openLoginFunction,
                icon: <LockOpenIcon />
            }
        ];
    }
    
  ///////////////////
    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  // const handleCloseDrawer = ()=>{
  //   setIs
  // }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    setState(prev => ({...prev, left: true}))
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  return (
    <>
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          {/* sx={{'& .MuiBox-1t6c9ts':{
          display: 'flex',
          justifyContent:'flex-end'
        }} */}
          <Box sx={{ flexGrow: 1, justifyContent:'flex-end',
              display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href = {page.link}>
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="T" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      <NavDrawer pages={pages} state={state} toggleDrawer={toggleDrawer} />
    </>
  );
};
export default ResponsiveAppBar;