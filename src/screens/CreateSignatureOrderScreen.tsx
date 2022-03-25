import React, {useState} from 'react';

import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { useHistory } from 'react-router-dom';

import {CreateSignatureOrderScreenMutation, DocumentInput, SignatoryEvidenceValidationInput, EvidenceProviderInput, CreateSignatureOrderUIInput, CreateSignatureOrderSignatoryInput} from './__generated__/CreateSignatureOrderScreenMutation.graphql';
import {CreateSignatureOrderScreenQuery} from './__generated__/CreateSignatureOrderScreenQuery.graphql';
import EvidenceValidationInput, { filterEvidenceValidation } from '../components/EvidenceValidationInput';

import useMutation from '../hooks/useMutation';

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

type LocalDocumentInput = DocumentInput & {
  fileName: string
}

type EvidenceProviderType = "oidc" | "criiptoVerify" | "drawable";

const evidenceProviderToType = (input: EvidenceProviderInput) : EvidenceProviderType | null => {
  if (input.oidc) return "oidc";
  if (input.criiptoVerify) return "criiptoVerify";
  if (input.drawable) return "drawable";
  return null;
}

export default function CreateSignatureOrderScreen() {
  const [title, setTitle] = useState<string | null>(null);
  const [maxSignatories, setMaxSignatories] = useState(14);
  const [expiresInDays, setExpiresInDays] = useState(90);
  const [timezone, setTimezone] = useState('UTC');
  const [documents, setDocuments] = useState<LocalDocumentInput[]>([]);
  const [ui, setUI] = useState<CreateSignatureOrderUIInput>({});
  const [webhook, setWebhook] = useState('');
  const [signatories, setSignatories] = useState<CreateSignatureOrderSignatoryInput[]>([]);
  const [disableVerifyEvidenceProvider, setDisableVerifyEvidenceProvider] = useState(false);
  const [addEvidenceProviderType, setAddEvidenceProviderType] = useState<EvidenceProviderType>("oidc");
  const [evidenceProviders, setEvidenceProviders] = useState<EvidenceProviderInput[]>([]);
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

        timezones
      }
    `,
    {}
  );

  const application = data.viewer;
  const timezones = data.timezones;

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

  const handleRemoveDocument = (document : LocalDocumentInput) => {
    setDocuments(documents => {
      return documents.filter(search => search !== document);
    });
  }

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
        timezone,
        signatories: signatories.map(signatory => {
          return {
            ...signatory,
            evidenceValidation: filterEvidenceValidation(signatory.evidenceValidation)
          }
        }),
        documents,
        evidenceProviders,
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
    });
  };

  const handleRemoveSignatory = (signatory: CreateSignatureOrderSignatoryInput) => {
    setSignatories(signatories => signatories.filter(search => signatory !== search));
  };

  const addSignatory = () => {
    setSignatories(signatories => signatories.concat({
      reference: '',
    }));
  }

  const addEvidenceProvider = () => {
    let provider : EvidenceProviderInput | null = null;

    switch (addEvidenceProviderType) {
      case 'oidc':
        provider = {
          enabledByDefault: true,
          oidc: {
            name: "OIDC",
            clientID: "",
            domain: "",
            audience: ""
          }
        };
        break;
      case 'criiptoVerify':
        provider = {
          enabledByDefault: true,
          criiptoVerify: {
            acrValues: []
          }
        };
        break;
      case 'drawable':
        provider = {
          enabledByDefault: true,
          drawable: {
            requireName: true
          }
        }
    }

    if (provider === null) return;
    setEvidenceProviders(providers => providers.concat(provider!));
  };

  const handleChangeEvidenceProvider = (provider : EvidenceProviderInput, key : string, value : string | boolean | object) => {
    setEvidenceProviders(providers => {
      return providers.map(search => {
        if (search === provider) {
          return {
            ...search,
            [key]: value
          };
        }
        return search;
      });
    })
  };

  const handleRemoveEvidenceProvider = (provider: EvidenceProviderInput) => {
    setEvidenceProviders(providers => providers.filter(search => search !== provider));
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
              type="number"
              onChange={(event) => setExpiresInDays(parseInt(event.target.value, 10) || 90)}
              value={expiresInDays || 90}
              placeholder="Expires In (Days)"
              required
            />
            <label className="form-label">Expires In (Days)</label>
            <small className="form-text text-muted">For compliance reasons a signature order must be configured to expire automatically if not closed or cancelled.</small>
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
        <div className="col-4">
          <div className="mb-3 form-floating">
            <select
              className="form-control"
              onChange={(event) => setTimezone(event.target.value)}
              value={timezone}
              placeholder="Timezone"
            >
              {timezones?.map(timezone => (
                <option value={timezone} key={timezone}>{timezone}</option>
              ))}
            </select>
            <label className="form-label">Timezone</label>
          </div>
        </div>
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
              <option value="SV_SE">SV_SE</option>
            </select>
            <label className="form-label">Language</label>
          </div>
        </div>
      </div>
      <h4>Documents</h4>
      {documents.length ? (
        <div className="row">
          {documents.map((document, index) => (
            <div className="col-4 mb-3" key={index}>
              {document.fileName}
              <div className="mb-2 form-floating">
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
              <button type="button" className="btn btn-secondary btn-small" onClick={() => handleRemoveDocument(document)}>Remove</button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <label htmlFor="pdf_file_select" className="form-label"><strong>Add document</strong></label>
        <input className="form-control" type="file" id="pdf_file_select" multiple onChange={handleAddDocument} />
      </div>
      <h4>Evidence Providers</h4>
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
      {evidenceProviders.length ? (
        <div className="row">
          {evidenceProviders.map((evidenceProvider, index) => (
            <div className="col-4 mb-3 p-3" key={index}>
              <strong>{evidenceProviderToType(evidenceProvider)}</strong>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  id={`evidenceProvider_${index}_enabledByDefault`} type="checkbox"
                  checked={evidenceProvider.enabledByDefault || false}
                  onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'enabledByDefault', event.target.checked)}
                />
                <label className="form-check-label" htmlFor={`evidenceProvider_${index}_enabledByDefault`} >
                  Enabled by default
                </label>
              </div>

              {evidenceProviderToType(evidenceProvider) === 'oidc' ? (
                <React.Fragment>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider, domain: event.target.value})}
                      value={evidenceProvider.oidc?.domain}
                      placeholder="Domain"
                      required
                    />
                    <label className="form-label">Domain</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider, clientID: event.target.value})}
                      value={evidenceProvider.oidc?.clientID}
                      placeholder="ClientID"
                      required
                    />
                    <label className="form-label">ClientID</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider, audience: event.target.value})}
                      value={evidenceProvider.oidc?.audience}
                      placeholder="Audience"
                      required
                    />
                    <label className="form-label">Audience</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider, acrValues: event.target.value.split(',')})}
                      value={evidenceProvider.oidc?.acrValues?.join(',') || ''}
                      placeholder="Acr values (comma-seperated)"
                    />
                    <label className="form-label">Acr values (comma-seperated)</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider, uniqueEvidenceKey: event.target.value})}
                      value={evidenceProvider.oidc?.uniqueEvidenceKey || undefined}
                      placeholder="Unique Evidence Key"
                      required
                    />
                    <label className="form-label">Unique Evidence Key</label>
                  </div>
                </React.Fragment>
              ) : null}

              {evidenceProviderToType(evidenceProvider) === 'criiptoVerify' ? (
                <React.Fragment>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'criiptoVerify', {...evidenceProvider, acrValues: event.target.value.split(',')})}
                      value={evidenceProvider.criiptoVerify?.acrValues?.join(',') || ''}
                      placeholder="Acr values (comma-seperated)"
                    />
                    <label className="form-label">Acr values (comma-seperated)</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'criiptoVerify', {...evidenceProvider, uniqueEvidenceKey: event.target.value})}
                      value={evidenceProvider.oidc?.uniqueEvidenceKey || undefined}
                      placeholder="Unique Evidence Key"
                      required
                    />
                    <label className="form-label">Unique Evidence Key</label>
                  </div>
                </React.Fragment>
              ) : null}

              {evidenceProviderToType(evidenceProvider) === 'drawable' ? (
                <React.Fragment>
                  <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    id={`evidenceProvider_${index}_requireName`} type="checkbox"
                    checked={evidenceProvider.drawable?.requireName || false}
                    onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'drawable', {...evidenceProvider, requireName: event.target.checked})}
                  />
                  <label className="form-check-label" htmlFor={`evidenceProvider_${index}_requireName`} >
                    Require name
                  </label>
                </div>
                </React.Fragment>
              ) : null}

              <div className="mt-2">
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => handleRemoveEvidenceProvider(evidenceProvider)}>Remove evidence provider</button>
                </div>
            </div>
          ))}  
        </div>
      ) : null}
      <div className="mb-3">
        <select className="form-control" style={{width: '250px', display: 'inline-block'}} value={addEvidenceProviderType} onChange={(event) => setAddEvidenceProviderType(event.target.value as EvidenceProviderType)}>
          <option value="oidc">oidc</option>
          <option value="criiptoVerify">criiptoVerify</option>
          <option value="drawable">drawable</option>
        </select>
        <button type="button" className="btn btn-secondary" onClick={addEvidenceProvider}>Add evidence provider</button>
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

                <div className="mt-2">
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => handleRemoveSignatory(signatory)}>Remove signatory</button>
                </div>
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