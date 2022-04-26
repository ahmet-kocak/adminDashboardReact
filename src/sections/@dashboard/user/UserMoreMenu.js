import { useRef, useState } from 'react';
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { deletePost,updatePost,fetchPost } from '../../../actions/userAction';

// ----------------------------------------------------------------------

function UserMoreMenu(props) {
  
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} to="">
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" onClick={()=>{props.deletePost(props.id)}} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="User/No User" onClick={()=>{
            
            props.updatePost(props.id,"dashboard/rol/",{status:!props.state.userReducer.filter(item=>item._id===props.id)[0].status});
          
          props.fetchPost()
          
          }
          
          
          }
            primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}





const mapStateToProps = (state) => ({state})

const mapDispatchToProps = {deletePost,updatePost,fetchPost}

export default connect(mapStateToProps, mapDispatchToProps)(UserMoreMenu)
