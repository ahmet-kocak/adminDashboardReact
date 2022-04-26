import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { faker } from '@faker-js/faker';
import { styled } from '@mui/material/styles';
import {Grid,Container, Typography} from '@mui/material';
import Page from '../../../components/Page';
import {AppNewsUpdate,AppOrderTimeline,AppWidgetSummary} from '../app';
import { fetchPost,detailLisanceAdd } from '../../../actions/userAction';
import "./index.css"
// ----------------------------------------------------------------------



const CoverImgStyle = styled('img')({width: '100%',height: '100%',borderRadius:"20px 20px 0 0",objectFit: 'cover'});
const LİSANCE={Basic:["11.6.2022","10.9.2023","Basic"],Pro:["11.5.2022","3.11.2023","Pro"],Ent:["11.6.2022","15.4.2023","Ent"]}

function BlogPostDetail(props) {

useEffect(() => {props.fetchPost()}, []);
const detail=JSON.parse(localStorage.getItem("Cdtl"));
const userCompany=props.state.userReducer.filter(item=>item.company.find(a=>a===detail.title)&&item.status===true);

const lisance=[...detail.lisance,...props.state.detailReducer.lisance]

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={detail.total.a} color="success" icon={'ant-design:android-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={detail.total.b} color="info" icon={'ant-design:apple-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={detail.total.c} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={detail.total.d} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
          <div style={{backgroundColor:"grey",borderRadius:"20px",}}>
          <CoverImgStyle alt={detail.title} src={detail.cover} />
          <div className='CoverImgStyle' >{detail.title} </div>
          </div>
          </Grid> 

          <Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate
              title="Users"
              list={userCompany&&userCompany.map((item,i) => ({
                
                id:i,title: `${item.firstName}`,
                image: `/static/mock-images/covers/cover_${i + 1}.jpg`,postedAt: faker.date.recent(),}))}/>
          </Grid>

            {(lisance&&Array.isArray(lisance))?lisance.map((item1,indx)=>{return(
              <Grid item  xs={12} md={6} lg={6} >

            <AppOrderTimeline 
            key={indx}
              title="Lisans"
              list={[...Array(3)].map((_, i) => ({
                id:i,
                title: [
                  'Lisans başlama tarihi',
                  'Lisans başlama bitiş',
                  'lisans type'
                ][i],
                time:item1[i],
              }))}/>
              </Grid>

              )}
            ): <Grid item  xs={12} md={6} lg={6}>

            <AppOrderTimeline 
          
              title="Lisans"
              list={[...Array(3)].map((_, i) => ({
                id:i,
                title: [
                  'Lisans başlama tarihi',
                  'Lisans başlama bitiş',
                  'lisans type'
                ][i],
                time:detail.lisance[i],
              }))}/>
              </Grid> }
            

            <Grid item  xs={12} md={6} lg={6}>
            <div className='lisanceadd'>
           <table >
             <thead><tr><th style={{width:"100%",color:"blue"}} rowSpan={2}>Lisance add</th></tr></thead>
             <tbody>
             <tr><td>Basic</td><th><button onClick={()=>{props.detailLisanceAdd(LİSANCE.Basic);props.fetchPost();lisance.push(LİSANCE.Basic)}} className="BlogPostDetail">Add</button></th></tr>
             <tr><td>Pro</td><th><button onClick={()=>{props.detailLisanceAdd(LİSANCE.Pro);props.fetchPost();lisance.push(LİSANCE.Pro)}} className="BlogPostDetail">Add</button></th></tr>
             <tr><td>Ent</td><th><button onClick={()=>{props.detailLisanceAdd(LİSANCE.Ent);props.fetchPost();lisance.push(LİSANCE.Ent)}} className="BlogPostDetail">Add</button></th></tr>
             </tbody></table>
            
            </div>
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}




const mapStateToProps = (state) => ({state})

const mapDispatchToProps = {fetchPost,detailLisanceAdd}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostDetail)