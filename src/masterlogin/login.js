import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginuser } from '../config/firebasemethod';
import Signup from './signup';
import Transpotersignup from '../transporter/transpotersignup';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Muhammad ALi
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();
export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    // fields data push
    const [email, setemail] = useState({});
    const [password, setpassword] = useState({});
    const [iscat, setiscat] = useState();
    const [loader, setloader] = useState(false);
    const [data, setdata] = useState();

    const handleSubmit = () => {
        setloader(true)
        loginuser({ email, password })
            .then((success,) => {
                setloader(false)
                console.log(success)
                if (success.iscat == "user") {
                    navigate('/userhome')
                    setdata(success)
                    console.log(success.firstName);
                }
                else if (success.iscat == "transpoter") {
                    navigate('/transpoter')
                    setdata(success)
                    // console.log(success.firstName);
                }
                 else if (success.iscat == "admin"){
                    navigate('/dashboard',{
                        state:success
                    })
                    console.log(success.firstName);
                }
            })
            .catch((error) => {
                setloader(false)
                console.log(error)
            })
    }

    return (
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Welcome To New Era
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={handleSubmit}
                            type="button"
                            fullWidth
                            disabled={loader}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loader ? <CircularProgress /> : "login"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/transpotersignup" variant="body2">
                                    Become A Transpoter
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                   Register member
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
                <Routes>
                    <Route path='signup' element={<Signup/>}/>
                    <Route path='transpotersignup' element={<Transpotersignup/>}/>
                </Routes>
        </ThemeProvider>
                </>
    );
}