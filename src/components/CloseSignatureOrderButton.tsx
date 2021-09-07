import React from 'react';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {CloseSignatureOrderButton_signatureOrder$key} from './__generated__/CloseSignatureOrderButton_signatureOrder.graphql';
import {CloseSignatureOrderButtonMutation} from './__generated__/CloseSignatureOrderButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: CloseSignatureOrderButton_signatureOrder$key,
  className?: string
}

export default function CloseSignatureOrderButton(props : Props) {
  const data = useFragment(
    graphql`
      fragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {
        id
        status

        openSignatory {
          id
        }
      }
    `
  , props.signatureOrder);

  const [executor, status] = useMutation<CloseSignatureOrderButtonMutation>(
    graphql`
      mutation CloseSignatureOrderButtonMutation($input: CloseSignatureOrderInput!) {
        closeSignatureOrder(input: $input) {
          signatureOrder {
            status

            documents {
              blob
            }
          }
        }
      }
    `
  );

  if (data.status !== 'OPEN' || data.openSignatory) return null;

  const handleClick = () => {
    executor.executePromise({
      input: {
        signatureOrderId: data.id
      }
    }).catch(console.error.bind(console));
  };

  return (
    <button className={`btn btn-success ${props.className}`} disabled={status.pending} onClick={handleClick}>
      Close signature order
    </button>
  )
}