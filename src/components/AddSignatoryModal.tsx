import React, {useState} from 'react';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { Modal } from 'react-bootstrap';

import {AddSignatoryModal_signatureOrder$key} from './__generated__/AddSignatoryModal_signatureOrder.graphql';
import {AddSignatoryModalMutation, AddSignatoryInput, SignatoryDocumentInput, SignatoryEvidenceValidationInput} from './__generated__/AddSignatoryModalMutation.graphql';

import EvidenceValidationInput, { filterEvidenceValidation } from './EvidenceValidationInput';
import SignatoryDocumentInputComponent from './SignatoryDocumentInput';
import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: AddSignatoryModal_signatureOrder$key,
  onHide: () => void,
  show: boolean
}

export default function AddSignatoryModal(props : Props) {
  const data = useFragment(
    graphql`
      fragment AddSignatoryModal_signatureOrder on SignatureOrder {
        id
        status

        openSignatory {
          id
        }

        documents {
          id
        }

        ...SignatoryDocumentInput_signatureOrder
      }
    `
  , props.signatureOrder);
  
  const [signatory, setSignatory] = useState<AddSignatoryInput>({
    signatureOrderId: data.id,
    documents: data.documents.map(d => ({id: d.id}))
  });

  const [executor, status] = useMutation<AddSignatoryModalMutation>(
    graphql`
      mutation AddSignatoryModalMutation($input: AddSignatoryInput!) {
        addSignatory(input: $input) {
          signatureOrder {
            ...AddSignatoryModal_signatureOrder
            signatories {
              ...SignatureOrderScreenSignatory @relay(mask: false)
            }
          }
        }
      }
    `
  );

  if (data.status !== 'OPEN') return null;
  if (data.openSignatory !== null) return null;

  const handleSubmit = () => {
    executor.executePromise({
      input: {
        ...signatory,
        evidenceValidation: filterEvidenceValidation(signatory.evidenceValidation)
      }
    }).then(() => {
      props.onHide();
    }).catch(console.error);
  };

  const handleDocuments = (documents: SignatoryDocumentInput[]) => {
    setSignatory(signatory => ({
      ...signatory,
      documents
    }));
  }

  const handleEvidenceValidation = (evidenceValidation: SignatoryEvidenceValidationInput[]) => {
    setSignatory(signatory => ({
      ...signatory,
      evidenceValidation
    }));
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add signatory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div><strong>Documents</strong></div>
        <SignatoryDocumentInputComponent
          id={"addSignatory"}
          item={signatory}
          signatureOrder={data}
          onChange={(ds) => handleDocuments(ds)}
        />
        <div><strong>Evidence Validation</strong></div>
        <EvidenceValidationInput item={signatory} onChange={(i) => handleEvidenceValidation(i)} />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.onHide}>
          Cancel
        </button>
        <button className="btn btn-primary"  disabled={status.pending} onClick={handleSubmit}>Add signatory</button>
      </Modal.Footer>
    </Modal>
  )
}