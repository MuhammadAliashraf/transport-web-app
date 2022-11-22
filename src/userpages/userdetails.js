import { Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import MyGrid from '../component/grid';
import { getDataFromDataBase, UserCheaking } from '../config/firebasemethod';

function Userdetails() {
    const [loader, setloader] = useState(false);
    const [profile, setprofile] = React.useState([]);
    const [userbooking, setuserbooking] = useState([]);
    // console.log(profile)
    // console.log(userbooking)
    React.useEffect(() => {
        setloader(true)
        UserCheaking()
            .then((result) => {
                getDataFromDataBase('user', result)
                    .then((userdata) => {
                        setprofile([userdata])
                        setloader(false)
                    })
                    .catch((err) => {
                        setloader(false)
                        console.log(err)
                    })
            })
            .catch((error) => {
                setloader(false)
                console.log(error)
            })
    }, [])
    // booking Details Here:
    const getbookingdata = () => {
        setloader(true)
        getDataFromDataBase(`bookingdetails/`)
            .then((res) => {
                setuserbooking(res)
                setloader(false)
                console.log(res)
            })
            .catch((error) => {
                setloader(false)
                alert(error)
            })
    }
    useEffect(() => {
        getbookingdata();
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
                        profile.map((e, i) => {
                            return (
                                <Grid item key={i}  >
                                    <Card sx={{ maxWidth: 345 }}  >
                                        <CardActionArea>
                                            {/* images of bus  */}
                                            <CardContent>
                                                <Typography gutterBottom variant="h3" component="div">
                                                    User Profile
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    Name {e.firstName}{e.lastName}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    Total Booking {userbooking.length}
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
            <MyGrid 
            datasource={userbooking}
            Cols={[
                {
                    displayName:"Date",
                    key:"date"
                },
                {
                    displayName:"Place",
                    key:"routefrom"
                },
                {
                    displayName:"Destination",
                    key:"routeto"
                },
                {
                    displayName:"Travel Time",
                    key:"time"
                },
                {
                    displayName:"Medium",
                    key:"type"
                },
            ]}
            
            
            />
            
        </div>

    )
}

export default Userdetails
