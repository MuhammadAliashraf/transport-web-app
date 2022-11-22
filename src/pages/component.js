import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MyButton from '../component/button'
import MyDatepicker from '../component/datePicker'
import Mydropdown from '../component/dropdown'
import MyGrid from '../component/grid'
import { MyInput } from '../component/input'
import Myloader from '../component/loader'
import MySwitch from '../component/switch'
import { getDataFromDataBase, sendDataToDataBase } from '../config/firebasemethod'

const TestComponent = () => {
    const [data,setdata]=useState();
    const [getdata,setgetdata]=useState();
    const handleChange = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setdata({ ...data, ...newInput })
    }

    function datasend (){
        sendDataToDataBase(
            data
            , `student/`)
            .then((userID) => {
              alert(userID);
            })
            .catch((error) => {
              alert(error)
            });
        }
        const getStudentData = () => {
            getDataFromDataBase(`student/`)
                .then((res) => {
                    setgetdata(res)
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
        function aswitch(x){
            console.log(x)
        }





    return (
        <div>   
            <MyInput 
            // fullWidth
            required
            id="name"
            label="Enter Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => handleChange(e)}
            />
            <MyInput 
           fullWidth
           required
           id="password"
           label="Enter password"
           name="password"
           autoComplete="password"
           type="password"
           autoFocus
           onChange={(e) => handleChange(e)}
            />
        <br/>
            <MyButton variant="contained"  >Cheak</MyButton>
            {/* Remaining */}
            <Button  onClick={datasend} variant="contained" color="success">
                My Button Is Not Working 
            </Button>
            <MyDatepicker name="Date" label='Date' type="date" onClick={''} />
            <Mydropdown
                label="Select Item"
                onChange={''}
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
            <MyGrid   
                onRowClick={(e)=>console.log(e)}
                datasource={getdata}
                Cols={[
                    {
                        displayName:"UserName",
                        key:"Name"
                    },
                    {
                        displayName:"User Password",
                        key:"password"
                    },
                    {
                        displayName:"User ID",
                        key:"id"
                    },
                ]}    
            />
            <MySwitch  
            label="Show Result"
            onChange={(e)=>aswitch(e)}
            />
            <Myloader/>
        </div>
    )
}

export default TestComponent
