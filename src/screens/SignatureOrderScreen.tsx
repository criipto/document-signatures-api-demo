import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignatureOrderScreenQuery} from './__generated__/SignatureOrderScreenQuery.graphql';

import CancelSignatureOrderButton from '../components/CancelSignatureOrderButton';
import AddSignatoryButton from '../components/AddSignatoryButton';
import DeleteSignatoryButton from '../components/DeleteSignatoryButton';
import CloseSignatureOrderButton from '../components/CloseSignatureOrderButton';
import ChangeSignatoryButton from '../components/ChangeSignatoryButton';

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
    statusReason
    href
    reference

    documents {
      edges {
        status
        node {
          id
          title
        }
      }
    }
    
    evidenceProviders {
      __typename
    }
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
      id
      status
      title

      ui {
        signatoryRedirectUri
      }

      signatories {
        ...SignatureOrderScreenSignatory @relay(mask: false)
        ...DeleteSignatoryButton_signatory
        ...ChangeSignatoryButton_signatory
      }

      evidenceProviders {
        __typename
        ... on OidcJWTSignatureEvidenceProvider {
          id
          name
          domain
          clientID
          acrValues
        }
        ... on DrawableSignatureEvidenceProvider {
          id
          requireName
        }
      }

      documents {
        ...SignatureOrderScreenDocument @relay(mask: false)
      }

      ...CancelSignatureOrderButton_signatureOrder
      ...AddSignatoryButton_signatureOrder
      ...DeleteSignatoryButton_signatureOrder
      ...ChangeSignatoryButton_signatureOrder
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
      Title: {data.signatureOrder.title}<br />
      Status: {data.signatureOrder.status}<br />
      Signatory Redirect URI: {data.signatureOrder.ui?.signatoryRedirectUri}<br />

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
            <th scope="col">Evidence Providers</th>
            <th scope="col">Type</th>
            <th scope="col">Configuration</th>
          </tr>
        </thead>
        <tbody>
          {data.signatureOrder.evidenceProviders.map((provider, index) => (
            <tr key={index}>
              <th scope="row">#{index + 1}</th>
              <td>
                {provider.__typename}
              </td>
              <td>
                {provider.__typename === 'OidcJWTSignatureEvidenceProvider' ? (
                  <React.Fragment>
                    Domain: {provider.domain}<br />
                    ClientID: {provider.clientID}<br />
                    Acr values: {provider.acrValues.join(', ')}<br />
                  </React.Fragment>
                ) : provider.__typename === 'DrawableSignatureEvidenceProvider' ? (
                  <React.Fragment>
                    Require Name: {provider.requireName ? 'true' : 'false'}<br />
                  </React.Fragment>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Signatories</th>
            <th scope="col">Reference</th>
            <th scope="col">Status</th>
            <th scope="col">Documents</th>
            <th scope="col">Evidence Providers</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.signatureOrder.signatories.map((signatory, index) => (
            <tr key={signatory.id}>
              <th scope="row" >#{index + 1}</th>
              <td>{signatory.reference}</td>
              <td>{signatory.status}{signatory.statusReason ? ` (${signatory.statusReason})` : null}</td>
              <td>
                {signatory.documents.edges.map(edge => <span key={edge.node.id}>{edge.node.title} ({edge.status})<br /></span>)}
              </td>
              <td>
                {signatory.evidenceProviders.map(p => <span key={p.__typename}>{p.__typename}<br /></span>)}
              </td>
              <td>
                {data.signatureOrder?.status === 'OPEN' && signatory.status === 'OPEN' && (
                  <a href={signatory.href}>Sign link (right click and copy link)</a>
                )}
              </td>
              <td style={{display: 'flex', gap: 5, justifyContent: 'flex-end'}}>
                <ChangeSignatoryButton signatureOrder={data.signatureOrder!} signatory={signatory} />
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