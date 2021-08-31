import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {IndexScreenQuery} from './__generated__/IndexScreenQuery.graphql';

export default function IndexScreen() {
  const data = useLazyLoadQuery<IndexScreenQuery>(
    graphql`
      query IndexScreenQuery {
        viewer {
          __typename
          ... on Application {
            id
          }
          ... on AnonymousViewer {
            authenticated
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'network-only'
    }
  );
  
  if (data.viewer.__typename !== 'Application') {
    return (
      <div className="alert alert-danger">
        Invalid API credentials
      </div>
    )
  }

  console.log(data);
  return (
    <div>
    
    </div>
  )
}