import React, {useState} from 'react';

import { useFragment } from 'react-relay';
import { graphql } from "react-relay";

import {ChangeSignatoryButton_signatureOrder$key} from './__generated__/ChangeSignatoryButton_signatureOrder.graphql';
import {ChangeSignatoryButton_signatory$key} from './__generated__/ChangeSignatoryButton_signatory.graphql';
import SignatoryModal from './SignatoryModal';

interface Props {
  signatureOrder: ChangeSignatoryButton_signatureOrder$key
  signatory: ChangeSignatoryButton_signatory$key
}

export default function ChangeSignatoryButton(props : Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signatureOrder = useFragment(
    graphql`
      fragment ChangeSignatoryButton_signatureOrder on SignatureOrder {
        id
        status

        ... SignatoryModal_signatureOrder
      }
    `
  , props.signatureOrder);

  const signatory = useFragment(
    graphql`
      fragment ChangeSignatoryButton_signatory on Signatory {
        id
        status

        ... SignatoryModal_signatory
      }
    `
  , props.signatory)

  if (signatureOrder.status !== 'OPEN') return null;
  if (signatory.status !== 'OPEN') return null;

  return (
    <React.Fragment>
      <button className="btn btn-secondary btn-sm" onClick={handleShow}>
        Change signatory
      </button>
      <SignatoryModal show={show} signatureOrder={signatureOrder} signatory={signatory} onHide={handleClose} />
    </React.Fragment>
  )
}