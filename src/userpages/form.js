import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Grid, Select, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { getDataFromDataBase, sendDataToDataBase, userSignUp } from "../config/firebasemethod"
import Muidropdown from '../component/dropdown';
import MuiDatepicker from '../component/datePicker';
import { setDate } from '../config/core/date';

function Form() {
    const navigate = useNavigate();
    // full student data 
    const [data, setdata] = useState("");
    const [model, setmodel] = useState([]);
    const [getData, setgetData] = useState([]);
    const [course, setcourse] = useState([]);
    // console.log(getData)
    const { firstName, emergencyContact, dateOfBirth, lastName, cnic, fatherName, fatherCnic, fatherContact, email, contact, courseadd, userID ,password} = data;
    const handleChange = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setdata({ ...data, ...newInput })
    }
    function SendStudendata() {
        data.registerDate = setDate(new Date())
        data.isFeeSubmited = false;
        data.isApproved = false;
        data.isActive = false;
        data.iscat="STD";
        userSignUp(data)
        .then((Done) => {
          navigate('/login')
        })
        .catch((error) => {
          console.log(error) 
        });
    }
    
    // console.log(getData)
    // let sendRegisterDate = () => {
    //     data.registerDate = setDate(new Date())
    //     data.isFeeSubmited = false;
    //     data.isApproved = false;
    //     data.isActive = false;
    //     console.log(model)
    // }
    //    This Course We upload From admin pannel 
    // const getCourseData = () => {
    //     getDataFromDataBase(`Coursedetails/`)
    //         .then((res) => {
    //             setcourse(res.map(e => e.course.CourseName)
    //             )

    //         })
    //         .catch((error) => {
    //             alert(error)
    //         })
    // }
    // const getStudentData = () => {
    //     getDataFromDataBase(`student/`)
    //         .then((res) => {
    //             setgetData(res)
    //             console.log(res)
    //         })
    //         .catch((error) => {
    //             alert(error)
    //         })
    // }
    // useEffect(() => {
    //     getStudentData();
    //     // getCourseData();
    // }, [])
    const gotologin = () => {
        navigate('login/')
    }

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item xs={8}>
                    <Typography variant='h3' textAlign='center' >Registration Form</Typography>
                    <Grid spacing={3} container  >
                        <Grid item md={6}  >
                            <TextField
                                fullWidth
                                required
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6}  >
                            <TextField
                                fullWidth
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6}  >
                            <TextField
                                fullWidth
                                required
                                id="email"
                                label="Email"
                                name="email"
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6}  >
                            <TextField
                                fullWidth
                                required
                                type='password'
                                id="password"
                                label="password"
                                name="password"
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        {/* display values in dropdown Dyanamically */}
                        <Grid item md={6}>
                            <Muidropdown
                                label='Course'
                                labelId='Course-label'
                                onChange={(e) => handleChange(e)}
                                name='Course'
                                nodeName='Coursedetails'
                                displayValue='CourseName'
                                fieldValue='CourseName'
                            />
                        </Grid>
                        <Grid item md={6}  >
                            <Muidropdown
                                label='Section'
                                labelId='Section-label'
                                onChange={(e) => handleChange(e)}
                                name='Section'
                                dataSource={[
                                    {
                                        option: "A"
                                    },
                                    {
                                        option: "B"
                                    },
                                    {
                                        option: "C"
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                required
                                id="contact"
                                label="Contact"
                                name="contact"
                                autoComplete="contact"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={4}  >
                            <TextField
                                fullWidth
                                required
                                id="cnic"
                                label="Cnic"
                                name="cnic"
                                autoComplete="cnic"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <MuiDatepicker
                                name='date'
                                label='Date Of Birth'
                                type='date'
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} >
                            <TextField
                                fullWidth
                                required
                                id="fatherName"
                                label="father Name "
                                name="fatherName"
                                autoComplete="fatherName"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6}  >
                            <TextField
                                fullWidth
                                required
                                id="fatherCnic"
                                label="Father Cnic"
                                name="fatherCnic"
                                autoComplete="fatherCnic"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} >
                            <TextField
                                fullWidth
                                required

                                id="fatherContact"
                                label="Father Contact "
                                name="fatherContact"
                                autoComplete="fatherContact"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={6}  >
                            <TextField
                                fullWidth
                                required

                                id="emergencyContact"
                                label="Emergency Contact "
                                name="emergencyContact"
                                autoComplete="emergencyContact"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <Button variant="contained" onClick={SendStudendata} >Submit Form
                            </Button>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant='p' onClick={gotologin} >Already Have An Account?</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Form
