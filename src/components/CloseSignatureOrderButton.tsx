import React, { useState } from 'react';

import { useFragment } from 'react-relay';
import { Modal } from 'react-bootstrap';

import graphql from 'babel-plugin-relay/macro';

import {CloseSignatureOrderButton_signatureOrder$key} from './__generated__/CloseSignatureOrderButton_signatureOrder.graphql';
import {CloseSignatureOrderButtonMutation, CloseSignatureOrderInput} from './__generated__/CloseSignatureOrderButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: CloseSignatureOrderButton_signatureOrder$key,
  className?: string
}

export default function CloseSignatureOrderButton(props : Props) {
  const [showModal, setModal] = useState(false);

  const data = useFragment(
    graphql`
      fragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {
        id
        status
      }
    `
  , props.signatureOrder);

  const [input, setInput] = useState<CloseSignatureOrderInput>({
    signatureOrderId: data.id,
    retainDocumentsForDays: null
  });

  const [executor, status] = useMutation<CloseSignatureOrderButtonMutation>(
    graphql`
      mutation CloseSignatureOrderButtonMutation($input: CloseSignatureOrderInput!) {
        closeSignatureOrder(input: $input) {
          signatureOrder {
            status

            documents {
              blob
            }

            signatories {
              ...SignatureOrderScreenSignatory @relay(mask: false)
            }
          }
        }
      }
    `
  );

  if (data.status !== 'OPEN') return null;

  const handleClick = () => {
    executor.executePromise({
      input
    }).then(() => {
      setModal(false);
    }).catch(console.error.bind(console));
  };

  return (
    <React.Fragment>
      <button className={`btn btn-success ${props.className}`} disabled={status.pending} onClick={() => setModal(true)}>
        Close signature order
      </button>
      <Modal
        show={showModal}
        onHide={() => setModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Close signature order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="number"
              max={7}
              min={1}
              onChange={(event) => setInput(input => ({...input, retainDocumentsForDays: parseInt(event.target.value, 10) || null}))}
              value={input.retainDocumentsForDays || ""}
              placeholder="Retain documents for days"
              required
            />
            <label className="form-label">Retain documents for days</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={status.pending} onClick={handleClick}>
            Close signature order
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}