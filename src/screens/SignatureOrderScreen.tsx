import React, {useEffect, useState} from 'react';

import {Link, useRouteMatch} from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from "react-relay";
import {get, isBoolean, isPlainObject} from 'lodash';

import {SignatureOrderScreenQuery} from './__generated__/SignatureOrderScreenQuery.graphql';

import CancelSignatureOrderButton from '../components/CancelSignatureOrderButton';
import AddSignatoryButton from '../components/AddSignatoryButton';
import DeleteSignatoryButton from '../components/DeleteSignatoryButton';
import CloseSignatureOrderButton from '../components/CloseSignatureOrderButton';
import ChangeSignatoryButton from '../components/ChangeSignatoryButton';
import SignActingAsButton from '../components/SignActingAsButton';
import ExtendSignatureOrderButton from '../components/ExtendSignatureOrderButton';
import CleanupSignatureOrderButton from '../components/CleanupSignatureOrderButton';
import ChangeSignatureOrderButton from '../components/ChangeSignatureOrderButton';

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
    downloadHref
    reference
    role

    traceId
    spanId

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
    __typename
    id
    title
    blob
    originalBlob

    signatures {
      __typename
      signatory {
        id
        reference
        role
      }

      ... on JWTSignature {
        claims {
          name
          value
        }
        jwt
        jwks
      }
      ... on DrawableSignature {
        name
        image
      }
      ... on CompositeSignature {
        signatures {
          __typename
          ... on JWTSignature {
            claims {
              name
              value
            }
            jwt
            jwks
          }
          ... on DrawableSignature {
            name
            image
          }
        }
      }
    }
  }
`;

const Query = graphql`
  query SignatureOrderScreenQuery($id: ID!) {
    signatureOrder(id: $id) {
      id
      status
      title
      timezone
      maxSignatories
      createdAt
      expiresAt
      closedAt
      traceId

      ui {
        signatoryRedirectUri
        stylesheet

        language
        logo {
          src
          href
        }
        disableRejection
        renderPdfAnnotationLayer
      }

      webhook {
        url
      }

      signatories {
        ...SignatureOrderScreenSignatory @relay(mask: false)
        ...DeleteSignatoryButton_signatory
        ...ChangeSignatoryButton_signatory
        ...SignActingAsButton_signatory
      }

      evidenceProviders {
        __typename
        id
        ... on OidcJWTSignatureEvidenceProvider {
          id
          name
          domain
          clientID
          acrValues
          alwaysRedirect
        }
        ... on CriiptoVerifySignatureEvidenceProvider {
          id
          name
          domain
          clientID
          acrValues
          alwaysRedirect
          message
          loginHint
          scope
          audiences
          environment
        }
        ... on DrawableSignatureEvidenceProvider {
          id
          requireName
          minimumWidth
          minimumHeight
        }
        ... on AllOfSignatureEvidenceProvider {
          providers {
            __typename
          }
        }
      }

      documents {
        ...SignatureOrderScreenDocument @relay(mask: false)
      }

      ...CancelSignatureOrderButton_signatureOrder
      ...CleanupSignatureOrderButton_signatureOrder
      ...AddSignatoryButton_signatureOrder
      ...DeleteSignatoryButton_signatureOrder
      ...ChangeSignatoryButton_signatureOrder
      ...SignActingAsButton_signatureOrder
      ...CloseSignatureOrderButton_signatureOrder
      ...ExtendSignatureOrderButton_signatureOrder
      ...ChangeSignatureOrderButton_signatureOrder
    }
  }
`;

const SETTINGS = [
  'traceId',
  'title',
  'status',
  'maxSignatories',
  'timezone',
  'createdAt',
  'closedAt',
  'expiresAt',
  'ui.signatoryRedirectUri',
  'ui.language',
  'ui.stylesheet',
  'ui.logo.src',
  'ui.logo.href',
  'ui.disableRejection',
  'ui.renderPdfAnnotationLayer',
  'webhook.url'
];

function displaySetting(signatureOrder: SignatureOrderScreenQuery["response"]["signatureOrder"], setting: string) {
  const value = get(signatureOrder, setting, null);
  if (isPlainObject(value)) return JSON.stringify(value);
  if (isBoolean(value)) {
    return value ? "true" : "false";
  }
  return value;
}

export default function SignatureOrdersScreen() {
  const match = useRouteMatch<{signatureOrderId: string}>();
  const [fetchKey, setFetchKey] = useState(Math.random().toString());
  const params = match.params;
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
      if (data.signatureOrder?.status !== "OPEN") return;
      setFetchKey(Math.random().toString());
    }, 30000);

    return () => clearInterval(interval);
  }, [params.signatureOrderId, data.signatureOrder?.status]);

  if (!params.signatureOrderId || !data.signatureOrder) return null;

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Setting</th>
            <th scope="col">Value</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {SETTINGS.filter(setting => get(data.signatureOrder, setting, null)).map(setting => (
            <tr key={setting}>
              <td>{setting}</td>
              <td>
                {displaySetting(data.signatureOrder, setting)}

                {setting === 'expiresAt' ? (
                  <ExtendSignatureOrderButton signatureOrder={data.signatureOrder!} />
                ) : null}
                {setting === 'webhook.url' ? (
                  <React.Fragment>
                    <br />
                    <Link to={`${match.url}/webhook-logs`}>Logs</Link>
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
            <th scope="col">Documents</th>
            <th scope="col">Title</th>
            <th scope="col">Signatures</th>
            <th scope="col">Original Blob</th>
            <th scope="col">Blob</th>
            <th scope="col">iText</th>
          </tr>
        </thead>
        <tbody>
          {data.signatureOrder.documents.map((document, index) => (
            <tr key={document.id}>
              <th scope="row" >#{index + 1} ({document.__typename === 'XmlDocument' ? 'XML' : 'PDF'})</th>
              <td>{document.title}</td>
              <td>
                <ul>
                  {document.signatures?.map(signature => (
                    <li>
                      {signature.__typename}
                      {signature.signatures?.length ? ` (${signature.signatures?.map(s => s.__typename).join(', ')})` : ''}
                      <br />
                      Signatory: {signature.signatory?.reference}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                {document.originalBlob && (
                  <a href={URL.createObjectURL(base64ToBlob(document.originalBlob, document.__typename === 'XmlDocument' ? 'text/xml' : 'application/pdf'))} target='_blank' rel="noreferrer">Download</a>
                )}
              </td>
              <td>
                {document.blob && (
                  <a href={URL.createObjectURL(base64ToBlob(document.blob, document.__typename === 'XmlDocument' ? 'text/xml' : 'application/pdf'))} target="_blank" rel="noreferrer">Download</a>
                )}
              </td>
              <td>
                {document.blob ? iTextVersions(document.blob).join(', ') : null}
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
            <th scope="col">ID</th>
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
              <td style={{wordBreak: 'break-all'}}>
                {provider.id}
              </td>
              <td>
                {provider.__typename === 'OidcJWTSignatureEvidenceProvider' ? (
                  <React.Fragment>
                    Domain: {provider.domain}<br />
                    ClientID: {provider.clientID}<br />
                    Acr values: {provider.acrValues?.join(', ')}<br />
                    Always redirect: {provider.alwaysRedirect ? 'true' : 'false'}
                  </React.Fragment>
                ) : provider.__typename === 'CriiptoVerifySignatureEvidenceProvider' ? (
                  <React.Fragment>
                    Domain: {provider.domain}<br />
                    ClientID: {provider.clientID}<br />
                    Audiences: {provider.audiences?.join(', ')}<br />
                    Acr values: {provider.acrValues?.join(', ')}<br />
                    Always redirect: {provider.alwaysRedirect ? 'true' : 'false'}<br />
                    Message: {provider.message}<br />
                    login_hint: {provider.loginHint}<br />
                    scope: {provider.scope}<br />
                    Environment: {provider.environment ?? 'NOT SET'}<br />
                  </React.Fragment>
                ) : provider.__typename === 'DrawableSignatureEvidenceProvider' ? (
                  <React.Fragment>
                    Require Name: {provider.requireName ? 'true' : 'false'}<br />
                    {provider.minimumWidth &&
                      <>Minimum Width: {provider.minimumWidth}<br /></>
                    }
                    {provider.minimumHeight &&
                      <>Minimum Height: {provider.minimumHeight}</>
                    }
                  </React.Fragment>
                ) : provider.__typename === 'AllOfSignatureEvidenceProvider' ? (
                  <React.Fragment>
                    {provider.providers?.map(s => s.__typename).join(', ')}
                  </React.Fragment>
                )  : null}
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
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Documents</th>
            <th scope="col">Evidence Providers</th>
            <th scope="col">Span Context</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.signatureOrder.signatories.map((signatory, index) => (
            <tr key={signatory.id}>
              <th scope="row" >#{index + 1}</th>
              <td>{signatory.reference}</td>
              <td>{signatory.role}</td>
              <td>{signatory.status}{signatory.statusReason ? ` (${signatory.statusReason})` : null}</td>
              <td>
                {signatory.documents.edges.map(edge => <span key={edge.node.id}>{edge.node.title} ({edge.status})<br /></span>)}
              </td>
              <td>
                {signatory.evidenceProviders.map(p => <span key={p.__typename}>{p.__typename}<br /></span>)}
              </td>
              <td>
                {signatory.traceId}#{signatory.spanId}
              </td>
              <td>
                {signatory.downloadHref ? (
                  <a href={signatoryHref(signatory.downloadHref)}>Download link (right click and copy link)</a>
                ) : (
                  <a href={signatoryHref(signatory.href)}>Sign link (right click and copy link)</a>
                )}
              </td>
              <td style={{display: 'flex', gap: 5, justifyContent: 'flex-end'}}>
                <ChangeSignatoryButton signatureOrder={data.signatureOrder!} signatory={signatory} />
                <DeleteSignatoryButton signatureOrder={data.signatureOrder!} signatory={signatory} />
                <SignActingAsButton signatureOrder={data.signatureOrder!} signatory={signatory} />
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
          <ChangeSignatureOrderButton signatureOrder={data.signatureOrder} />
          <CancelSignatureOrderButton signatureOrder={data.signatureOrder} className="ms-3" />
          <CloseSignatureOrderButton signatureOrder={data.signatureOrder} className="ms-3" />
          <CleanupSignatureOrderButton signatureOrder={data.signatureOrder} />
        </div>
      </div>
    </div>
  )
}

function signatoryHref(input: string) : string {
  if (input.includes('/signatures/') && import.meta.env.VITE_SIGNATURE_FRONTEND_URI) {
    const url = new URL(input);
    url.host = (new URL(import.meta.env.VITE_SIGNATURE_FRONTEND_URI).host);
    url.pathname = url.pathname.replace('/signatures/', '');
    return url.href;
  }
  return input;
}

function iTextVersions(input: string) : string[] {
  const buffer = atob(input);
  return Array.from(buffer.matchAll(new RegExp(/Criipto#20#28iText#20(\d{1}).(\d{1}).(\d{1})#29/g))).map(m => `${m[1]}.${m[2]}.${m[3]}`);
}