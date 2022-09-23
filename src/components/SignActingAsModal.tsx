import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';

import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import {SignActingAsModal_signatureOrder$key, SignActingAsModal_signatureOrder} from './__generated__/SignActingAsModal_signatureOrder.graphql';
import {SignActingAsModal_signatory$key} from './__generated__/SignActingAsModal_signatory.graphql';

import useMutation from '../hooks/useMutation';
import { SignActingAsModalMutation, SignDrawableInput } from './__generated__/SignActingAsModalMutation.graphql';

interface Props {
  signatureOrder: SignActingAsModal_signatureOrder$key
  signatory: SignActingAsModal_signatory$key
  onHide: () => void,
  show: boolean
}

export default function SignActingAsModal(props : Props) {
  const [evidenceProvider, setEvidenceProvider] = useState<SignActingAsModal_signatureOrder["evidenceProviders"][0] | undefined>(undefined);
  const [drawableInput, setDrawableInput] = useState<Partial<SignDrawableInput>>({
    name: undefined,
    image: undefined
  });

  const signatureOrder = useFragment(
    graphql`
      fragment SignActingAsModal_signatureOrder on SignatureOrder {
        id
        status

        evidenceProviders {
          __typename
          ... on DrawableSignatureEvidenceProvider {
            id
            requireName
          }
          ... on OidcJWTSignatureEvidenceProvider {
            id
          }
          ... on CriiptoVerifySignatureEvidenceProvider {
            id
          }
        }
      }
    `
  , props.signatureOrder);

  const signatory = useFragment(
    graphql`
      fragment SignActingAsModal_signatory on Signatory {
        id
        status

        documents {
          edges {
            status
          }
        }
      }
    `
  , props.signatory)

  const [executor, status] = useMutation<SignActingAsModalMutation>(
      graphql`
        mutation SignActingAsModalMutation($input: SignActingAsInput!) {
          signActingAs(input: $input) {
            signatureOrder {
              ...SignActingAsModal_signatureOrder
              signatories {
                ...SignatureOrderScreenSignatory @relay(mask: false)
              }
            }
          }
        }
      `
  );

  if (signatureOrder.status !== 'OPEN') return null;
  if (signatory.status !== 'OPEN') return null;

  const allPreapproved = signatory.documents.edges.every(e => e.status === 'PREAPPROVED');
  if (!allPreapproved) return null;


  const handleSubmit = () => {
    if (!evidenceProvider) return;
    if (!drawableInput) return;

    executor.executePromise({
      input: {
        signatoryId: signatory.id,
        evidence: {
          id: (evidenceProvider as any).id,
          drawable: {
            name: drawableInput.name,
            image: drawableInput.image!
          }
        }
      }
    }).then(() => {
      props.onHide();
    }).catch(console.error);
  };

  const handleDrawableImage = async (event : React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = Array.from(event.target.files!);
    if (!files.length) {
      setDrawableInput(drawable => ({...drawable, image: ''}));
      return;
    }

    const file = files[0];
    const data = await toBase64(file);
    setDrawableInput(drawable => ({...drawable, image: data}));
  }

  const disabled = status.pending || !evidenceProvider || (evidenceProvider.__typename === "DrawableSignatureEvidenceProvider" && !drawableInput.image);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign acting as signatory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          className="form-control mb-3"
          onChange={(event) => setEvidenceProvider(event.target.value ? signatureOrder.evidenceProviders.find(s => (s as any).id === event.target.value) : undefined)}
          value={(evidenceProvider as any)?.id ?? ""}
        >
          <option value="">Select evidence provider</option>
          {signatureOrder.evidenceProviders.map(evidenceProvider => (
            <option key={(evidenceProvider as any).id} value={(evidenceProvider as any).id}>{evidenceProvider.__typename}</option>
          ))}
        </select>

        {evidenceProvider?.__typename === 'DrawableSignatureEvidenceProvider' ? (
          <React.Fragment>
            <div className="mb-3 form-floating">
              <input
                className="form-control"
                type="text"
                onChange={(event) => setDrawableInput(drawable => ({...drawable, name: event.target.value}))}
                value={drawableInput.name ?? ''}
                placeholder="Name"
                required
              />
              <label className="form-label">Name</label>
            </div>
            <div className="mb-3">
              <label htmlFor="drawable_file_select" className="form-label"><strong>Upload image</strong></label>
              <input
                className="form-control"
                type="file"
                id="drawable_file_select"
                onChange={event => handleDrawableImage(event)}
                accept=".png,.jpg"
              />
            </div>
          </React.Fragment>
        ) : null}

        {status.error ? (
          <p className="alert alert-danger">
            {status.error.message}
          </p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.onHide}>
          Cancel
        </button>
        <button className="btn btn-primary"  disabled={disabled} onClick={handleSubmit}>
          Sign
        </button>
      </Modal.Footer>
    </Modal>
  )
}

const toBase64 = (file : File) : Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    let result : string = reader.result as string;
    result = result.replace(/^data:(.+);base64,/, '');
    resolve(result);
  };
  reader.onerror = error => reject(error);
});
