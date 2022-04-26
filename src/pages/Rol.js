import { filter } from 'lodash';
import { connect } from 'react-redux'
import { useState,useEffect } from 'react';
import { fetchPost } from '../actions/userAction';
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
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';



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

 function UserAuth (props) {
  useEffect(() => {props.fetchPost()},[]);
   const USERLIST=props.state.userReducer

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('firstName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;



  return (
    <Page title="Rol">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Rol
          </Typography>
        </Stack>

        <Card style={{paddingLeft:"35px"}}>
          <UserListToolbar  numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
               
                <TableHead><tr><th style={{height:"25px"}}></th></tr></TableHead>
                <TableHead style={{marginTop:"40px"}} ><tr style={{textAlign:"left"}}><th style={{paddingLeft:"15px"}}>FirstName</th><th style={{paddingLeft:"16px"}}>LastName</th><th style={{paddingLeft:"16px"}}>Rol</th></tr></TableHead>
                <TableHead><tr><th style={{height:"25px"}}></th></tr></TableHead>
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
                    const { firstName, lastName,imgUrl, email,_id,status } = row;
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
                        
                        <TableCell component="th" scope="row" padding="none" style={{color:"blue"}} width={300}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstName} src={imgUrl} />
                            <Typography variant="subtitle2" noWrap>
                            {firstName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left" width={300} style={{color:"blue"}}>{lastName}</TableCell>
                        <TableCell align="left" style={{color:"red",fontWeight:"bold"}}>{(email==="admin@admin.com")?"admin":(status===true?"user":"no user")}</TableCell>
                       <TableCell align="right">
                       {(email==="admin@admin.com")?"":<UserMoreMenu id={_id}/>}
                        </TableCell>
                      </TableRow>
                    );
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

const mapDispatchToProps = {fetchPost}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)