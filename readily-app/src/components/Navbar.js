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
import { Link, ToggleButtonGroup } from '@mui/material';
import Image from 'next/image';
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useSession, signOut, signIn } from "next-auth/react";

const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: selectedColor,
  },
}));


const pages = [['', ""]]

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  function renderAccountSettings() {
    const {data: session} = useSession()

    if (!session) {
      return (
        <Button href="#" onClick={()=>signIn({callbackUrl:"/"})} sx={{color: "white"}}>Log in</Button>
      )
    }
    if(session){
      return(
        <Button href="#" onClick={()=>signOut({callbackUrl:"/"})} sx={{color: "white"}}>Sign Out</Button>
      )
    }
    return(
      <Box sx={{ml:'auto'}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar/>
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
                  <Link href="/profile" sx={{textDecoration:"none", color:"inherit"}}>
                    <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <Link href="/saved-articles" sx={{textDecoration:"none", color:"inherit"}}>
                    <MenuItem key={"saved-articles"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Saved articles</Typography>
                    </MenuItem>
                  </Link>
                  <Link href="/signout" sx={{textDecoration:"none", color:"inherit"}}>
                  <MenuItem key={"Sign out"} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
                  </Link>
              </Menu>
            </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      
    <AppBar className="navbar" sx={{"bgcolor": "#152b4f"}} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Toolbar sx={{
            display: { xs: 'none', md: 'flex' }, 
            mt: 1,  
          }} >
            <Link href="/"><Image alt="logo" src="/logo-inverted.png" width={60} height={60}/></Link>
          </Toolbar>

          <Box sx={{ flexGrow: 0.5, display: { xs: 'flex', md: 'none' } }}>
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
            <Menu
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
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link href={page[1]}>{page[0]}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Toolbar sx={{
              display: { xs: 'flex', md: 'none' }, mt:1,  
            }}>
            <Link href="/"><Image alt="logo" src="/logo-inverted.png" width={60} height={60}/></Link>
          </Toolbar>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                href={page[1]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          {renderAccountSettings()}
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}


export default Navbar;