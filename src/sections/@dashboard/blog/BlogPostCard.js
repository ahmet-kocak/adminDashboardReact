import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import {Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
import { fDate } from '../../../utils/formatTime';
import SvgIconStyle from '../../../components/SvgIconStyle';
import {detailPost} from "../../../actions/userAction"
import BlogPostDetail from './BlogPostDetail';

const CardMediaStyle = styled('div')({position: 'relative',paddingTop:'calc(100% * 3 / 4)',});
const TitleStyle = styled(Link)({height:44,overflow:'hidden',WebkitLineClamp:2,display:'-webkit-box',WebkitBoxOrient:'vertical'});
const AvatarStyle=styled(Avatar)(({theme})=>({zIndex:9,width:32,height:32,position:'absolute',left:theme.spacing(3),bottom:theme.spacing(-2)}));
const CoverImgStyle = styled('img')({top: 0,width: '100%',height: '100%',objectFit: 'cover',position: 'absolute',});
BlogPostCard.propTypes = {post:PropTypes.object.isRequired,index:PropTypes.number,};


 function BlogPostCard(props) {
  const { cover, title, author, createdAt } = props.post;
  const latestPostLarge = props.index === -1;


 

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 4}>
      <Card sx={{ position: 'relative' }}>

        <CardMediaStyle sx={{...((latestPostLarge)&& {pt:'calc(100%*4/3)',
              '&:after':{top:0,content:"''",width:'100%',height:'100%',position:'absolute',
              bgcolor:(theme)=>alpha(theme.palette.grey[900],0.72)}}),
            ...(latestPostLarge && {pt: {xs:'calc(100% * 4 / 3)',sm:'calc(100% * 3 / 4.66)',},}),}}>
          <SvgIconStyle color="paper" src="/static/icons/shape-avatar.svg"
            sx={{width:80,height:36,zIndex:9,bottom:-15,position:'absolute',color:'background.paper',...((latestPostLarge)&&{display:'none'})}}/>
          <AvatarStyle alt={author.name} src={author.avatarUrl}
            sx={{...((latestPostLarge) && {zIndex:9,top:24,left:24,width:40,height:40})}}/>

          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent sx={{pt: 4,...((latestPostLarge) && {bottom: 0,width:'100%',position:'absolute',}),}}>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>{fDate(createdAt)}
          </Typography>

          <TitleStyle to="/dashboard/company/detail" underline="none" color="inherit" variant="subtitle2"  component={RouterLink}
            sx={{...(latestPostLarge && { typography: 'h5', height: 60 }),...((latestPostLarge) && {color: 'common.white'})}}
            onClick={()=>{props.detailPost(props.post);localStorage.setItem("Cdtl",JSON.stringify(props.post))}}>
            {title}
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
};




const mapStateToProps = (state) => ({state})
const mapDispatchToProps = {detailPost}
export default connect(mapStateToProps, mapDispatchToProps)(BlogPostCard)