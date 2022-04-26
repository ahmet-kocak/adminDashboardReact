import { Link as RouterLink } from 'react-router-dom';
import logom from "../myLogo.jpg"


export default function Logo() {
  const logo=<img src={logom} alt="" width={90} height={80}  style={{borderRadius:"10px",boxShadow:"2px 2px 2px black"}}/>
  return <RouterLink to="/dashboard/app">{logo}</RouterLink>;
}
