import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack,TextField, IconButton, InputAdornment} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import { connect } from 'react-redux'
import {signin} from '../../../actions/userAction';


// ----------------------------------------------------------------------

function LoginForm(props) {

const navigate = useNavigate();
const [error, setError] = useState(false)
const [showPassword, setShowPassword] = useState(false);
useEffect(() => {
    if(props.login.data!==undefined){

if(props.login.data.showOperator){(props.login.data.role[0]==='ROLE_USER')?navigate('/user',{replace:true })
:(props.login.data.role[0]==='ROLE_ADMIN'?navigate('/dashboard/app', {replace:true })
:navigate('/login'))}else{ navigate('/login'); if(props.login.error){formik.resetForm();setError(props.login.error); } }}
 }, [props.login]) 


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),});

const formik = useFormik({
    initialValues: {email: '',password: '',remember: true,},
    validationSchema: LoginSchema,
    onSubmit: () => {props.signin(formik.values); }});

const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
const handleShowPassword = () => {setShowPassword((show) => !show);};
  
  
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} method="POST" action='/login'>
        <Stack spacing={3}>

          <TextField fullWidth  type="email" label="Email address" {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}helperText={touched.email && errors.email}/>
          <TextField fullWidth autoComplete="current-password" type={showPassword ? 'text' : 'password'} label="Password"
          
            {...getFieldProps('password')}
            InputProps={{ endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton></InputAdornment>),}}
            error={Boolean(touched.password && errors.password)} helperText={touched.password && errors.password}/>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        
          <Link component={RouterLink} variant="subtitle2" to="/login" underline="hover"> </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
          {error.message?<h4 style={{color:"red", marginTop:"20px"}}>{error.message}</h4>:""}
      </Form>
    </FormikProvider>
  );
}




const mapStateToProps = (state) => { 
  return {login:state.loginReducer}}
const mapDispatchToProps = {signin}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)