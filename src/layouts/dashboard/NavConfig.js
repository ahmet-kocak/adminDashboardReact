// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon('ic:baseline-account-box'),
  },
  {
    title: 'customer',
    path: '/dashboard/customer',
    icon: getIcon('ic:baseline-people-alt'),
  },
  {
    title: 'company',
    path: '/dashboard/company',
    icon: getIcon('ic:baseline-location-city'),
  },
  {
    title: 'rol',
    path: '/dashboard/rol',
    icon: getIcon('ic:baseline-account-tree'),
  },
  {
    title: 'userauth',
    path: '/dashboard/userauth',
    icon: getIcon('ic:baseline-rule'),
  },
  

];

export default navConfig;
