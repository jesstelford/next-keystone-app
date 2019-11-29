import gql from 'graphql-tag'

import PostUpvoter from '../../components/PostUpvoter'
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
    <h1>{props.name}</h1>
    <p>
      Clap for this: <PostUpvoter path={props.path} />
    </p>
    <p>
      Tech virtual drone online browser platform through in a system. But stream software offline. Professor install angel sector anywhere create at components smart. Document fab developers encryption smartphone powered, bespoke blockstack edit atoms. Companies a storage adopters. Hardware company planet, torrent ut developers stream, engineering keyphrase end. Document reality edit, install strategy startups hardware stream, analytics e-commerce smart. Privacy news data policies analytics documents.
    </p>
    <p>
  Crytocurrency bespoke decentralized. In a smart home. Companies privacy build at activists data. privacy Ultra-private funding apps, strategy startups onecutive computer. In startups developers bot precision anywhere entrepreneurs. Visionary fab bespoke strong in cloud. Despite policies ability bespoke strong deal cryptocurrency. Now forecast security edit. Services circuit company read, at labs smartphone deal direct. Document components offline, security crypto devices funding, Ultra-private on internet.
    </p>
  </App>
)

export default withApollo(Post, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false,
})
