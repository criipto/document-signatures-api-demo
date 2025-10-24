import React, { useCallback, useState, useMemo } from "react";

import { useFragment } from 'react-relay';
import { graphql } from "react-relay";

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

  const documents = useMemo(() => item.documents?.slice() || [], [item.documents]);

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

  const handleSealPositions = useCallback(
    (
      document: SignatoryDocumentInput,
      pdfSealPositions: SignatoryDocumentInput["pdfSealPositions"]
    ) => {
      onChange(
        documents!.map((search) => {
          if (search.id === document.id) {
            // API treats empty arrays as error - should be undefined/null instead
            const sealPositions =
              pdfSealPositions?.length
              ? pdfSealPositions
              : undefined
            return {
              ...document,
              pdfSealPositions: sealPositions,
            };
          }
          return search;
        })
      );
    },
    [onChange, documents]
  );

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
          <SealPositions
            pdfSealPositions={
              documents.find((s) => s.id === document.id)?.pdfSealPositions ??
              null
            }
            onChange={(pos) => handleSealPositions(document, pos)}
          />
        </li>
      ))}
    </ul>
  )
}

type PdfSealPosition = {
  page?: number;
  x?: number;
  y?: number;
};

type SealPositionsProps = {
  pdfSealPositions?: SignatoryDocumentInput["pdfSealPositions"] | null;
  onChange: (
    list: NonNullable<SignatoryDocumentInput["pdfSealPositions"]>
  ) => void;
};

function SealPositions(props: SealPositionsProps) {
  const list = props.pdfSealPositions || [];

  const handleChange = (
    pos: PdfSealPosition,
    key: keyof NonNullable<PdfSealPosition>,
    value: number | undefined
  ) => {
    props.onChange(
      list.map((p) => {
        if (p === pos) {
          return {
            ...p,
            [key]: value,
          };
        }
        return p;
      })
    );
  };

  const handleAdd = () => {
    props.onChange(list.concat([{ page: 0, x: 0, y: 0 }]));
  };

  const handleRemove = (pos: PdfSealPosition) => {
    props.onChange(list.filter((p) => p !== pos));
  };

  return (
    <React.Fragment>
      {list.map((pos, index) => (
        <div className="row" key={index}>
          <div className="col-3">
            <div className="mb-3 form-floating">
              <input
                className="form-control"
                type="number"
                onChange={(event) =>
                  handleChange(
                    pos,
                    "page",
                    event.target.value
                      ? parseInt(event.target.value, 10)
                      : undefined
                  )
                }
                value={pos.page || undefined}
                placeholder="Page"
              />
              <label className="form-label">Page</label>
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3 form-floating">
              <input
                className="form-control"
                type="number"
                onChange={(event) =>
                  handleChange(
                    pos,
                    "x",
                    event.target.value
                      ? parseInt(event.target.value, 10)
                      : undefined
                  )
                }
                value={pos.x || undefined}
                placeholder="X"
              />
              <label className="form-label">X</label>
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3 form-floating">
              <input
                className="form-control"
                type="number"
                onChange={(event) =>
                  handleChange(
                    pos,
                    "y",
                    event.target.value
                      ? parseInt(event.target.value, 10)
                      : undefined
                  )
                }
                value={pos.y || undefined}
                placeholder="Y"
              />
              <label className="form-label">Y</label>
            </div>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemove(pos)}
            >
              X
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary" onClick={handleAdd}>
        Add custom seal position
      </button>
    </React.Fragment>
  );
}