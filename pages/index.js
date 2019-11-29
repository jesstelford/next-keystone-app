import gql from 'graphql-tag'

import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import PostList from '../components/PostList'
import { withApollo, initApolloClient } from '../lib/apollo'

// getStaticProps is only called server-side
export async function unstable_getStaticProps() {
  const apolloClient = initApolloClient();
  const { data, error } = await apolloClient.query({
    query: gql`
      query getPages {
        allPages {
          id
          path
          name
          claps
        }
      }
    `,
  });

  if (!data.allPages || !data.allPages.length) {
    return { pages: [] }
  }

  return { props: { pages: data.allPages } };
}

const IndexPage = props => (
  <App>
    <Header />
    <InfoBox>
      ℹ️ This example shows using{' '}
      <a
        href="https://github.com/zeit/next.js/issues/9524"
        target="_blank"
        rel="noopener noreferrer"
      >
        Next.js' new <code>unstable_getStaticPaths</code> & <code>unstable_getStaticProps</code> APIs
      </a>{' '}
      to pull data from a{' '}
      <a
        href="https://keystonejs.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        KeystoneJS instance
      </a>.
    </InfoBox>
    <PostList posts={props.pages} />
  </App>
)

export default withApollo(IndexPage, { ssr: false })
