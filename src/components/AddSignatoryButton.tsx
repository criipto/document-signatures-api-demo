import React, {useState} from 'react';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {AddSignatoryButton_signatureOrder$key} from './__generated__/AddSignatoryButton_signatureOrder.graphql';
import SignatoryModal from './SignatoryModal';

interface Props {
  signatureOrder: AddSignatoryButton_signatureOrder$key
}

export default function AddSignatoryButton(props : Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = useFragment(
    graphql`
      fragment AddSignatoryButton_signatureOrder on SignatureOrder {
        id
        status

        ... SignatoryModal_signatureOrder
      }
    `
  , props.signatureOrder);

  if (data.status !== 'OPEN') return null;

  return (
    <React.Fragment>
      <button className="btn btn-secondary" onClick={handleShow}>
        Add signatory
      </button>
      <SignatoryModal show={show} signatureOrder={data} onHide={handleClose} />
    </React.Fragment>
  )
}