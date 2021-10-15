import React, {useState} from 'react';
import graphql from 'babel-plugin-relay/macro';

import { useHistory, useParams } from 'react-router-dom';

import useMutation from '../hooks/useMutation';
import { CreateSignatureWorkflowScreenMutation, WorkflowParticipantInput } from './__generated__/CreateSignatureWorkflowScreenMutation.graphql';

export default function CreateSignatureWorkflowScreen() {
  const params = useParams<{signatureOrderId: string}>();
  const history = useHistory();
  const [participants, setParticipants] = useState<WorkflowParticipantInput[]>([]);

  const [executor, status] = useMutation<CreateSignatureWorkflowScreenMutation>(
    graphql`
      mutation CreateSignatureWorkflowScreenMutation($input: CreateSignatureWorkflowInput!) {
        createSignatureWorkflow(input: $input) {
          signatureWorkflow {
            id
          }
        }
      }
    `
  );

  const handleChangeParticipant = (participant : WorkflowParticipantInput, key : keyof WorkflowParticipantInput, value : string) => {
    setParticipants(participants => {
      return participants.map(search => {
        if (search === participant) {
          return {
            ...search,
            [key]: value
          };
        }
        return search;
      });
    })
  };

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    if (status.pending) return;

    executor.executePromise({
      input: {
        signatureOrderId: params.signatureOrderId,
        participants
      }
    })
    .then((response) => {
      history.push(`/signatureworkflows/${response.createSignatureWorkflow?.signatureWorkflow.id}`);
    })
    .catch(console.error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Participants</h4>
      {participants.length ? (
        <div className="row">
          {participants.map((participant, index) => (
            <div className="col-4" key={index}>
              <div className="mb-3 form-floating">
                <input
                  className="form-control"
                  type="text"
                  onChange={(event) => handleChangeParticipant(participant, 'reference', event.target.value)}
                  value={participant.reference}
                  placeholder="Participant reference"
                  required
                />
                <label className="form-label">Participant reference</label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <button type="button" className="btn btn-secondary" onClick={() => setParticipants(participants => participants.concat({reference: ''}))}>Add participant</button>
      </div>

      <button type="submit" className="btn btn-primary" disabled={status.pending}>Create signature workflow</button>
    </form>
  );
}