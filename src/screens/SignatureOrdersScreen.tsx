import React, {useState} from 'react';

import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { Link } from 'react-router-dom';

import {SignatureOrdersScreenQuery, SignatureOrderStatus} from './__generated__/SignatureOrdersScreenQuery.graphql';

graphql`
  fragment SignatureOrdersScreenSignatureOrder on SignatureOrder {
    id
    title
    status
  }
`

export default function SignatureOrdersScreen() {
  const [status, setStatus] = useState<SignatureOrderStatus | null>(null);
  const data = useLazyLoadQuery<SignatureOrdersScreenQuery>(
    graphql`
      query SignatureOrdersScreenQuery($status: SignatureOrderStatus) {
        viewer {
          ... on Application {
            signatureOrders(status: $status) {
              edges {
                node {
                  ... SignatureOrdersScreenSignatureOrder @relay(mask: false)
                }
              }
            }
          }
        }
      }
    `
  , {
    status: status || ('' as SignatureOrderStatus) // https://github.com/fsprojects/FSharp.Data.GraphQL/pull/346
  });

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Signature orders</th>
            <th scope="col">Title</th>
            <th scope="col">
              <select value={status || undefined} onChange={(event) => setStatus(event.target.value as SignatureOrderStatus)}>
                <option value="">Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.viewer.signatureOrders?.edges.map((edge, index) => (
            <tr key={edge.node.id}>
              <th scope="row" >#{index + 1}</th>
              <td>{edge.node.title}</td>
              <td>{edge.node.status}</td>
              <td className="d-flex justify-content-end">
                <Link className="btn btn-primary btn-sm" to={`/signatureorders/${edge.node.id}`}>
                  View signature order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="btn btn-primary" to="/signatureorders/create">
        Create signature order
      </Link>
    </div>
  )
}