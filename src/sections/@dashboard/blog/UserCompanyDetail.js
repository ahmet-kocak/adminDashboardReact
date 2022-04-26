import React from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import Page from '../../../components/Page';
import {AppOrderTimeline,AppWidgetSummary} from '../app';
import { fetchPost,detailLisanceAdd } from '../../../actions/userAction';
import { posts } from '../../faker';
import { Link as RouterLink,useNavigate} from 'react-router-dom';
import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider,Container,Grid, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------


const CoverImgStyle = styled('img')({width: '100%',height: '100%',borderRadius:"20px 20px 0 0",objectFit: 'cover'});
const MENU_OPTIONS = [
    {label: 'Home',icon: 'eva:person-fill',linkTo: '/user'},
    {label: 'Profile',icon: 'eva:person-fill',linkTo: '#'},
    {label: 'Settings',icon: 'eva:settings-2-fill',linkTo: '#'}
];



function UserCompanyDetail() {

const anchorRef = useRef(null);
const navigate=useNavigate();
const [open, setOpen] = useState(null);
const local=JSON.parse(localStorage.getItem ('jwtToken'))
const handleOpen = (event) => {setOpen(event.currentTarget);};
const handleClose = () => {setOpen(null);};
const companydetail=posts.filter(item=>item.title===JSON.parse(localStorage.getItem("cdtl")).item)[0]

return (
<Page title="UserCompanyDetail">
    <div style={{float:"right",marginRight:"50px"}}>
        <IconButton ref={anchorRef} onClick={handleOpen}
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
                    {option.label}
                </MenuItem>))}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem onClick={()=>{navigate('/');localStorage.removeItem("jwtToken");localStorage.removeItem("cdtl");
                }} sx={{ m: 1 }}>Logout
            </MenuItem>
        </MenuPopover>
    </div>

    <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5,mt:10 }}>Hi {local.firstName}, Welcome back</Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={companydetail.total.a} color="success" icon={'ant-design:android-filled'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={companydetail.total.b} color="info" icon={'ant-design:apple-filled'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={companydetail.total.c} color="warning" icon={'ant-design:windows-filled'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={companydetail.total.d} color="error" icon={'ant-design:bug-filled'} />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <div style={{backgroundColor:"pink",borderRadius:"20px",}}>
                <CoverImgStyle alt={companydetail.title} src={`/static/mock-images/covers/cover_${JSON.parse(localStorage.getItem("cdtl")).i+1}.jpg`} />
                <div style={{color:"red",fontWeight:"bolder",fontSize:"18px",marginTop:"14px",paddingLeft:"15px",paddingBottom:"8px"}}>{companydetail.title} </div>
                </div>
            </Grid> 

            {(companydetail.lisance&&Array.isArray(companydetail.lisance[0]))?companydetail.lisance.map((item1,indx)=>{return(
            <Grid item  xs={12} md={6} lg={6}>
                <AppOrderTimeline  key={indx} title="Lisans" list={[...Array(3)].map((_, i) => ({ id:"",
                title: [
                    'Lisans başlama tarihi',
                    'Lisans başlama bitiş',
                    'lisans type'
                ][i],time:item1[i],}))}/>
            </Grid>)})
            :<Grid item  xs={12} md={6} lg={6}>
                <AppOrderTimeline title="Lisans"list={[...Array(3)].map((_, i) => ({id:"",
                title: [
                    'Lisans başlama tarihi',
                    'Lisans başlama bitiş',
                    'lisans type'
                ][i],time:companydetail.lisance[i],}))}/>
            </Grid>}
        </Grid>
    </Container>
</Page>
);
}




const mapStateToProps = (state) => ({state})

const mapDispatchToProps = {fetchPost,detailLisanceAdd}

export default connect(mapStateToProps, mapDispatchToProps)(UserCompanyDetail)