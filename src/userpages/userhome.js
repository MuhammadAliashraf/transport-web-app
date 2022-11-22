import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Userprofile from './availableBooking';
import { getDataFromDataBase, UserCheaking, userlogout } from '../config/firebasemethod';
import { signOut } from 'firebase/auth';
import { CircularProgress, TextField } from '@mui/material';
import Userbooking from './userbooking';
import AvailableBooking from './availableBooking';
import Userdetails from './userdetails';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

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


export default function UserHome() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [profile, setprofile] = React.useState([]);
  const [Abooking, setAbooking] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  // const navigate = useNavigate();
  // console.log(profile);
  // console.log(profile);

  const logout = () => {
    userlogout().
      then((res) => {
        console.log(res)
        navigate("/login")
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getStudentData = () => {
    getDataFromDataBase(`transportInfo/`)
      .then((res) => {
        setAbooking(res)
        console.log(res)
      })
      .catch((error) => {
        alert(error)
      })

  }
  React.useEffect(() => {
    getStudentData();
  }, [])
  React.useEffect(() => {
    UserCheaking()
      .then((result) => {
        getDataFromDataBase('user', result)
          .then((userdata) => {
            setprofile([userdata])
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((error) => {

        console.log(error)
      })
  }, [])
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // Cards Function / Avaibile  Booking 

  return (
    <>
      {loading ? (<Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <CircularProgress />
      </Box>) : <>
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
              {profile.map((e, i) => {
                return (<Box key={i} >
                  <Typography variant="h6" noWrap component="div">
                    {e.firstName}{e.lastName}
                  </Typography>
                </Box>)
              })}

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
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <Link className='Link' to="userdetails" >User Details</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <Link className='Link' to="availableBooking" >Available Booking</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <Link className='Link' to="userbooking" >Booked Slot</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton  >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon  >
                <Link className='Link' onClick={logout}>user logout</Link>
              </ListItemButton>
            </ListItem>
            <Divider />
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            {/* Booking Ahve  */}
            
            {/* perform nasted Rounting in below code */}
            <Routes>
              <Route path='availableBooking' element={<AvailableBooking />} />
              <Route path="userbooking" element={<Userbooking/>}/>
              <Route path="userdetails" element={<Userdetails/>}/>
            </Routes>
          </Main>
        </Box>
      </>
      }
    </>
  );
}
