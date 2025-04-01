import React, { useCallback, useState } from "react";

import { useFragment } from "react-relay";
import { graphql } from "react-relay";

import { Modal } from "react-bootstrap";

import { ChangeSignatureOrderModal_signatureOrder$key } from "./__generated__/ChangeSignatureOrderModal_signatureOrder.graphql";

import useMutation from "../hooks/useMutation";
import {
  ChangeSignatureOrderInput,
  ChangeSignatureOrderModalMutation,
} from "./__generated__/ChangeSignatureOrderModalMutation.graphql";

interface Props {
  signatureOrder: ChangeSignatureOrderModal_signatureOrder$key;
  onHide: () => void;
  show: boolean;
}

export default function ChangeSignatureOrderModal(props: Props) {
  const data = useFragment(
    graphql`
      fragment ChangeSignatureOrderModal_signatureOrder on SignatureOrder {
        id
        status

        maxSignatories
      }
    `,
    props.signatureOrder
  );

  const [maxSignatories, setMaxSignatories] = useState<number | undefined>();

  const [signatureOrder, setSignatureOrder] =
    useState<ChangeSignatureOrderInput>({
      signatureOrderId: data.id,
      maxSignatories: maxSignatories,
    });

  const [executor, status] = useMutation<ChangeSignatureOrderModalMutation>(
    graphql`
      mutation ChangeSignatureOrderModalMutation(
        $input: ChangeSignatureOrderInput!
      ) {
        changeSignatureOrder(input: $input) {
          signatureOrder {
            ...ChangeSignatureOrderModal_signatureOrder
          }
        }
      }
    `
  );

  if (data.status !== "OPEN") return null;

  const handleSubmit = () => {
    const variables = {
      input: {
        ...signatureOrder,
        maxSignatories: maxSignatories,
      },
    } as { input: ChangeSignatureOrderInput };

    executor
      .executePromise(variables)
      .then(() => {
        props.onHide();

        setSignatureOrder({
          signatureOrderId: data.id,
          maxSignatories: data.maxSignatories,
        });
      })
      .catch(console.error);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Signature Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="number"
            onChange={(event) =>
              setMaxSignatories(parseInt(event.target.value, 10) || undefined)
            }
            value={maxSignatories}
            placeholder="max signatories"
          />
          <label className="form-label">Max signatories</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {status.error ? (
          <p className="alert alert-danger">{status.error.message}</p>
        ) : null}
        <button className="btn btn-secondary" onClick={props.onHide}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          disabled={status.pending}
          onClick={handleSubmit}
        >
          Update signature order
        </button>
      </Modal.Footer>
    </Modal>
  );
}
