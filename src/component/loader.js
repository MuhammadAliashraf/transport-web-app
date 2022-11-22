import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function Myloader() {
  const [loading,  setloading]=useState(true)

  return (
    <div>
      <CircularProgress/>
    </div>
  )
}

export default Myloader
