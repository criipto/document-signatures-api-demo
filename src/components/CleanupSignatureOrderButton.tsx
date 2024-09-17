import React from 'react';

import { useFragment } from 'react-relay';
import { graphql } from "react-relay";

import {CleanupSignatureOrderButton_signatureOrder$key} from './__generated__/CleanupSignatureOrderButton_signatureOrder.graphql';
import {CleanupSignatureOrderButtonMutation} from './__generated__/CleanupSignatureOrderButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: CleanupSignatureOrderButton_signatureOrder$key
}

export default function CleanupSignatureOrderButton(props : Props) {
  const data = useFragment(
    graphql`
      fragment CleanupSignatureOrderButton_signatureOrder on SignatureOrder {
        id
        status
      }
    `
  , props.signatureOrder);

  const [executor, status] = useMutation<CleanupSignatureOrderButtonMutation>(
    graphql`
      mutation CleanupSignatureOrderButtonMutation($input: CleanupSignatureOrderInput!) {
        cleanupSignatureOrder(input: $input) {
          signatureOrder {
            status
          }
        }
      }
    `
  );

  if (data.status !== 'CLOSED') return null;

  const handleClick = () => {
    executor.executePromise({
      input: {
        signatureOrderId: data.id
      }
    }).catch(console.error);
  };

  return (
    <button className="btn btn-secondary" disabled={status.pending} onClick={handleClick}>
      Cleanup signature order
    </button>
  )
}