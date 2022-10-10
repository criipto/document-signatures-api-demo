import React, { useCallback, useState, useMemo } from "react";

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignatoryDocumentInput_signatureOrder$key} from './__generated__/SignatoryDocumentInput_signatureOrder.graphql';

import './SignatoryDocumentInput.css';
import { SignatoryDocumentInput } from "../screens/__generated__/CreateSignatureOrderScreenMutation.graphql";


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
  const {item, onChange} = props;
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

  const documents = useMemo(() => item.documents || [], [item.documents]);

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

  const handleSealPosition = useCallback((document: SignatoryDocumentInput, pdfSealPosition: SignatoryDocumentInput["pdfSealPosition"]) => {
    onChange(
      documents!.map(search => {
        if (search.id === document.id) {
          return {
            ...document,
            pdfSealPosition
          }
        }
        return search;
      })
    );
  }, [onChange, documents]);

  return (
    <ul className="signatory-input-document">
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
          <SealPosition
            pdfSealPosition={documents.find(s => s.id === document.id)?.pdfSealPosition ?? null}
            onChange={pos => handleSealPosition(document, pos)}
          />
        </li>
      ))}
    </ul>
  )
}

type SealPositionProps = {
  pdfSealPosition: SignatoryDocumentInput["pdfSealPosition"],
  onChange: (pdfSealPosition: SignatoryDocumentInput["pdfSealPosition"]) => void
}
function SealPosition(props: SealPositionProps) {
  const {onChange, pdfSealPosition} = props;
  const [input, setInput] = useState<Partial<NonNullable<SignatoryDocumentInput["pdfSealPosition"]>>>({
    page: pdfSealPosition?.page ?? undefined,
    x: pdfSealPosition?.x ?? undefined,
    y: pdfSealPosition?.y ?? undefined
  });

  const handleChange = (key: keyof NonNullable<SignatoryDocumentInput["pdfSealPosition"]>, value: number | undefined) => {
    let inputChange = {
      ...input,
      [key]: value
    };

    setInput(inputChange);
    if (inputChange.page && inputChange.x && inputChange.y) {
      onChange(inputChange as NonNullable<SignatoryDocumentInput["pdfSealPosition"]>);
    } else {
      onChange(null);
    }
  }

  return (
    <div className="d-flex">
      <input
        className="form-control"
        type="number"
        onChange={(event) => handleChange('page', event.target.value ? parseInt(event.target.value, 10) : undefined)}
        value={input.page ?? ""}
        placeholder="Page"
        style={{width: '75px', padding: '2px 4px'}}
      />
      <input
        className="form-control"
        type="number"
        onChange={(event) => handleChange('x', event.target.value ? parseInt(event.target.value, 10) : undefined)}
        value={input.x ?? ""}
        placeholder="X"
        style={{width: '50px', padding: '2px 4px'}}
      />
      <input
        className="form-control"
        type="number"
        onChange={(event) => handleChange('y', event.target.value ? parseInt(event.target.value, 10) : undefined)}
        value={input.y ?? ""}
        placeholder="Y"
        style={{width: '50px', padding: '2px 4px'}}
      />
    </div>
  );
}