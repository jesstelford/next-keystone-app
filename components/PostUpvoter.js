import React, { useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const CLAP_QUERY = gql`
  query getClaps($path: String) {
    allPages(where: { path: $path }) {
      id
      claps
    }
  }
`;

const CLAP_MUTATION = gql`
  mutation clap($path: String!) {
    clap(path: $path) {
      id
      claps
    }
  }
`

export default function PostUpvoter({ path }) {
  const { data, loading } = useQuery(CLAP_QUERY, { variables: { path } });
  const [clap] = useMutation(CLAP_MUTATION)

  const pageData = !loading && data && data.allPages && data.allPages.length ? data.allPages[0] : undefined;

  const upvotePost = useCallback(() => {
    clap({
      variables: {
        path,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        clap: {
          __typename: 'Page',
          id: pageData.id,
          claps: pageData.claps + 1,
        },
      },
    })
  }, [pageData, clap, path]);

  return (
    <button disabled={!pageData} onClick={() => upvotePost()}>
      👏 {pageData ? pageData.claps : '-'}
      <style jsx>{`
        button {
          background-color: transparent;
          border: 1px solid #e4e4e4;
          color: #000;
        }
        button:active {
          background-color: transparent;
        }
        button:hover {
          cursor: pointer;
        }
      `}</style>
    </button>
  )
}
