import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Header from '../components/header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction'

import { Link } from 'react-router-dom';
import Posts from '../components/homePost/Posts';
import Servicios from '../components/homeServicio/Servicios';
const drawerWidth = 240;

const AppBarProps = {
  open: undefined,
};

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Home = () => {
  const { homePostsReducer, auth, homeServiciosReducer } = useSelector((state) => state);
  const dispatch = useDispatch()

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>


        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>


          <Header />

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
 

        {auth.user ? (
          <List>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/pages/categoriaslista/cervices">
                <ListItemText primary="Ajouter Annonce" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/salasfiestas">
                <ListItemText primary="Samme de faite" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/cervicios">
                <ListItemText primary="services" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/profile/${auth.user._id}`}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => logout()}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText onClick={() => dispatch(logout())} primary="Se déconnecter" />
              </ListItemButton>
            </ListItem>

            
            {auth.user.role === "admin" && (

              <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/administracion/postspendientes">
                    <ListItemText primary="Administration" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/pages/categoriaslista/cervices">
                    <ListItemText primary="Ajouter Annonce" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/administracion/postspendientes">
                    <ListItemText primary="Aprouve salle fetes" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/administracion/serviciospendientes">
                    <ListItemText primary="Aprouve services" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/users/usersposts">
                    <ListItemText primary="Liste Utilizateurs" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/roles/userrole">
                    <ListItemText primary="Lite Roles" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/bloqueos/blockposts">
                    <ListItemText primary="Block post" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/bloqueos/blockcomments">
                    <ListItemText primary="Block comment" />
                  </ListItemButton>
                </ListItem>

              </List>
            )}
          </List>
        ) : (
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Connecter" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemText primary="Registre" />
              </ListItemButton>
            </ListItem>
          </List>
        )}

      </Drawer>
      <Main open={open}>

        {homePostsReducer.result === 0 && (!homePostsReducer.posts?.length || homePostsReducer.posts.length === 0) ? (
          <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
        ) : (
          <Posts />
        )}



        <hr></hr>
        <hr></hr>

        {homeServiciosReducer.result === 0 && (!homeServiciosReducer.servicios?.length || homeServiciosReducer.servicios.length === 0) ? (
          <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
        ) : (
          <Servicios />
        )}

      </Main>
    </Box>
  );
};

export default Home;
