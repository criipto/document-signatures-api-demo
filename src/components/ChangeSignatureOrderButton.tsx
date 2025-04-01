import React, { useState } from "react";

import { useFragment } from "react-relay";
import { graphql } from "react-relay";

import { ChangeSignatureOrderButton_signatureOrder$key } from "./__generated__/ChangeSignatureOrderButton_signatureOrder.graphql";
import ChangeSignatureOrderModal from "./ChangeSignatureOrderModal";

interface Props {
  signatureOrder: ChangeSignatureOrderButton_signatureOrder$key;
}

export default function ChangeSignatoryButton(props: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signatureOrder = useFragment(
    graphql`
      fragment ChangeSignatureOrderButton_signatureOrder on SignatureOrder {
        id
        status

        maxSignatories

        ...ChangeSignatureOrderModal_signatureOrder
      }
    `,
    props.signatureOrder
  );

  if (signatureOrder.status !== "OPEN") return null;

  return (
    <React.Fragment>
      <button className="btn btn-secondary" onClick={handleShow}>
        Change signature order
      </button>
      <ChangeSignatureOrderModal
        show={show}
        signatureOrder={signatureOrder}
        onHide={handleClose}
      />
    </React.Fragment>
  );
}
