import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MyDatepicker from '../component/datePicker'
import Mydropdown from '../component/dropdown';
import MyGrid from '../component/grid'
import { sendDataToDataBase } from '../config/firebasemethod';

function Userbooking() {
    const [bookingdetails, setbookingdetails] = useState("");
    // const [databack, setdataback] = useState([])
    const [loader, setloader] = useState(false);
    const handleChange = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setbookingdetails({ ...bookingdetails, ...newInput })
    }
    const sendbookingdetails = () => {
        setloader(true)
        sendDataToDataBase(bookingdetails, `bookingdetails/`)
            .then((resolve) => {
                // navigate('adminpanelcourselist') 
                console.log(resolve)
                setloader(false)
                setbookingdetails("")
                alert(" Booking Searching!")
            })
            .catch((error) => {
                console.log(error)
                setloader(false)
            });
    }
    return (
        <div>
            {loader ?
                (<Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <CircularProgress />
                </Box>) : <>
                    <Typography variant='h4' align='center'>New Booking</Typography>
                    <Box align='center'>
                        <Grid container justifyContent='center' spacing={2}>
                            <Grid item mt={5} md={4} xs={10} >
                                <Mydropdown
                                    label='Vehicle'
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
                            <Grid item mt={5} md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="routefrom" onChange={(e) => handleChange(e)} label="Route From " />
                            </Grid>
                            <Grid item mt={5} md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="routeto" onChange={(e) => handleChange(e)} label="Route to " />
                            </Grid>
                            <Grid item mt={5} md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="time" onChange={(e) => handleChange(e)} label="Time" />
                            </Grid>
                            <Grid item mt={5} md={4} xs={10}  >
                                <MyDatepicker
                                    name='date'
                                    label='Date Of Birth'
                                    type='date'
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            {/* <Grid item mt={5} md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="seats" onChange={(e) => handleChange(e)} label="No Of Seats" />
                            </Grid>
                            <Grid item mt={5} md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="price" onChange={(e) => handleChange(e)} label="Prices Per Seats" />
                            </Grid> */}
                        </Grid>
                            <Box mt={10} display="flex" justifyContent="center">
                                <Button mt={5} md={6} align='center' disabled={loader} onClick={sendbookingdetails} variant='contained'>{loader ? <CircularProgress /> : "Searchig"}</Button>
                            </Box>
                    </Box>
                    {/* <MyGrid
                        datasource={databack}
                        Cols={[
                            {
                                displayName: "Bus Name",
                                key: "busName"
                            },
                            {
                                displayName: "Bus Routes",
                                key: "routes"
                            },
                            {
                                displayName: "Avablie Seats",
                                key: "seats"
                            },
                            {
                                displayName: "Travel Time",
                                key: "time"
                            },
                        ]}
                    /> */}
                </>
            }
        </div>
    )
}

export default Userbooking
