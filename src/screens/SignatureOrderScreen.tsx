import React from 'react';

import {useParams} from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignatureOrderScreenQuery} from './__generated__/SignatureOrderScreenQuery.graphql';

export default function SignatureOrdersScreen() {
  const params = useParams<{signatureOrderId: string}>();
  const data = useLazyLoadQuery<SignatureOrderScreenQuery>(
    graphql`
      query SignatureOrderScreenQuery($id: ID!) {
        signatureOrder(id: $id) {
          status
        }
      }
    `
  , {
    id: params.signatureOrderId
  });

  console.log(data);
  if (!params.signatureOrderId || !data.signatureOrder) return null;

  return (
    <div>
      
    </div>
  )
}