import React from 'react';

import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { Link } from 'react-router-dom';

import {SignatureOrdersScreenQuery} from './__generated__/SignatureOrdersScreenQuery.graphql';

export default function SignatureOrdersScreen() {
  const data = useLazyLoadQuery<SignatureOrdersScreenQuery>(
    graphql`
      query SignatureOrdersScreenQuery {
        viewer {
          ... on Application {
            signatureOrders {
              edges {
                node {
                  id
                  status
                }
              }
            }
          }
        }
      }
    `
  , {});

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Signature orders</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.viewer.signatureOrders?.edges.map((edge, index) => (
            <tr key={edge.node.id}>
              <th scope="row" >#{index + 1}</th>
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