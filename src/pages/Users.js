import { filter } from 'lodash';
import { connect } from 'react-redux'
import { useState,useEffect } from 'react';
import { fetchPost,updatePost } from '../actions/userAction';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {UserListToolbar } from '../sections/@dashboard/user';
import { posts } from '../sections/faker';

// mock


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


//-------------------------------------------Users-----

 function Users (props) {
   const USERLIST=props.state.userReducer.filter(item=>item.status===true)
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('firstName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [boolen, setBoolen] = useState(false);

  


  const handleChangePage = (event, newPage) => {setPage(newPage);};
  const handleChangeRowsPerPage = (event) => {setRowsPerPage(parseInt(event.target.value, 10));setPage(0);};
  const handleFilterByName = (event) => {setFilterName(event.target.value);};
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

useEffect(() => {
  props.fetchPost()
}, [boolen])



  return (
    <Page title="Rol">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
         Users
          </Typography>
          
        </Stack>

        <Card style={{paddingLeft:"35px"}}>
          <UserListToolbar  numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table><TableHead>
                <tr><th style={{height:"25px"}}></th></tr></TableHead>
                <TableHead style={{marginTop:"40px"}} ><tr style={{textAlign:"left"}}><th style={{paddingLeft:"15px"}}>FirstName</th>
                  <th style={{paddingLeft:"16px"}}>LastName</th>
                  <th style={{paddingLeft:"16px"}}>Email</th>
                  <th style={{paddingLeft:"16px"}}>Rol</th>
                  <th style={{paddingLeft:"16px"}}>Company</th></tr></TableHead>
                <TableHead><tr><th style={{height:"25px"}}></th></tr></TableHead>
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
                    const { firstName, lastName,imgUrl, email,company,_id} = row;
                    const isItemSelected = selected.indexOf(firstName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={i}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        
                        <TableCell component="th" scope="row" padding="none" style={{color:"blue"}} width={150}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstName} src={imgUrl} />
                            <Typography variant="subtitle2" noWrap>
                            {firstName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left" width={150} style={{color:"blue"}}>{lastName}</TableCell>
                        <TableCell align="left" width={250} style={{color:"blue"}}>{email}</TableCell>
                        <TableCell align="left" width={150} style={{color:"red",fontWeight:"bold"}}>{(email==="admin@admin.com")?"admin":"user"}</TableCell>
                        <TableCell align="left" width={250} style={{fontWeight:"bold"}}>
                          <Table><TableBody>
                            {company&&company.map((item,i)=>
                            <tr key={i} style={{height:"55px"}}>
                              <td style={{width:"20%",paddingRight:"10px"}}><img style={{borderRadius:"30%"}} src={`/static/mock-images/covers/cover_${posts.map((par)=>par.title===item?true:"").indexOf(true) + 2}.jpg`} alt=""/></td> 
                              <td style={{paddingLeft:"20px"}}>{item}</td>
                              <td style={{paddingLeft:"10px",height:"30px"}}>
                                <button onClick={()=> {props.updatePost(_id,"dashboard/user/",{company:company.filter(par=>par!==item)});props.fetchPost();setBoolen(!boolen)} } style={{border:"none",cursor:"pointer",backgroundColor:"white"}}><Iconify icon="wpf:delete" color="blue"/></button>
                              </td>
                            </tr>)
                            }</TableBody>
                          </Table>
                        </TableCell>  
                      </TableRow>);
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}




const mapStateToProps = (state) => ({state})

const mapDispatchToProps = {fetchPost,updatePost}

export default connect(mapStateToProps, mapDispatchToProps)(Users)