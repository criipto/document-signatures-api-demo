import React from 'react';

import { useFragment } from 'react-relay';
import { graphql } from "react-relay";

import {CancelSignatureOrderButton_signatureOrder$key} from './__generated__/CancelSignatureOrderButton_signatureOrder.graphql';
import {CancelSignatureOrderButtonMutation} from './__generated__/CancelSignatureOrderButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: CancelSignatureOrderButton_signatureOrder$key
}

export default function CancelSignatureOrderButton(props : Props) {
  const data = useFragment(
    graphql`
      fragment CancelSignatureOrderButton_signatureOrder on SignatureOrder {
        id
        status
      }
    `
  , props.signatureOrder);

  const [executor, status] = useMutation<CancelSignatureOrderButtonMutation>(
    graphql`
      mutation CancelSignatureOrderButtonMutation($input: CancelSignatureOrderInput!) {
        cancelSignatureOrder(input: $input) {
          signatureOrder {
            status
          }
        }
      }
    `
  );

  if (data.status !== 'OPEN') return null;

  const handleClick = () => {
    executor.executePromise({
      input: {
        signatureOrderId: data.id
      }
    }).catch(console.error);
  };

  return (
    <button className="btn btn-secondary" disabled={status.pending} onClick={handleClick}>
      Cancel signature order
    </button>
  )
}