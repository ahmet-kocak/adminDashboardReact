import { Link as RouterLink } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { BlogPostCard, BlogPostsSearch } from '../sections/@dashboard/blog';
import { posts } from '../sections/faker';
import Page from '../components/Page';
import Iconify from '../components/Iconify';

export default function Company () {
  return (
    <Page title="Dashboard: Company">
      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>Company</Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>New Post</Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={posts} />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (<BlogPostCard key={post.id} post={post}  />))}
        </Grid>
        
      </Container>
    </Page>
  );
}
