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
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { getDataFromDataBase, sendDataToDataBase, UserCheaking, userlogout } from '../config/firebasemethod';
import { signOut } from 'firebase/auth';
import { CircularProgress, TextField } from '@mui/material';
import MyDatepicker from '../component/datePicker';
import Mydropdown from '../component/dropdown';
import MyGrid from '../component/grid';
import Approvedbooking from './approvedbooking';

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





export default function Transpoter() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [profile, setprofile] = React.useState([]);
    const [Abooking, setAbooking] = React.useState([]);
    const [loader, setloader] = React.useState(false);
    // const navigate = useNavigate();
    // console.log(profile);
    // console.log(profile);
    const [data, setdata] = React.useState("");
    const handleChange = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setdata({ ...data, ...newInput })
    }
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
    const SendBusData = () => {
        setloader(true)
        sendDataToDataBase(data, `transportInfo/`)
            .then((resolve) => {
                // navigate('adminpanelcourselist') 
                console.log(resolve)
                setloader(false)
                setdata("")
                alert("Route Added!")
            })
            .catch((error) => {
                console.log(error)
                setloader(false)
            });
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
            {loader ? (<Box sx={{
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
                                <Link className='Link' to="" >Add Transport</Link>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <Link className='Link' to="approvedbooking" >Approved Booking </Link>
                            </ListItemButton>
                        </ListItem>
                    </Drawer>
                    <Main open={open}>
                        <DrawerHeader />
                        {/* Register Vehicels  */}
                        <Typography variant='h4' align='center'>Add New Transport!</Typography>
                        <Box align='center'>
                            <Grid container justifyContent='center' spacing={1}>
                                <Grid item mt={5} md={6} xs={10} >
                                    <TextField
                                        fullWidth required name="name" onChange={(e) => handleChange(e)} label="Enter Name" />
                                </Grid>
                                <Grid item mt={5} md={6} xs={10}  >
                                    <Mydropdown
                                        label='Type'
                                        labelId='Type-label'
                                        onChange={(e) => handleChange(e)}
                                        name='type'
                                        dataSource={[
                                            {
                                                option: "Bus"
                                            },
                                            {
                                                option: "Car"
                                            },
                                            {
                                                option: "Train"
                                            },
                                            {
                                                option: "Aeroplane"
                                            },
                                        ]}
                                    />
                                </Grid>
                                <Grid item mt={5} md={6} xs={10}  >
                                    <TextField
                                        fullWidth required name="routes" onChange={(e) => handleChange(e)} label="Enter Route" />
                                </Grid>
                                <Grid item mt={5} md={6} xs={10}  >
                                    <TextField
                                        fullWidth required name="seats" onChange={(e) => handleChange(e)} label="No Of Seats" />
                                </Grid>
                                <Grid item mt={5} md={6} xs={10}  >
                                    <TextField
                                        fullWidth required name="price" onChange={(e) => handleChange(e)} label=" Ticket Prices" />
                                </Grid>
                            </Grid>
                            <Box mt={10} display="flex" justifyContent="center">
                                <Button mt={5} md={6} align='center' disabled={loader} onClick={SendBusData} variant='contained'>{loader ? <CircularProgress /> : "Add Vechicle"}</Button>
                            </Box>
                        </Box>
                        {/* perform nasted Rounting in below code */}
                        <Routes>
                            <Route path='approvedbooking' element={<Approvedbooking/>} />
                        </Routes>
                    </Main>
                </Box>
            </>
            }
           <MyGrid
                    datasource={Abooking}
                    Cols={[
                        {
                            displayName: "Name",
                            key: "name"
                        },
                        {
                            displayName: "Prices",
                            key: "price"
                        },
                        {
                            displayName: "Type",
                            key: "type"
                        },
                        {
                            displayName: "Seats",
                            key: "seats"
                        },
                    ]}
                />
        </>
    );
}
