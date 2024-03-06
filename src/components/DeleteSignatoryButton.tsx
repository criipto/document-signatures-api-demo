import React from 'react';

import { useFragment } from 'react-relay';
import { graphql } from "react-relay";

import {DeleteSignatoryButton_signatureOrder$key} from './__generated__/DeleteSignatoryButton_signatureOrder.graphql';
import {DeleteSignatoryButton_signatory$key} from './__generated__/DeleteSignatoryButton_signatory.graphql';
import {DeleteSignatoryButtonMutation} from './__generated__/DeleteSignatoryButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: DeleteSignatoryButton_signatureOrder$key,
  signatory: DeleteSignatoryButton_signatory$key
}

export default function DeleteSignatoryButton(props : Props) {
  const signatureOrder = useFragment(
    graphql`
      fragment DeleteSignatoryButton_signatureOrder on SignatureOrder {
        id
      }
    `
  , props.signatureOrder);
  const signatory = useFragment(
    graphql`
      fragment DeleteSignatoryButton_signatory on Signatory {
        id
        status
      }
    `
  , props.signatory);

  const [executor, status] = useMutation<DeleteSignatoryButtonMutation>(
    graphql`
      mutation DeleteSignatoryButtonMutation($input: DeleteSignatoryInput!) {
        deleteSignatory(input: $input) {
          signatureOrder {
            ...AddSignatoryButton_signatureOrder
            signatories {
              ...SignatureOrderScreenSignatory @relay(mask: false)
            }
          }
        }
      }
    `
  );

  if (signatory.status !== 'OPEN') return null;

  const handleClick = () => {
    if (!window.confirm('Are you sure you want to delete signatory?')) return;

    executor.executePromise({
      input: {
        signatureOrderId: signatureOrder.id,
        signatoryId: signatory.id
      }
    }).catch(console.error);
  };

  return (
    <button className="btn btn-danger btn-sm" disabled={status.pending} onClick={handleClick}>
      Delete signatory
    </button>
  )
}