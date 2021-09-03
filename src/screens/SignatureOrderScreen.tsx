import React from 'react';

import {useParams} from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignatureOrderScreenQuery} from './__generated__/SignatureOrderScreenQuery.graphql';

import CancelSignatureOrderButton from '../components/CancelSignatureOrderButton';
import AddSignatoryButton from '../components/AddSignatoryButton';
import DeleteSignatoryButton from '../components/DeleteSignatoryButton';

graphql`
  fragment SignatureOrderScreenSignatory on Signatory {
    id
    status
    token
  }
`

export default function SignatureOrdersScreen() {
  const params = useParams<{signatureOrderId: string}>();
  const data = useLazyLoadQuery<SignatureOrderScreenQuery>(
    graphql`
      query SignatureOrderScreenQuery($id: ID!) {
        signatureOrder(id: $id) {
          status

          signatories {
            ...SignatureOrderScreenSignatory @relay(mask: false)
            ...DeleteSignatoryButton_signatory
          }

          ...CancelSignatureOrderButton_signatureOrder
          ...AddSignatoryButton_signatureOrder
          ...DeleteSignatoryButton_signatureOrder
        }
      }
    `
  , {
    id: params.signatureOrderId
  });

  if (!params.signatureOrderId || !data.signatureOrder) return null;

  return (
    <div>
      Status: {data.signatureOrder.status}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Signatories</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.signatureOrder.signatories.map((signatory, index) => (
            <tr key={signatory.id}>
              <th scope="row" >#{index + 1}</th>
              <td>{signatory.status}</td>
              <td>
                <a href={`https://signatures-frontend-test.netlify.app/?token=${signatory.token}`}>Sign link (right click and copy link)</a>
              </td>
              <td>
                <DeleteSignatoryButton signatureOrder={data.signatureOrder!} signatory={signatory} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <AddSignatoryButton signatureOrder={data.signatureOrder} />
        <CancelSignatureOrderButton signatureOrder={data.signatureOrder} />
      </div>
    </div>
  )
}