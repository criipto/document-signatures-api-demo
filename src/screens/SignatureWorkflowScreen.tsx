import React, {useEffect, useState} from 'react';

import {Link, useParams} from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignatureWorkflowScreenQuery} from './__generated__/SignatureWorkflowScreenQuery.graphql';

const Query = graphql`
  query SignatureWorkflowScreenQuery($id: ID!) {
    signatureWorkflow(id: $id) {
      id

      signatureOrder {
        id
        status
        title
      }

      participants {
        id
        reference
        href

        signatory {
          status
        }
      }
    }
  }
`;

export default function SignatureWorkflowsScreen() {
  const [fetchKey, setFetchKey] = useState(Math.random().toString());
  const params = useParams<{signatureWorkflowId: string}>();
  const data = useLazyLoadQuery<SignatureWorkflowScreenQuery>(Query, {
    id: params.signatureWorkflowId
  }, {
    fetchKey,
    fetchPolicy: 'store-and-network'
  });

  useEffect(() => {
    if (data.signatureWorkflow?.signatureOrder.status !== "OPEN") return;
    /*
     * Rudimentary polling to detect if/when participants sign
     * Would probably be better as a GraphQL subscription
     * However real world API scenario would likely use API hooks so not worth the hassle
     */
    const interval = setInterval(() => {
      setFetchKey(Math.random().toString());
    }, 5000);

    return () => clearInterval(interval);
  }, [params.signatureWorkflowId, data.signatureWorkflow?.signatureOrder.status]);

  if (!params.signatureWorkflowId || !data.signatureWorkflow) return null;

  return (
    <div>
      Signature order: <Link to={`/signatureorders/${data.signatureWorkflow.signatureOrder.id}`}>{data.signatureWorkflow.signatureOrder.title}</Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Participants</th>
            <th scope="col">Reference</th>
            <th scope="col">Signatory</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.signatureWorkflow.participants.map((participant, index) => (
            <tr key={participant.id}>
              <th scope="row" >#{index + 1}</th>
              <td>{participant.reference}</td>
              <td>{participant.signatory?.status}</td>
              <td>
                <a href={participant.href}>Sign link (right click and copy link)</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}