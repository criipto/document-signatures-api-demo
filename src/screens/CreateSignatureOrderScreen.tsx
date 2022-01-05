import React, {useState} from 'react';

import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { useHistory } from 'react-router-dom';

import {CreateSignatureOrderScreenMutation, DocumentInput, SignatoryEvidenceValidationInput, CreateSignatureOrderUIInput, CreateSignatureOrderSignatoryInput} from './__generated__/CreateSignatureOrderScreenMutation.graphql';
import {CreateSignatureOrderScreenQuery} from './__generated__/CreateSignatureOrderScreenQuery.graphql';
import EvidenceValidationInput, { filterEvidenceValidation } from '../components/EvidenceValidationInput';

import useMutation from '../hooks/useMutation';

const toBase64 = (file : File) : Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    let result : string = reader.result as string;
    result = result.replace('data:application/pdf;base64,', '')
    resolve(result);
  };
  reader.onerror = error => reject(error);
});

type LocalDocumentInput = DocumentInput & {
  fileName: string
}

export default function CreateSignatureOrderScreen() {
  const [title, setTitle] = useState<string | null>(null);
  const [maxSignatories, setMaxSignatories] = useState(14);
  const [documents, setDocuments] = useState<LocalDocumentInput[]>([]);
  const [ui, setUI] = useState<CreateSignatureOrderUIInput>({});
  const [webhook, setWebhook] = useState('');
  const [signatories, setSignatories] = useState<CreateSignatureOrderSignatoryInput[]>([]);
  const [disableVerifyEvidenceProvider, setDisableVerifyEvidenceProvider] = useState(false);
  const history = useHistory();

  const data = useLazyLoadQuery<CreateSignatureOrderScreenQuery>(
    graphql`
      query CreateSignatureOrderScreenQuery {
        viewer {
          __typename
          ... on Application {
            id
          }
        }
      }
    `,
    {}
  );

  const application = data.viewer;

  const handleAddDocument = async (event : React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    for (const file of Array.from(event.target.files!)) {
      const data = await toBase64(file);
      setDocuments(documents => documents.concat([
        {
          fileName: file.name,
          pdf: {
            title: file.name, blob: data, storageMode: 'Temporary'
          }
        }
      ]));
    }
    event.target.value = '';
  };

  const handleChangeDocument = (document : LocalDocumentInput, key : string, value : string) => {
    setDocuments(documents => {
      return documents.map(search => {
        if (search === document) {
          return {
            ...search,
            pdf: {
              ...search.pdf,
              [key]: value
            }
          };
        }
        return search;
      });
    })
  };

  const handleUI = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: keyof CreateSignatureOrderUIInput) => {
    setUI(ui => ({
      ...ui,
      [key]: event.target.value
    }));
  }

  const formValid = documents?.length;

  const [executor, status] = useMutation<CreateSignatureOrderScreenMutation>(
    graphql`
      mutation CreateSignatureOrderScreenMutation($input: CreateSignatureOrderInput!) {
        createSignatureOrder(input: $input) {
          signatureOrder {
            id
          }

          application {
            signatureOrders(status: OPEN) {
              edges {
                node {
                  ... SignatureOrdersScreenSignatureOrder @relay(mask: false)
                }
              }
            }
          }
        }
      }
    `
  );

  if (application.__typename !== 'Application') return null;

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    if (!formValid) return;
    if (status.pending) return;

    executor.executePromise({
      input: {
        title,
        disableVerifyEvidenceProvider,
        maxSignatories,
        signatories: signatories.map(signatory => {
          return {
            ...signatory,
            evidenceValidation: filterEvidenceValidation(signatory.evidenceValidation)
          }
        }),
        documents,
        ui,
        webhook: webhook ? {url: webhook} : null
      }
    })
    .then((response) => {
      history.push(`/signatureorders/${response.createSignatureOrder?.signatureOrder.id}`);
    })
    .catch(console.error)
  }

  const handleChangeSignatory = (signatory : CreateSignatureOrderSignatoryInput, key : keyof CreateSignatureOrderSignatoryInput, value : string) => {
    setSignatories(signatories => {
      return signatories.map(search => {
        if (search === signatory) {
          return {
            ...search,
            [key]: value
          };
        }
        return search;
      });
    })
  };

  const addSignatory = () => {
    setSignatories(signatories => signatories.concat({
      reference: '',
    }))
  }

  const handleEvidenceValidation = (participant: CreateSignatureOrderSignatoryInput, evidenceValidation: SignatoryEvidenceValidationInput[]) => {
    setSignatories(signatories => {
      return signatories.map(existing => {
        if (existing === participant) {
          return {
            ...participant,
            evidenceValidation
          };
        }
        return existing;
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Settings</h4>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title || ''}
          placeholder="Signature order title"
        />
        <label className="form-label">Signature order title</label>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              id="disableVerifyEvidenceProvider" type="checkbox"
              checked={!disableVerifyEvidenceProvider}
              onChange={(event) => setDisableVerifyEvidenceProvider(!event.target.checked)}
            />
            <label className="form-check-label" htmlFor="disableVerifyEvidenceProvider" >
              Include Criipto Verify as an evidence provider
            </label>
          </div>
        </div>
        <div className="col-sm">
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="number"
              onChange={(event) => setMaxSignatories(parseInt(event.target.value, 10) || 14)}
              value={maxSignatories || 14}
              placeholder="Max signatories"
              required
            />
            <label className="form-label">Max signatories</label>
            <small className="form-text text-muted">Helps determine how many blank pages need to be added for signatures.</small>
          </div>
        </div>
        <div className="col-sm">
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="text"
              onChange={(event) => setWebhook(event.target.value)}
              value={webhook || ''}
              placeholder="Webhook URI"
            />
            <label className="form-label">Webhook URI</label>
            <small className="form-text text-muted">You can use https://webhook.site/ for testing</small>
          </div>
        </div>
        <div className="col-sm" />
      </div>
      <h4>UI Settings</h4>
      <div className="row">
        <div className="col-4">
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="text"
              onChange={(event) => handleUI(event, 'signatoryRedirectUri')}
              value={ui.signatoryRedirectUri || ''}
              placeholder="Signatory redirect URI"
            />
            <label className="form-label">Signatory redirect URI</label>
          </div>
        </div>
        <div className="col-4">
          <div className="mb-3 form-floating">
            <select
              className="form-control"
              onChange={(event) => handleUI(event, 'language')}
              value={ui.language || 'EN_US'}
              placeholder="Language"
            >
              <option value="EN_US">EN_US</option>
              <option value="DA_DK">DA_DK</option>
            </select>
            <label className="form-label">Language</label>
          </div>
        </div>
      </div>
      <h4>Documents</h4>
      {documents.length ? (
        <div className="row">
          {documents.map((document, index) => (
            <div className="col-4" key={index}>
              {document.fileName}
              <div className="mb-3 form-floating">
                <input
                  className="form-control"
                  type="text"
                  onChange={(event) => handleChangeDocument(document, 'title', event.target.value)}
                  value={document.pdf.title}
                  placeholder="Document title"
                  required
                />
                <label className="form-label">Document title</label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <label htmlFor="pdf_file_select" className="form-label">Add document</label>
        <input className="form-control" type="file" id="pdf_file_select" multiple onChange={handleAddDocument} />
      </div>
      <h4>Signatories</h4>
      {signatories.length ? (
        <div className="row">
          {signatories.map((signatory, index) => (
            <div className="col-4 mb-3 p-3" key={index}>
              <div className="border rounded p-3">
                <strong>Signatory #{index + 1}</strong>
                <div className="mb-3 form-floating">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => handleChangeSignatory(signatory, 'reference', event.target.value)}
                    value={signatory.reference!}
                    placeholder="signatory reference"
                    required
                  />
                  <label className="form-label">Signatory reference</label>
                </div>
                <div><strong>Documents</strong></div>
                TODO
                <div><strong>Evidence Validation</strong></div>
                <EvidenceValidationInput item={signatory} onChange={(i) => handleEvidenceValidation(signatory, i)} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <button type="button" className="btn btn-secondary" onClick={addSignatory}>Add signatory</button>
      </div>
      {status.error && (
        <div className="alert alert-danger">
          {status.error.message}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={!formValid || status.pending}>Create signature order</button>
    </form>
  )
}