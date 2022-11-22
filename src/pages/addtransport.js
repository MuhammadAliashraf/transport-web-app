import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import MyDatepicker from '../component/datePicker';
import Mydropdown from '../component/dropdown';
import MyGrid from '../component/grid';
import { getDataFromDataBase, sendDataToDataBase } from '../config/firebasemethod';

function Addtransport() {
    const [data, setdata] = useState("");
    const [databack,setdataback]=useState([])
    const [loader, setloader] = useState(false);
    const handleChange = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setdata({ ...data, ...newInput })
    }
    const SendBusData = () => {
        setloader(true)
        sendDataToDataBase(data, `Bus/`)
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
    const getStudentData = () => {
        getDataFromDataBase(`Bus/`)
            .then((res) => {
                setdataback(res)
                console.log(res)
            })
            .catch((error) => {
                alert(error)
            })

    }
    useEffect(() => {
        getStudentData();
        // getCourseData();
    }, [])


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
                    <Typography variant='h4' align='center'>Add New Transport!</Typography>
                    <Box align='center'>
                        <Grid container justifyContent='center' spacing={2}>
                            <Grid item mt={5}  md={4} xs={10} >
                                <TextField
                                    fullWidth required name="busName" onChange={(e) => handleChange(e)} label="Enter Bus Name" />
                            </Grid>
                            <Grid item mt={5}  md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="routes" onChange={(e) => handleChange(e)} label="Enter Routes " />
                            </Grid>
                            <Grid item mt={5}  md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="time" onChange={(e) => handleChange(e)} label="Time" />
                            </Grid>
                            <Grid item mt={5}  md={4} xs={10}  >
                            <MyDatepicker
                                name='date'
                                label='Date Of Birth'
                                type='date'
                                onChange={(e) => handleChange(e)}
                            />
                            </Grid>
                            <Grid item mt={5}  md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="seats" onChange={(e) => handleChange(e)} label="No Of Seats" />
                            </Grid>
                            <Grid item mt={5}  md={4} xs={10}  >
                                <TextField
                                    fullWidth required name="price" onChange={(e) => handleChange(e)} label="Prices Per Seats" />
                            </Grid>
                            <Box mt={2} display="flex" justifyContent="center">
                                <Button   mt={5} md={6} align='center' disabled={loader} onClick={SendBusData} variant='contained'>{loader ? <CircularProgress /> : "Add Bus"}</Button>
                            </Box>
                        </Grid>
                    </Box>

                    <MyGrid
                    datasource={databack}
                    Cols={[
                        {
                            displayName:"Bus Name",
                            key: "busName"
                        },
                        {
                            displayName:"Bus Routes",
                            key: "routes"
                        },
                        {
                            displayName:"Avablie Seats",
                            key: "seats"
                        },
                        {
                            displayName:"Travel Time",
                            key: "time"
                        },
                    ]}
                    />
                </>
            }
        </div>
        // <div>
        //     <Grid container justifyContent='center' spacing={0} >
        //     <Grid item mt={5} xs={8}  >
        //             <TextField
        //                 fullWidth
        //                 required
        //                 id="busName"
        //                 label="Enter Bus Name "
        //                 name="busName"
        //                 autoComplete="busName"
        //                 autoFocus
        //                 onChange={(e) => handleChange(e)}
        //             />
        //         </Grid>
        //         <Grid item md={4} mt={5} xs={6}  >
        //             <Mydropdown
        //                 label='Course'
        //                 labelId='Course-label'
        //                 onChange={(e) => handleChange(e)}
        //                 name='Course'
        //                 // nodeName='Coursedetails'
        //                 // displayValue='CourseName'
        //                 // fieldValue='CourseName'
        //                 dataSource={[
        //                     {
        //                         option: "Saddar to KU"
        //                     },
        //                     {
        //                         option: "Gulshan to Smiu"
        //                     },
        //                     {
        //                         option: "sadder to Malir"
        //                     },
        //                     {
        //                         option: "KU To Nipa"
        //                     },
        //                     {
        //                         option: "Regal To Nagin "
        //                     },
        //                 ]}
        //             />
        //         </Grid>
        //         <Grid item md={4} mt={5} xs={6}  >
        //             <TextField
        //                 fullWidth
        //                 required
        //                 id="noofseats"
        //                 label="Enter Number Of Seats"
        //                 name="noofseats"
        //                 autoComplete="noofseats"
        //                 autoFocus
        //                 onChange={(e) => handleChange(e)}
        //             />
        //         </Grid>
        //     </Grid>
        // </div>
    )
}

export default Addtransport
