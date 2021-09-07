import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignatureOrderScreenQuery} from './__generated__/SignatureOrderScreenQuery.graphql';

import CancelSignatureOrderButton from '../components/CancelSignatureOrderButton';
import AddSignatoryButton from '../components/AddSignatoryButton';
import DeleteSignatoryButton from '../components/DeleteSignatoryButton';
import CloseSignatureOrderButton from '../components/CloseSignatureOrderButton';

function base64ToBlob( base64 : string, type = "application/pdf" ) {
  const binStr = atob( base64 );
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[ i ] = binStr.charCodeAt( i );
  }
  return new Blob( [ arr ], { type: type } );
}

graphql`
  fragment SignatureOrderScreenSignatory on Signatory {
    id
    status
    token
  }
`;

graphql`
  fragment SignatureOrderScreenDocument on Document {
    id
    title
    blob
  }
`;

const Query = graphql`
  query SignatureOrderScreenQuery($id: ID!) {
    signatureOrder(id: $id) {
      status

      signatories {
        ...SignatureOrderScreenSignatory @relay(mask: false)
        ...DeleteSignatoryButton_signatory
      }

      documents {
        ...SignatureOrderScreenDocument @relay(mask: false)
      }

      ...CancelSignatureOrderButton_signatureOrder
      ...AddSignatoryButton_signatureOrder
      ...DeleteSignatoryButton_signatureOrder
      ...CloseSignatureOrderButton_signatureOrder
    }
  }
`;

export default function SignatureOrdersScreen() {
  const [fetchKey, setFetchKey] = useState(Math.random().toString());
  const params = useParams<{signatureOrderId: string}>();
  const data = useLazyLoadQuery<SignatureOrderScreenQuery>(Query, {
    id: params.signatureOrderId
  }, {
    fetchKey,
    fetchPolicy: 'store-and-network'
  });

  useEffect(() => {
    if (data.signatureOrder?.status !== "OPEN") return;
    /*
     * Rudimentary polling to detect if/when signatories sign
     * Would probably be better as a GraphQL subscription
     * However real world API scenario would likely use API hooks so not worth the hassle
     */
    const interval = setInterval(() => {
      setFetchKey(Math.random().toString());
    }, 5000);

    return () => clearInterval(interval);
  }, [params.signatureOrderId, data.signatureOrder?.status]);

  if (!params.signatureOrderId || !data.signatureOrder) return null;

  return (
    <div>
      Status: {data.signatureOrder.status}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Documents</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.signatureOrder.documents.map((document, index) => (
            <tr key={document.id}>
              <th scope="row" >#{index + 1}</th>
              <td>{document.title}</td>
              <td>
                {document.blob && (
                  <a href={URL.createObjectURL(base64ToBlob(document.blob))} target="_blank" rel="noreferrer">Download</a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                {data.signatureOrder?.status === 'OPEN' && signatory.status === 'OPEN' && (
                  <a href={`${process.env.REACT_APP_SIGNATURE_FRONTEND_URI}?token=${signatory.token}`}>Sign link (right click and copy link)</a>
                )}
              </td>
              <td>
                <DeleteSignatoryButton signatureOrder={data.signatureOrder!} signatory={signatory} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <div>
          <AddSignatoryButton signatureOrder={data.signatureOrder} />
          &nbsp;
        </div>
        <div>
          <CancelSignatureOrderButton signatureOrder={data.signatureOrder} />
          <CloseSignatureOrderButton signatureOrder={data.signatureOrder} className="ms-3" />
        </div>
      </div>
    </div>
  )
}