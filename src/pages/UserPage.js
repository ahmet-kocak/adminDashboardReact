import React from 'react';
import { faker } from '@faker-js/faker';
import { styled } from '@mui/material/styles';
import Page from '../components/Page';
import {AppNewsUpdate} from '../sections/@dashboard/app';
import { Link as RouterLink,useNavigate} from 'react-router-dom';
import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider,Link,Container,Grid, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import MenuPopover from '../components/MenuPopover';

// ----------------------------------------------------------------------


const TitleStyle = styled(Link)({height:44,overflow:'hidden',WebkitLineClamp:2,display:'-webkit-box',WebkitBoxOrient:'vertical'});
const CoverImgStyle = styled('img')({width: '100%',height: '100%',borderRadius:"20px 20px 0 0",objectFit: 'cover'});
const MENU_OPTIONS = [
    {label: 'Profile',icon: 'eva:person-fill',linkTo: '#',},
    {label: 'Settings',icon: 'eva:settings-2-fill',linkTo: '#',},
];

export default function UserPage() {
const anchorRef = useRef(null);
const navigate=useNavigate();
const [open, setOpen] = useState(null);
const handleOpen = (event) => {setOpen(event.currentTarget);};
const handleClose = () => {setOpen(null);};
const local=JSON.parse(localStorage.getItem ('jwtToken'));

  return (
<Page title="user">
    <div style={{float:"right",marginRight:"50px"}}>
        <IconButton
            ref={anchorRef} onClick={handleOpen}
            sx={{p: 0,...(open && {
                '&:before': {zIndex:1,content:"''",width:'100%',height:'100%',borderRadius:'50%',position:'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8)}}),}}>
            <Avatar src={`/static/mock-images/avatars/avatar_3.jpg`} alt="photoURL" />
        </IconButton>
        <MenuPopover
            open={Boolean(open)} anchorEl={open} onClose={handleClose}
            sx={{p: 0,mt: 1.5,ml: 0.75,'& .MuiMenuItem-root': {typography: 'body2',borderRadius: 0.75,},}}>
            <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>{local.firstName}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>{local.email}</Typography></Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack sx={{ p: 1 }}>{MENU_OPTIONS.map((option) => (
                <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                {option.label}</MenuItem>))}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem onClick={()=>{navigate('/');localStorage.removeItem("jwtToken");localStorage.removeItem("cdtl");
            window.location.reload()}} sx={{ m: 1 }}>Logout
            </MenuItem>
        </MenuPopover>
    </div>

    <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 ,mt:10}}>Hi {local.firstName} , Welcome back</Typography>
        <Grid container spacing={3}>
            <Grid item xs={4} md={3} lg={3} >
            <div>
            <CoverImgStyle alt={local.firstName} src={`/static/mock-images/avatars/avatar_3.jpg`} /> 
            <div style={{fontWeight:"bolder",fontSize:"14px",marginTop:"14px",paddingLeft:"15px",paddingBottom:"8px"}}>
            {local.email}</div>
            </div>
            </Grid> 

            <Grid item xs={12} md={9} lg={9}>
                <AppNewsUpdate
                title="My Company" list={local.company&&local.company.map((item,i) => ({id: faker.datatype.uuid(),
                title:
                    <TitleStyle to="/user/usercompanydetail"  underline="hover" component={RouterLink}
                    sx={{...({ typography: 'h6', height: 30, textDecoration: 'underline'  }),...({color: 'common.black'})}}
                    onClick={()=>{localStorage.setItem("cdtl",JSON.stringify({item,i}))}}>{item}
                    </TitleStyle>,
                image: `/static/mock-images/covers/cover_${i+1}.jpg`,postedAt: faker.date.recent(),}))}/> 
            </Grid>
        </Grid>
    </Container>
</Page>
);
}

