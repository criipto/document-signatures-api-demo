import React, {useState} from 'react';
import graphql from 'babel-plugin-relay/macro';

import { useHistory, useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import useMutation from '../hooks/useMutation';
import { CreateSignatureWorkflowScreenMutation, WorkflowParticipantInput, SignatoryDocumentInput, SignatoryEvidenceValidationInput } from './__generated__/CreateSignatureWorkflowScreenMutation.graphql';
import { CreateSignatureWorkflowScreenQuery } from './__generated__/CreateSignatureWorkflowScreenQuery.graphql'
import EvidenceValidationInput, { filterEvidenceValidation } from '../components/EvidenceValidationInput';
import SignatoryDocumentInputComponent from '../components/SignatoryDocumentInput';

const Query = graphql`
  query CreateSignatureWorkflowScreenQuery($signatureOrderId: ID!) {
    signatureOrder(id: $signatureOrderId) {
      id
      documents {
        id
        title
      }
      ...SignatoryDocumentInput_signatureOrder
    }
  }
`;

export default function CreateSignatureWorkflowScreen() {
  const params = useParams<{signatureOrderId: string}>();
  const history = useHistory();
  const [participants, setParticipants] = useState<WorkflowParticipantInput[]>([]);
  const data = useLazyLoadQuery<CreateSignatureWorkflowScreenQuery>(Query, {
    signatureOrderId: params.signatureOrderId
  });

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
        signatureOrderId: data.signatureOrder?.id!,
        participants: participants.map(participant => {
          return {
            ...participant,
            evidenceValidation: filterEvidenceValidation(participant.evidenceValidation)
          }
        })
      }
    })
    .then((response) => {
      history.push(`/signatureworkflows/${response.createSignatureWorkflow?.signatureWorkflow.id}`);
    })
    .catch(console.error)
  }

  const addParticipant = () => {
    setParticipants(participants => participants.concat({
      reference: '',
      documents: data.signatureOrder!.documents.map(document => ({id: document.id, preapproved: false}))
    }))
  }

  const handleDocuments = (participant: WorkflowParticipantInput, documents: SignatoryDocumentInput[]) => {
    setParticipants(participants => {
      return participants.map(existing => {
        if (existing === participant) {
          return {
            ...participant,
            documents
          };
        }
        return existing;
      });
    });
  }

  const handleEvidenceValidation = (participant: WorkflowParticipantInput, evidenceValidation: SignatoryEvidenceValidationInput[]) => {
    setParticipants(participants => {
      return participants.map(existing => {
        if (existing === participant) {
          return {
            ...participant,
            evidenceValidation
          };
        }
        return existing;
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Participants</h4>
      {participants.length ? (
        <div className="row">
          {participants.map((participant, index) => (
            <div className="col-4 mb-3 p-3" key={index}>
              <div className="border rounded p-3">
                <strong>Participant #{index + 1}</strong>
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
                <div><strong>Documents</strong></div>
                <SignatoryDocumentInputComponent
                  id={index.toString()}
                  item={participant}
                  signatureOrder={data.signatureOrder!}
                  onChange={(ds) => handleDocuments(participant, ds)}
                />
                <div><strong>Evidence Validation</strong></div>
                <EvidenceValidationInput item={participant} onChange={(i) => handleEvidenceValidation(participant, i)} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <button type="button" className="btn btn-secondary" onClick={addParticipant}>Add participant</button>
      </div>

      <button type="submit" className="btn btn-primary" disabled={status.pending}>Create signature workflow</button>
    </form>
  );
}