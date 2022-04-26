import {filter} from 'lodash';
import {connect} from 'react-redux'
import {useState,useEffect} from 'react';
import {alpha, styled} from '@mui/material/styles';
import {Card,Table,Stack,Avatar,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination,TableHead,Grid}from'@mui/material';
import PropTypes from 'prop-types';

import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {UserListToolbar} from '../sections/@dashboard/user';
import {posts} from '../sections/faker';
import {BlogPostCard} from '../sections/@dashboard/blog';
import {fetchPost,updatePost} from '../actions/userAction';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {return -1;}
  if (b[orderBy] > a[orderBy]) {return 1;}
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {const order = comparator(a[0], b[0]);
    if (order !== 0) return order; return a[1] - b[1];});
    if (query) {return filter(array,(_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase())!==-1);}
  return stabilizedThis.map((el) => el[0]);
}


//---------------------UserAuth Component--------------
function UserAuth (props) { 

  

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('firstName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checkbox, setCheckbox] = useState({id:"",data:[]});
  const [boolen, setBoolen] = useState(false);
  useEffect(() => {props.fetchPost()}, [boolen]);
  const USERLIST=props.state.userReducer.filter(item=>item.status===true)
  const handleChangePage = (event, newPage) => {setPage(newPage);};
  const handleChangeRowsPerPage = (event) => {setRowsPerPage(parseInt(event.target.value, 10));setPage(0);};
  const handleFilterByName = (event) => {setFilterName(event.target.value);};
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy),filterName);
  const isUserNotFound = filteredUsers.length === 0;
  const CardMediaStyle = styled('div')({position: 'relative',paddingTop: 'calc(100% * 3 / 4)'});
  const CoverImgStyle = styled('img')({top: 0,width: '100%',height: '100%',objectFit: 'cover',position: 'absolute'});
  BlogPostCard.propTypes = {post:PropTypes.object.isRequired};


const onChance=(myid,e)=>{
  const dbCompany=props.state.userReducer.filter(item=>item._id===myid)[0].company;
  if (e.target.checked) {
    setCheckbox({id:myid,data:[e.target.value,...dbCompany].reduce(function(a,b){if(a.indexOf(b)< 0)a.push(b);return a;},[])})
  } else {
    setCheckbox({id:myid,data:[...dbCompany]})
  }
};


  return (
    <Page title="Rol">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>User Auth</Typography>
        </Stack>
        <Card style={{paddingLeft:"35px"}}>
          <UserListToolbar  numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead><tr><th style={{height:"25px"}}></th></tr></TableHead>
                <TableHead style={{marginTop:"40px"}} ><tr style={{textAlign:"left"}}><th style={{paddingLeft:"15px"}}>FirstName</th>
                    <th style={{paddingLeft:"16px"}}>LastName</th>
                    <th style={{paddingLeft:"16px"}}>Company Auth</th></tr></TableHead>
                <TableHead><tr><th style={{height:"25px"}}></th></tr></TableHead>
                <TableBody>{filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
                      const {firstName,lastName,imgUrl,email,_id,company} = row;
                      const isItemSelected = selected.indexOf(firstName)!==-1;
                      return (
                        <TableRow hoverkey={i}tabIndex={-1}role="checkbox"selected={isItemSelected}aria-checked={isItemSelected}>
                          <TableCell component="th" scope="row" padding="none" style={{color:"blue"}} width={150}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={firstName} src={imgUrl}/>
                              <Typography variant="subtitle2" noWrap>{firstName}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left" width={150} style={{color:"blue"}}>{lastName}</TableCell>

                          

                          <TableCell align="left">
                            {email==="admin@admin.com"?
                              "":
                              (<form onSubmit={(e)=>{e.preventDefault();if(checkbox.id===_id){props.updatePost(_id,"dashboard/userauth/",{company:checkbox.data});props.fetchPost();setBoolen(!boolen)}}}>
                                <Grid container  columnSpacing={{xs:0.1,sm:1,md:1}} spacing={2.6}>{posts.map((posts,i) =>{return (
                                  (company.length>0 && company.indexOf(posts.title)!==-1))?
                                  "":
                                  (<Grid item xs={1.3} key={i}>
                                    <Card sx={{ position:'relative'}}>
                                      <CardMediaStyle sx={{...({ pt:'calc(100%*4/3)','&:after':{top:0,content:"''",width:'100%',height:'100%',position:'absolute',
                                      bgcolor:(theme)=>alpha(theme.palette.grey[900], 0)}}),...({ pt: { xs: 'calc(100% * 4 / 3)', sm: 'calc(100% * 3 / 3)'}})}}>
                                          <CoverImgStyle alt={posts.title} src={posts.cover} />
                                      </CardMediaStyle>
                                    </Card>
                                    <label htmlFor={i} style={{fontSize:"13px",marginTop:"10px"}}>
                                      <input type="checkbox" value={posts.title} onChange={onChance.bind(this,_id)} id={i}/><br/>{posts.title}
                                    </label>
                                  </Grid>)
                                })}
                                </Grid>
                                <button style={{background:"indianred",borderRadius:"5px",padding:"1px 28px",cursor:"pointer",marginTop:"5px"}}type='submit'>Auth
                                </button>
                              </form>)
                            }
                          </TableCell> 



                        </TableRow>);
                      })}{emptyRows > 0 && (<TableRow style={{ height: 53 * emptyRows }}><TableCell colSpan={6} /></TableRow>)}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow><TableCell align="center"colSpan={6}sx={{py:3}}><SearchNotFound searchQuery={filterName}/></TableCell></TableRow>
                  </TableBody>
                )}
                
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination rowsPerPageOptions={[5,10,25]} component="div" count={USERLIST.length} rowsPerPage={rowsPerPage} 
                            page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Card>
      </Container>
    </Page>
  )
}


const mapStateToProps = (state) => ({state})
const mapDispatchToProps = {fetchPost,updatePost}
export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)