import React from 'react';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {CancelSignatureOrderButtonQuery_signatureOrder$key} from './__generated__/CancelSignatureOrderButtonQuery_signatureOrder.graphql';
import {CancelSignatureOrderButtonMutation} from './__generated__/CancelSignatureOrderButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: CancelSignatureOrderButtonQuery_signatureOrder$key
}

export default function CancelSignatureOrderButton(props : Props) {
  const data = useFragment(
    graphql`
      fragment CancelSignatureOrderButtonQuery_signatureOrder on SignatureOrder {
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