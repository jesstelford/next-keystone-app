import gql from 'graphql-tag'

//import PostUpvoter from '../../components/PostUpvoter'
import App from '../../components/App'
import Header from '../../components/Header'
import { withApollo, initApolloClient } from '../../lib/apollo'

// `getStaticPaths` allows the user to return a list of parameters to
// render to HTML at build time.
export async function unstable_getStaticPaths(...args) {
  const apolloClient = initApolloClient();
  const { data, error } = await apolloClient.query({
    query: gql`
      query {
        allPages {
          id
          path
        }
      }
    `
  });

  return data.allPages.map(({ path }) => ({
    params: { slug: path }
  }));
}

// getStaticProps is only called server-side
export async function unstable_getStaticProps({ params }) {
  const apolloClient = initApolloClient();
  const { data, error } = await apolloClient.query({
    query: gql`
      query getPage($path: String) {
        allPages(where: { path: $path }) {
          id
          path
          name
          claps
        }
      }
    `,
    variables: { path: params.slug }
  });

  if (!data.allPages || !data.allPages.length) {
    return {}
  }

  return {
    props: {
      // Purposely spread here to get a copy out of the Apollo cache
      ...data.allPages[0],
    }
  };
}

const Post = props => (
  <App>
    <Header />
    <p>
      Path: {props.path}<br />
      Name: {props.name}<br />
      Claps: {props.claps}<br />
      {/*<PostUpvoter id={props.id} votes={props.claps} />*/}
    </p>
  </App>
)

export default withApollo(Post, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false,
})
