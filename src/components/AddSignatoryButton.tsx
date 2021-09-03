import React from 'react';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {AddSignatoryButton_signatureOrder$key} from './__generated__/AddSignatoryButton_signatureOrder.graphql';
import {AddSignatoryButtonMutation} from './__generated__/AddSignatoryButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: AddSignatoryButton_signatureOrder$key
}

export default function AddSignatoryButton(props : Props) {
  const data = useFragment(
    graphql`
      fragment AddSignatoryButton_signatureOrder on SignatureOrder {
        id
        status

        openSignatory {
          id
        }
      }
    `
  , props.signatureOrder);

  const [executor, status] = useMutation<AddSignatoryButtonMutation>(
    graphql`
      mutation AddSignatoryButtonMutation($input: AddSignatoryInput!) {
        addSignatory(input: $input) {
          signatureOrder {
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

  const handleClick = () => {
    executor.executePromise({
      input: {
        signatureOrderId: data.id
      }
    }).catch(console.error);
  };

  return (
    <button className="btn btn-secondary" disabled={status.pending} onClick={handleClick}>
      Add signatory
    </button>
  )
}