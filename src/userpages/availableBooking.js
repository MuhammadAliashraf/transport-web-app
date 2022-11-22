import { Box, Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { getDataFromDataBase, UserCheaking } from '../config/firebasemethod';
function AvailableBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const [Abooking, setAbooking] = React.useState([]);
    // User Profile Data 
    const [profile, setprofile] = useState();
    const [loader, setloader] = useState(false);
    // console.log(profile);
    // console.log(profile.firstName);

    useEffect(() => {
        UserCheaking()
            .then((result) => {
                // console.log(result)
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

    const getStudentData = () => {
        setloader(true)
        getDataFromDataBase(`transportInfo/`)
            .then((res) => {
                setAbooking(res)
                setloader(false)
                console.log(res)
            })
            .catch((error) => {
                setloader(false)
                alert(error)
            })
    }
    useEffect(() => {
        getStudentData();
    }, [])
    return (
        <div>
            {loader ? (<Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <CircularProgress />
            </Box>) :
                    <Grid container spacing={2}  >
                <>{
                    Abooking.map((e, i) => {
                        return (
                                <Grid item   >
                                        <Card sx={{ maxWidth: 345 }}  >
                                            <CardActionArea>
                                                {/* images of bus  */}
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Available Booking
                                                    </Typography>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {e.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Medium{e.type}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Price:{e.price}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Seats:{e.seats}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Booking
                                                </Button>
                                            </CardActions>
                                        </Card>
                                </Grid>
                        );
                    })
                }
                </>
                </Grid>
            }
        </div>
    )
}

export default AvailableBooking;
