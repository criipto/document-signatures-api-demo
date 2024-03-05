import React, {useState} from 'react';

import { useFragment } from 'react-relay';
import { graphql } from "react-relay";

import {SignActingAsButton_signatureOrder$key} from './__generated__/SignActingAsButton_signatureOrder.graphql';
import {SignActingAsButton_signatory$key} from './__generated__/SignActingAsButton_signatory.graphql';
import SignActingAsModal from './SignActingAsModal';

interface Props {
  signatureOrder: SignActingAsButton_signatureOrder$key
  signatory: SignActingAsButton_signatory$key
}

export default function SignActingAsButton(props : Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signatureOrder = useFragment(
    graphql`
      fragment SignActingAsButton_signatureOrder on SignatureOrder {
        id
        status
        ...SignActingAsModal_signatureOrder
      }
    `
  , props.signatureOrder);

  const signatory = useFragment(
    graphql`
      fragment SignActingAsButton_signatory on Signatory {
        id
        status

        documents {
          edges {
            status
          }
        }

        ...SignActingAsModal_signatory
      }
    `
  , props.signatory)

  if (signatureOrder.status !== 'OPEN') return null;
  if (signatory.status !== 'OPEN') return null;

  const allPreapproved = signatory.documents.edges.every(e => e.status === 'PREAPPROVED');
  if (!allPreapproved) return null;

  return (
    <React.Fragment>
      <button className="btn btn-secondary btn-sm" onClick={handleShow}>
        Sign acting as
      </button>
      <SignActingAsModal show={show} signatureOrder={signatureOrder} signatory={signatory} onHide={handleClose} />
    </React.Fragment>
  )
}