import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {IndexScreenQuery} from './__generated__/IndexScreenQuery.graphql';

import { Switch, Route, Redirect } from 'react-router-dom';
import CreateSignatureOrderScreen from './CreateSignatureOrderScreen';
import SignatureOrdersScreen from './SignatureOrdersScreen';
import SignatureOrderScreen from './SignatureOrderScreen';

import CreateSignatureWorkflowScreen from './CreateSignatureWorkflowScreen';
import SignatureWorkflowScreen from './SignatureWorkflowScreen';

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
      fetchPolicy: 'store-and-network'
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
    <Switch>
      <Route path="/signatureorders/create">
        <CreateSignatureOrderScreen  />
      </Route>
      <Route path="/signatureorders/:signatureOrderId">
        <SignatureOrderScreen  />
      </Route>
      <Route path="/signatureorders">
        <SignatureOrdersScreen />
      </Route>
      <Route path="/signatureworkflows/create/:signatureOrderId">
        <CreateSignatureWorkflowScreen  />
      </Route>
      <Route path="/signatureworkflows/:signatureWorkflowId">
        <SignatureWorkflowScreen  />
      </Route>
      <Route>
        <Redirect to="/signatureorders" />
      </Route>
    </Switch>
  )
}