import React from 'react';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {ExtendSignatureOrderButton_signatureOrder$key} from './__generated__/ExtendSignatureOrderButton_signatureOrder.graphql';
import {ExtendSignatureOrderButtonMutation} from './__generated__/ExtendSignatureOrderButtonMutation.graphql';

import useMutation from '../hooks/useMutation';

interface Props {
  signatureOrder: ExtendSignatureOrderButton_signatureOrder$key
}

export default function ExtendSignatureOrderButton(props : Props) {
  const data = useFragment(
    graphql`
      fragment ExtendSignatureOrderButton_signatureOrder on SignatureOrder {
        id
        status
      }
    `
  , props.signatureOrder);

  const [executor, status] = useMutation<ExtendSignatureOrderButtonMutation>(
    graphql`
      mutation ExtendSignatureOrderButtonMutation($input: ExtendSignatureOrderInput!) {
        extendSignatureOrder(input: $input) {
          signatureOrder {
            status
            expiresAt
          }
        }
      }
    `
  );

  if (data.status !== 'OPEN') return null;

  const handleClick = () => {
    executor.executePromise({
      input: {
        signatureOrderId: data.id,
        additionalExpirationInDays: 1
      }
    }).catch(console.error);
  };

  return (
    <button className="btn btn-secondary btn-sm" style={{marginLeft: '10px'}} disabled={status.pending} onClick={handleClick}>
      Extend signature order (1 day)
    </button>
  )
}