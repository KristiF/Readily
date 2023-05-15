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
import { useRouter } from 'next/router';
import {ToggleButton} from '@mui/material';
const pages = [['', ""]]

function Navbar(props) {
  const router = useRouter()
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
  
  function handleCategoriesChange(event, category) {
    if (category)
        props.onCategoriesChange(category);
  }

  function renderCategories(orientation) {
    if (!props.displayCategories)
      return
    return (
        <Container sx={{display:"flex", alignItems:"center", justifyContent:"center", bgColor:"white", mb: 1, }}>
          <ToggleButtonGroup
            orientation={orientation}
            onChange={handleCategoriesChange}
            value={props.currentCategory}
            exclusive>
            {props.displayCategories.map((category) => (
              <ToggleButton 
                size="small"
                value={category}
                key={category}
                sx={{
                  color:"white",
                  
                  '&:hover': {
                    bgcolor: "gray",
                    },  
                  }}
              >
                  {category}
                </ToggleButton>
            ))}
          </ToggleButtonGroup>

        </Container>
    )
  }
  function renderAccountSettings() {
    // const {data: session} = useSession()
    if (!props.user) {
      return (
        <Box sx={{ml:'auto'}}>
          <Button href="#" onClick={()=>router.push("/login")} sx={{color: "white"}}>Log in</Button>
        </Box>
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
                  
                  <MenuItem key={"Sign out"} onClick={()=>props.onLogOut()}>
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
                
              </Menu>
            </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      
    <AppBar sx={{"bgcolor": "#152b4f"}} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Toolbar sx={{
              display: { xs: 'none', md: 'flex' }, 
              mt: 1,  
            }} >
            <Link href="/"><Image alt="logo" src="/images/logo-inverted.png" width={60} height={60}/></Link>
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
              {renderCategories("vertical")}
            </Menu>
          </Box>
          <Toolbar sx={{
              display: { xs: 'flex', md: 'none' }, mt:1,  
            }}>
            <Link href="/"><Image alt="logo" src="/images/logo-inverted.png" width={60} height={60}/></Link>
          </Toolbar>

          {renderAccountSettings()}
        </Toolbar>
        <Toolbar sx={{display:
          props.displayCategories ? {xs: "none", md:"flex"} : "none"}}>
          {renderCategories("horizontal")}
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}


export default Navbar;