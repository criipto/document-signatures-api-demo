import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {IndexScreenQuery} from './__generated__/IndexScreenQuery.graphql';

import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import CreateSignatureOrderScreen from './CreateSignatureOrderScreen';
import SignatureOrdersScreen from './SignatureOrdersScreen';

export default function IndexScreen() {
  const data = useLazyLoadQuery<IndexScreenQuery>(
    graphql`
      query IndexScreenQuery {
        viewer {
          __typename
          ... on Application {
            id

            ... CreateSignatureOrderScreen_application
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

  return (
    <Router>
      <Switch>
        <Route path="/signatureorders/create">
          <CreateSignatureOrderScreen application={data.viewer} />
        </Route>
        <Route path="/signatureorders">
          <SignatureOrdersScreen />
        </Route>
        <Route>
          <Redirect to="/signatureorders" />
        </Route>
      </Switch>
    </Router>
  )
}