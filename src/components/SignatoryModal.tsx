import React, {useCallback, useState} from 'react';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { Modal } from 'react-bootstrap';

import {SignatoryModal_signatureOrder$key} from './__generated__/SignatoryModal_signatureOrder.graphql';
import {SignatoryModal_signatory$key} from './__generated__/SignatoryModal_signatory.graphql';
import {SignatoryModalAddMutation, AddSignatoryInput, SignatoryDocumentInput, SignatoryEvidenceValidationInput} from './__generated__/SignatoryModalAddMutation.graphql';
import {SignatoryModalChangeMutation, ChangeSignatoryInput} from './__generated__/SignatoryModalChangeMutation.graphql';

import EvidenceValidationInput, { filterEvidenceValidation } from './EvidenceValidationInput';
import SignatoryDocumentInputComponent from './SignatoryDocumentInput';
import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: SignatoryModal_signatureOrder$key,
  signatory?: SignatoryModal_signatory$key,
  onHide: () => void,
  show: boolean
}

export default function SignatoryModal(props : Props) {
  const data = useFragment(
    graphql`
      fragment SignatoryModal_signatureOrder on SignatureOrder {
        id
        status

        documents {
          id
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
          ... on CriiptoVerifySignatureEvidenceProvider {
            id
            name
            domain
            clientID
            acrValues
            message
          }
          ... on DrawableSignatureEvidenceProvider {
            id
            requireName
          }
        }

        ...SignatoryDocumentInput_signatureOrder
      }
    `
  , props.signatureOrder);

  const existingSignatory = useFragment(
    graphql`
      fragment SignatoryModal_signatory on Signatory {
        id
        status
        reference
        role

        evidenceProviders {
          __typename
          ... on OidcJWTSignatureEvidenceProvider {
            id
            name
            domain
            clientID
            acrValues
          }
          ... on CriiptoVerifySignatureEvidenceProvider {
            id
            name
            domain
            clientID
            acrValues
            message
          }
          ... on DrawableSignatureEvidenceProvider {
            id
            requireName
          }
        }

        documents {
          edges {
            status
            node {
              id
            }
          }
        }
      }
    `
  , props.signatory || null)
  
  const [signatory, setSignatory] = useState<AddSignatoryInput | ChangeSignatoryInput>({
    reference: existingSignatory?.reference || null,
    signatureOrderId: data.id,
    documents:
      existingSignatory ?
        existingSignatory.documents.edges.map(edge => ({id: edge.node.id, preapproved: edge.status === 'PREAPPROVED'})) :
        data.documents.map(d => ({id: d.id})),
    evidenceProviders: 
      existingSignatory ?
        existingSignatory.evidenceProviders.map(d => ({id: (d as any).id})) :
        data.evidenceProviders.map(d => ({id: (d as any).id}))
  });

  const [executor, status] = useMutation<SignatoryModalAddMutation | SignatoryModalChangeMutation>(
    existingSignatory ?
      graphql`
        mutation SignatoryModalChangeMutation($input: ChangeSignatoryInput!) {
          changeSignatory(input: $input) {
            signatory {
              ...SignatoryModal_signatory
            }
            signatureOrder {
              ...SignatoryModal_signatureOrder
              signatories {
                ...SignatureOrderScreenSignatory @relay(mask: false)
                ...SignatoryModal_signatory
              }
            }
          }
        }
      ` :
      graphql`
        mutation SignatoryModalAddMutation($input: AddSignatoryInput!) {
          addSignatory(input: $input) {
            signatureOrder {
              ...SignatoryModal_signatureOrder
              signatories {
                ...SignatureOrderScreenSignatory @relay(mask: false)
              }
            }
          }
        }
      `
  );

  const handleDocuments = useCallback((documents: SignatoryDocumentInput[]) => {
    setSignatory(signatory => ({
      ...signatory,
      documents
    }));
  }, []);

  if (data.status !== 'OPEN') return null;

  const handleSubmit = () => {
    const variables = 
      existingSignatory ?
        {
          input: {
            ...signatory,
            signatoryId: existingSignatory?.id
          }
        } as {input: ChangeSignatoryInput} :
        {
          input: {
            ...signatory,
            evidenceValidation: filterEvidenceValidation(signatory.evidenceValidation)
          }
        } as {input: AddSignatoryInput}

    executor.executePromise(variables).then(() => {
      props.onHide();

      if (!existingSignatory) {
        setSignatory({
          signatureOrderId: data.id,
          documents: data.documents.map(d => ({id: d.id}))
        });
      }
    }).catch(console.error);
  };;

  const handleEvidenceValidation = (evidenceValidation: SignatoryEvidenceValidationInput[]) => {
    setSignatory(signatory => ({
      ...signatory,
      evidenceValidation
    }));
  }

  const handleEvidenceProvider = (provider: any, checked: boolean) => {
    setSignatory(signatory => ({
      ...signatory,
      evidenceProviders: 
        checked ?
          (signatory.evidenceProviders || []).concat([{id: (provider as any).id}]) :
          (signatory.evidenceProviders || []).filter(s => s.id !== (provider as any).id)
    }));
  } 

  const handlePreapproveAll = () => {
    setSignatory(signatory => ({
      ...signatory,
      documents: signatory.documents?.map(d => ({
        ...d,
        preapproved: true
      }))
    }));
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add signatory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => setSignatory(signatory => ({...signatory, reference: event.target.value}))}
            value={signatory.reference ?? ''}
            placeholder="signatory reference"
            required
          />
          <label className="form-label">Signatory reference</label>
        </div>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => setSignatory(signatory => ({...signatory, role: event.target.value}))}
            value={signatory.role ?? ''}
            placeholder="signatory role"
            required
          />
          <label className="form-label">Signatory role</label>
        </div>
        <div><strong>Documents</strong></div>
        <SignatoryDocumentInputComponent
          id={"addSignatory"}
          item={signatory}
          signatureOrder={data}
          onChange={(ds) => handleDocuments(ds)}
        />
        <button className="btn btn-secondary mt-2" onClick={() => handlePreapproveAll()}>
          Preapprove all
        </button>
        <div><strong>Evidence Providers</strong></div>
        <ul>
          {data.evidenceProviders.map((provider, index) => (
            <li key={index}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`${index}_providers_enabled`}
                  checked={signatory.evidenceProviders?.find(s => s.id === (provider as any).id) !== undefined}
                  onChange={(event) => handleEvidenceProvider(provider, event.target.checked)}
                />
                <label className="form-check-label" htmlFor={`${index}_providers_enabled`}>
                  {provider.__typename}
                </label>
              </div>
            </li>
          ))}
        </ul>
        {!existingSignatory ? (
          <React.Fragment>
            <div><strong>Evidence Validation</strong></div>
            <EvidenceValidationInput item={signatory} onChange={(i) => handleEvidenceValidation(i)} />
          </React.Fragment>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        {status.error ? (
          <p className="alert alert-danger">
            {status.error.message}
          </p>
        ) : null}
        <button className="btn btn-secondary" onClick={props.onHide}>
          Cancel
        </button>
        <button className="btn btn-primary"  disabled={status.pending} onClick={handleSubmit}>
          {existingSignatory ? 'Update signatory' : 'Add signatory'}
        </button>
      </Modal.Footer>
    </Modal>
  )
}