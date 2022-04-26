import { Container,  Typography } from '@mui/material';
import Page from '../components/Page';
import {ProductList} from '../sections/@dashboard/products';
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function Customer() {
  
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Customer
        </Typography>
        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
