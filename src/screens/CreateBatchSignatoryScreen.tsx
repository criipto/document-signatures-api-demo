import React, {useState} from 'react';

import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay";
import { CreateBatchSignatoryScreenQuery } from './__generated__/CreateBatchSignatoryScreenQuery.graphql';
import useMutationExtra from '../hooks/useMutation';
import { BatchSignatoryItemInput, SignatoryUIInput, CreateBatchSignatoryScreenMutation } from './__generated__/CreateBatchSignatoryScreenMutation.graphql';
import UIInputFields from '../components/UIInputFields';
import { useHistory } from 'react-router-dom';


export default function CreateBatchSignatoryScreen() {
  const history = useHistory();
  const data = useLazyLoadQuery<CreateBatchSignatoryScreenQuery>(
    graphql`
      query CreateBatchSignatoryScreenQuery {
        viewer {
          __typename
          ... on Application {
            id
            signatureOrders(status: OPEN) {
              edges {
                node {
                  id
                  title
                  signatories {
                    id
                    reference
                    status
                  }
                }
              }
            }
          }
        }

        timezones
      }
    `,
    {}
  );

  const [executor, status] = useMutationExtra<CreateBatchSignatoryScreenMutation>(
    graphql`
      mutation CreateBatchSignatoryScreenMutation($input: CreateBatchSignatoryInput!) {
        createBatchSignatory(input: $input) {
          batchSignatory {
            id
          }
        }
      }
    `
  );
  const [items, setItems] = useState<BatchSignatoryItemInput[]>([]);
  const [ui, setUI] = useState<SignatoryUIInput>({});

  if (data.viewer.__typename !== 'Application') {
    return null;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (status.pending) return;

    executor.executePromise({
      input: {
        items,
        ui: {
          ...ui,
          stylesheet: ui.stylesheet || null,
          logo: ui.logo?.src ? ui.logo : null
        },
      }
    })
    .then((response) => {
      history.push(`/batchsignatories/${response.createBatchSignatory?.batchSignatory.id}`);
    })
    .catch(console.error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Signatories</h4>
      {data.viewer.signatureOrders.edges.filter(edge => edge.node.signatories.length > 0).map(({node: so}) => (
        <div className="mb-3 form-floating" key={so.id}>
          <h5>{so.title}</h5>
          {so.signatories.map(s => (
            <div className="form-check mb-3" key={s.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`checkbox_${s.id}`}
                checked={items.find(f => f.signatoryId === s.id && f.signatureOrderId === so.id) !== undefined}
                onChange={event => {
                  const checked = event.target.checked;
                  setItems(items => {
                    if (checked) {
                      return items.concat({
                        signatureOrderId: so.id,
                        signatoryId: s.id
                      })
                    }
                    return items.filter(f => f.signatoryId !== s.id && f.signatureOrderId !== so.id)
                  })
                }}
              />
              <label className="form-check-label" htmlFor={`checkbox_${s.id}`}>
                {s.reference ?? s.id}
              </label>
            </div>
          ))}
        </div>
      ))}
      <h4>UI Settings</h4>
      <div className="row">
        <UIInputFields
          fieldWrapperClassName="col-4"
          ui={ui}
          onChange={setUI}
        />
      </div>
      {status.error && (
        <div className="alert alert-danger">
          {status.error.message}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={status.pending}>Create batch signatory</button>
    </form>
  );
}