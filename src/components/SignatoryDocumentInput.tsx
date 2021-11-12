import React from "react";

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignatoryDocumentInput_signatureOrder$key} from './__generated__/SignatoryDocumentInput_signatureOrder.graphql'

type SignatoryDocumentInput = {
  id: string;
  preapproved?: boolean | null;
};

interface HasSignatoryDocumentInput {
  documents?: Array<SignatoryDocumentInput> | null;
}

interface Props<T> {
  id: string,
  signatureOrder: SignatoryDocumentInput_signatureOrder$key,
  item: T,
  onChange: (list: Array<SignatoryDocumentInput>) => void
}

export default function SignatoryDocumentInputComponent<T extends HasSignatoryDocumentInput>(props: Props<T>) {
  const {item} = props;
  const signatureOrder = useFragment(
    graphql`
      fragment SignatoryDocumentInput_signatureOrder on SignatureOrder {
        documents {
          id
          title
        }
      }
    `
  , props.signatureOrder);

  const documents = item.documents || [];

  const handleDocumentSelected = (document: SignatoryDocumentInput, event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    props.onChange(
      documents!
        .filter(s => checked || document.id !== s.id)
        .concat(checked ? [document] : [])
    );
  }

  const handleDocumentApproval = (document: SignatoryDocumentInput, event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    props.onChange(
      documents!.map(search => {
        if (search.id === document.id) {
          return {
            ...document,
            preapproved: checked
          }
        }
        return search;
      })
    )
  }

  return (
    <ul>
      {signatureOrder?.documents.map(document => (
        <li key={document.id}>
          {document.title}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`${props.id}_document_${document.id}_include`}
              checked={!!documents.find(s => s.id === document.id)}
              onChange={(event) => handleDocumentSelected(document, event)}
            />
            <label className="form-check-label" htmlFor={`${props.id}_document_${document.id}_include`}>
              Include
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`${props.id}_document_${document.id}_preapprove`}
              checked={documents.find(s => s.id === document.id)?.preapproved || false}
              onChange={(event) => handleDocumentApproval(document, event)}
            />
            <label className="form-check-label" htmlFor={`${props.id}_document_${document.id}_preapprove`}>
              Preapprove
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}