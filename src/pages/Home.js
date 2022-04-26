import React from 'react'
import logo from '../myLogo.jpg';
import "./pages.css";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint'
import {useNavigate } from 'react-router-dom';


export default function Home() {

const navigate = useNavigate();

return (

<div className="container">
  <img style={{height:"100vh"}} src={logo} alt="Snow" />
 
  <Stack className='btn' direction="row" spacing={1}>
      <IconButton  onClick={() => navigate("/login")} aria-label="fingerprint" color="warning">
        <Fingerprint /> SignIn
      </IconButton>
      <IconButton onClick={() => navigate("/register")} aria-label="fingerprint" color="success">
        <Fingerprint /> SignUp
      </IconButton>
    </Stack>
</div>

   
  )
}
