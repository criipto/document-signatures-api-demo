import React, {useState} from 'react';

import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { useHistory } from 'react-router-dom';

import {CreateSignatureOrderScreenMutation, DocumentInput, SignatoryEvidenceValidationInput, EvidenceProviderInput, CreateSignatureOrderUIInput, CreateSignatureOrderSignatoryInput, SignatureOrderUILogoInput, SignatureAppearanceInput} from './__generated__/CreateSignatureOrderScreenMutation.graphql';
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
  const [sampleDocumentCount, setSampleDocumentCount] = useState(1);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [timezone, setTimezone] = useState('UTC');
  const [documents, setDocuments] = useState<LocalDocumentInput[]>([]);
  const [ui, setUI] = useState<CreateSignatureOrderUIInput>({});
  const [signatureAppearance, setSignatureAppearance] = useState<SignatureAppearanceInput>({identifierFromEvidence: []});
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

  const handleAddSampleDocument = () => {
    const newDocuments : LocalDocumentInput[] = new Array(sampleDocumentCount).fill(undefined).map(() => ({
      fileName: 'sample.pdf',
      pdf: {
        title: 'sample.pdf',
        blob: samplePDF,
        storageMode: 'Temporary'
      }
    }));

    setDocuments(documents => documents.concat(newDocuments));
  }

  const handleChangeDocument = (document : LocalDocumentInput, key : string, value : string | boolean) => {
    setDocuments(documents => {
      return documents.map(search => {
        if (search === document) {
          return {
            ...search,
            [key]: value
          };
        }
        return search;
      });
    })
  };
  const handleChangePdfDocument = (document : LocalDocumentInput, key : string, value : string) => {
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
      [key]: (event.target.type === "checkbox" && "checked" in event.target) ? event.target.checked : event.target.value
    }));
  }

  const handleUILogo = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: keyof SignatureOrderUILogoInput) => {
    setUI(ui => ({
      ...ui,
      logo: {
        src: '',
        href: '',
        ...ui.logo,
        [key]: event.target.value
      }
    }));
  }

  const handleSignatureAppearance = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: keyof SignatureAppearanceInput) => {
    if (key === 'identifierFromEvidence') {
      setSignatureAppearance(signatureAppearance => ({
        ...signatureAppearance,
        identifierFromEvidence: event.target.value.split(',').map(s => s.trim())
      }));
      return;
    }
    setSignatureAppearance(signatureAppearance => ({
      ...signatureAppearance,
      [key]: "checked" in event.target ? event.target.checked : event.target.value
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
        expiresInDays,
        signatories: signatories.map(signatory => {
          return {
            ...signatory,
            evidenceValidation: filterEvidenceValidation(signatory.evidenceValidation)
          }
        }),
        documents,
        evidenceProviders,
        ui: {
          ...ui,
          stylesheet: ui.stylesheet || null,
          logo: ui.logo?.src ? ui.logo : null
        },
        webhook: webhook ? {url: webhook} : null,
        signatureAppearance: signatureAppearance.identifierFromEvidence.length ? signatureAppearance : null
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
            acrValues: [],
            alwaysRedirect: false,
            message: null
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

  const handleChangeEvidenceProvider = (provider : EvidenceProviderInput, key : keyof EvidenceProviderInput, value : string | boolean | object) => {
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
              onChange={(event) => setExpiresInDays(parseInt(event.target.value, 10) || 7)}
              value={expiresInDays || 7}
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
            <input
              className="form-control"
              type="text"
              onChange={(event) => handleUI(event, 'stylesheet')}
              value={ui.stylesheet || ''}
              placeholder="Stylesheet"
            />
            <label className="form-label">Stylesheet</label>
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
              <option value="NB_NO">NB_NO</option>
            </select>
            <label className="form-label">Language</label>
          </div>
        </div>
        <div className="col-4">
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="text"
              onChange={(event) => handleUILogo(event, 'src')}
              value={ui.logo?.src || ''}
              placeholder="Logo SRC"
            />
            <label className="form-label">Logo SRC</label>
          </div>
        </div>
        <div className="col-4">
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="text"
              onChange={(event) => handleUILogo(event, 'href')}
              value={ui.logo?.href || ''}
              placeholder="Logo Href"
            />
            <label className="form-label">Logo Href</label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              id={`ui_disableRejection`} type="checkbox"
              checked={ui.disableRejection ||false}
              onChange={(event) => handleUI(event, 'disableRejection')}
            />
            <label className="form-check-label" htmlFor={`ui_disableRejection`} >
              Disable rejection
            </label>
          </div>
        </div>
      </div>
      <h4>Signature Appearance</h4>
      <div className="row">
        <div className="col-4">
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="text"
              onChange={(event) => handleSignatureAppearance(event, 'identifierFromEvidence')}
              value={signatureAppearance.identifierFromEvidence.join(',')}
              placeholder="Identifier From Evidence"
            />
            <label className="form-label">Identifier From Evidence (comma-seperated)</label>
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
                  onChange={(event) => handleChangePdfDocument(document, 'title', event.target.value)}
                  value={document.pdf.title}
                  placeholder="Document title"
                  required
                />
                <label className="form-label">Document title</label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  id={`document_${document.fileName}_removePreviousSignatures`} type="checkbox"
                  checked={document.removePreviousSignatures ?? false}
                  onChange={(event) => handleChangeDocument(document, 'removePreviousSignatures', event.target.checked)}
                />
                <label className="form-check-label" htmlFor={`document_${document.fileName}_removePreviousSignatures`} >
                  Remove previous signatures
                </label>
              </div>
              <button type="button" className="btn btn-secondary btn-small" onClick={() => handleRemoveDocument(document)}>Remove</button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <label htmlFor="pdf_file_select" className="form-label"><strong>Add document</strong></label>
        <input className="form-control" type="file" id="pdf_file_select" multiple onChange={handleAddDocument} accept=".pdf" />
        <div className="d-flex flex-row align-items-center mt-3">
          <input style={{width: 100}} className="form-control" type="number" min={1} step={1} value={sampleDocumentCount} onChange={event => setSampleDocumentCount(parseInt(event.target.value, 10))} />
          <button type="button" className="btn btn-secondary btn-small" onClick={() => handleAddSampleDocument()}>Add sample</button>
        </div>
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
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider.oidc, domain: event.target.value})}
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
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider.oidc, clientID: event.target.value})}
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
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider.oidc, audience: event.target.value})}
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
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider.oidc, acrValues: event.target.value.split(',')})}
                      value={evidenceProvider.oidc?.acrValues?.join(',') || ''}
                      placeholder="Acr values (comma-seperated)"
                    />
                    <label className="form-label">Acr values (comma-seperated)</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider.oidc, uniqueEvidenceKey: event.target.value})}
                      value={evidenceProvider.oidc?.uniqueEvidenceKey || undefined}
                      placeholder="Unique Evidence Key"
                    />
                    <label className="form-label">Unique Evidence Key</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      id={`evidenceProvider_${index}_alwaysRedirect`} type="checkbox"
                      checked={evidenceProvider.oidc?.alwaysRedirect || false}
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'oidc', {...evidenceProvider.oidc, alwaysRedirect: event.target.checked})}
                    />
                    <label className="form-check-label" htmlFor={`evidenceProvider_${index}_alwaysRedirect`} >
                      Always redirect
                    </label>
                  </div>
                </React.Fragment>
              ) : null}

              {evidenceProviderToType(evidenceProvider) === 'criiptoVerify' ? (
                <React.Fragment>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, acrValues: event.target.value.split(',')})}
                      value={evidenceProvider.criiptoVerify?.acrValues?.join(',') || ''}
                      placeholder="Acr values (comma-seperated)"
                    />
                    <label className="form-label">Acr values (comma-seperated)</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, uniqueEvidenceKey: event.target.value})}
                      value={evidenceProvider.criiptoVerify?.uniqueEvidenceKey || undefined}
                      placeholder="Unique Evidence Key"
                    />
                    <label className="form-label">Unique Evidence Key</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      id={`evidenceProvider_${index}_alwaysRedirect`} type="checkbox"
                      checked={evidenceProvider.criiptoVerify?.alwaysRedirect || false}
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, alwaysRedirect: event.target.checked})}
                    />
                    <label className="form-check-label" htmlFor={`evidenceProvider_${index}_alwaysRedirect`} >
                      Always redirect
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, message: event.target.value})}
                      value={evidenceProvider.criiptoVerify?.message || undefined}
                      placeholder="Message (DK MitID)"
                    />
                    <label className="form-label">Message (DK MitID)</label>
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
                      onChange={(event) => handleChangeEvidenceProvider(evidenceProvider, 'drawable', {...evidenceProvider.drawable, requireName: event.target.checked})}
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

const samplePDF = 'JVBERi0yLjANCg0KMSAwIG9iag0KPDwNCiAgL1R5cGUgL0NhdGFsb2cNCiAgL01ldGFkYXRhIDIgMCBSDQogIC9QYWdlcyAzIDAgUg0KPj4NCmVuZG9iag0KDQoyIDAgb2JqDQo8PA0KICAvTGVuZ3RoIDIzNTENCiAgL1R5cGUgL01ldGFkYXRhDQogIC9TdWJ0eXBlIC9YTUwNCj4+DQpzdHJlYW0NCjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0luc2VydCBYTVAgdG9vbCBuYW1lIGhlcmUuJz4NCiAgPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPg0KICAgICAgPHBkZjpQcm9kdWNlcj5EYXRhbG9naWNzIC0gZXhhbXBsZSBwcm9kdWNlciBwcm9ncmFtIG5hbWUgaGVyZTwvcGRmOlByb2R1Y2VyPg0KICAgICAgPHBkZjpDb3B5cmlnaHQ+Q29weXJpZ2h0IDIwMTcgUERGIEFzc29jaWF0aW9uPC9wZGY6Q29weXJpZ2h0Pg0KICAgICAgPHBkZjpLZXl3b3Jkcz5QREYgMi4wIHNhbXBsZSBleGFtcGxlPC9wZGY6S2V5d29yZHM+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4NCiAgICAgIDx4YXA6Q3JlYXRlRGF0ZT4yMDE3LTA1LTI0VDEwOjMwOjExWjwveGFwOkNyZWF0ZURhdGU+DQogICAgICA8eGFwOk1ldGFkYXRhRGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1ldGFkYXRhRGF0ZT4NCiAgICAgIDx4YXA6TW9kaWZ5RGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1vZGlmeURhdGU+DQogICAgICA8eGFwOkNyZWF0b3JUb29sPkRhdGFsb2dpY3MgLSBleGFtcGxlIGNyZWF0b3IgdG9vbCBuYW1lIGhlcmU8L3hhcDpDcmVhdG9yVG9vbD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPg0KICAgICAgPGRjOmZvcm1hdD5hcHBsaWNhdGlvbi9wZGY8L2RjOmZvcm1hdD4NCiAgICAgIDxkYzp0aXRsZT4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5BIHNpbXBsZSBQREYgMi4wIGV4YW1wbGUgZmlsZTwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOnRpdGxlPg0KICAgICAgPGRjOmNyZWF0b3I+DQogICAgICAgIDxyZGY6U2VxPg0KICAgICAgICAgIDxyZGY6bGk+RGF0YWxvZ2ljcyBJbmNvcnBvcmF0ZWQ8L3JkZjpsaT4NCiAgICAgICAgPC9yZGY6U2VxPg0KICAgICAgPC9kYzpjcmVhdG9yPg0KICAgICAgPGRjOmRlc2NyaXB0aW9uPg0KICAgICAgICA8cmRmOkFsdD4NCiAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkRlbW9uc3RyYXRpb24gb2YgYSBzaW1wbGUgUERGIDIuMCBmaWxlLjwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOmRlc2NyaXB0aW9uPg0KICAgICAgPGRjOnJpZ2h0cz4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5Db3B5cmlnaHQgMjAxNyBQREYgQXNzb2NpYXRpb24uIExpY2Vuc2VkIHRvIHRoZSBwdWJsaWMgdW5kZXIgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1TaGFyZUFsaWtlIDQuMCBJbnRlcm5hdGlvbmFsIGxpY2Vuc2UuPC9yZGY6bGk+DQogICAgICAgIDwvcmRmOkFsdD4NCiAgICAgIDwvZGM6cmlnaHRzPg0KICAgIDwvcmRmOkRlc2NyaXB0aW9uPg0KICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhhcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iPg0KICAgICAgPHhhcFJpZ2h0czpNYXJrZWQ+VHJ1ZTwveGFwUmlnaHRzOk1hcmtlZD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIj4NCiAgICAgIDxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL3NhLzQuMC8iIC8+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iPg0KICAgICAgPHhhcE1NOkRvY3VtZW50SUQ+dXVpZDozZWVmMjE2Ni04MzMyLWFiYjQtM2QzMS03NzMzNDU3ODg3M2Y8L3hhcE1NOkRvY3VtZW50SUQ+DQogICAgICA8eGFwTU06SW5zdGFuY2VJRD51dWlkOjk5MWJjY2U3LWVlNzAtMTFhMy05MWFhLTc3YmJlMjE4MWZkODwveGFwTU06SW5zdGFuY2VJRD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgPC9yZGY6UkRGPg0KPC94OnhtcG1ldGE+DQplbmRzdHJlYW0NCmVuZG9iag0KDQozIDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZXMNCiAgL0tpZHMgWzQgMCBSXQ0KICAvQ291bnQgMQ0KPj4NCmVuZG9iag0KDQo0IDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZQ0KICAvUGFyZW50IDMgMCBSDQogIC9NZWRpYUJveCBbMCAwIDYxMiAzOTZdDQogIC9Db250ZW50cyBbNSAwIFIgNiAwIFJdDQogIC9SZXNvdXJjZXMgPDwNCiAgICAvRm9udCA8PCAvRjEgNyAwIFIgPj4NCiAgPj4NCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCA3NDQgPj4NCnN0cmVhbQ0KJSBTYXZlIHRoZSBjdXJyZW50IGdyYXBoaWMgc3RhdGUNCnEgDQoNCiUgRHJhdyBhIGJsYWNrIGxpbmUgc2VnbWVudCwgdXNpbmcgdGhlIGRlZmF1bHQgbGluZSB3aWR0aC4NCjE1MCAyNTAgbQ0KMTUwIDM1MCBsDQpTDQoNCiUgRHJhdyBhIHRoaWNrZXIsIGRhc2hlZCBsaW5lIHNlZ21lbnQuDQo0IHcgJSBTZXQgbGluZSB3aWR0aCB0byA0IHBvaW50cw0KWzQgNl0gMCBkICUgU2V0IGRhc2ggcGF0dGVybiB0byA0IHVuaXRzIG9uLCA2IHVuaXRzIG9mZg0KMTUwIDI1MCBtDQo0MDAgMjUwIGwNClMNCltdIDAgZCAlIFJlc2V0IGRhc2ggcGF0dGVybiB0byBhIHNvbGlkIGxpbmUNCjEgdyAlIFJlc2V0IGxpbmUgd2lkdGggdG8gMSB1bml0DQoNCiUgRHJhdyBhIHJlY3RhbmdsZSB3aXRoIGEgMS11bml0IHJlZCBib3JkZXIsIGZpbGxlZCB3aXRoIGxpZ2h0IGJsdWUuDQoxLjAgMC4wIDAuMCBSRyAlIFJlZCBmb3Igc3Ryb2tlIGNvbG9yDQowLjUgMC43NSAxLjAgcmcgJSBMaWdodCBibHVlIGZvciBmaWxsIGNvbG9yDQoyMDAgMzAwIDUwIDc1IHJlDQpCDQoNCiUgRHJhdyBhIGN1cnZlIGZpbGxlZCB3aXRoIGdyYXkgYW5kIHdpdGggYSBjb2xvcmVkIGJvcmRlci4NCjAuNSAwLjEgMC4yIFJHDQowLjcgZw0KMzAwIDMwMCBtDQozMDAgNDAwIDQwMCA0MDAgNDAwIDMwMCBjDQpiDQoNCiUgUmVzdG9yZSB0aGUgZ3JhcGhpYyBzdGF0ZSB0byB3aGF0IGl0IHdhcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgc3RyZWFtDQpRDQoNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8IC9MZW5ndGggMTY2ID4+DQpzdHJlYW0NCiUgQSB0ZXh0IGJsb2NrIHRoYXQgc2hvd3MgIkhlbGxvIFdvcmxkIg0KJSBObyBjb2xvciBpcyBzZXQsIHNvIHRoaXMgZGVmYXVsdHMgdG8gYmxhY2sgaW4gRGV2aWNlR3JheSBjb2xvcnNwYWNlDQpCVA0KICAvRjEgMjQgVGYNCiAgMTAwIDEwMCBUZA0KICAoSGVsbG8gV29ybGQpIFRqDQpFVA0KZW5kc3RyZWFtDQplbmRvYmoNCg0KNyAwIG9iag0KPDwNCiAgL1R5cGUgL0ZvbnQNCiAgL1N1YnR5cGUgL1R5cGUxDQogIC9CYXNlRm9udCAvSGVsdmV0aWNhDQogIC9GaXJzdENoYXIgMzMNCiAgL0xhc3RDaGFyIDEyNg0KICAvV2lkdGhzIDggMCBSDQogIC9Gb250RGVzY3JpcHRvciA5IDAgUg0KPj4NCmVuZG9iag0KDQo4IDAgb2JqDQpbIDI3OCAzNTUgNTU2IDU1NiA4ODkgNjY3IDIyMiAzMzMgMzMzIDM4OSA1ODQgMjc4IDMzMyAyNzggMjc4IDU1Ng0KICA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAyNzggMjc4IDU4NCA1ODQgNTg0IDU1NiAxMDE1DQogIDY2NyA2NjcgNzIyIDcyMiA2NjcgNjExIDc3OCA3MjIgMjc4IDUwMCA2NjcgNTU2IDgzMyA3MjIgNzc4IDY2Nw0KICA3NzggNzIyIDY2NyA2MTEgNzIyIDY2NyA5NDQgNjY3IDY2NyA2MTEgMjc4IDI3OCAyNzggNDY5IDU1NiAyMjINCiAgNTU2IDU1NiA1MDAgNTU2IDU1NiAyNzggNTU2IDU1NiAyMjIgMjIyIDUwMCAyMjIgODMzIDU1NiA1NTYgNTU2DQogIDU1NiAzMzMgNTAwIDI3OCA1NTYgNTAwIDcyMiA1MDAgNTAwIDUwMCAzMzQgMjYwIDMzNCA1ODQgXQ0KZW5kb2JqDQoNCiUgVGhpcyBGb250RGVzY3JpcHRvciBjb250YWlucyBvbmx5IHRoZSByZXF1aXJlZCBlbnRyaWVzIGZvciBQREYgMi4wDQolIGZvciB1bmVtYmVkZGVkIHN0YW5kYXJkIDE0IGZvbnRzIHRoYXQgY29udGFpbiBMYXRpbiBjaGFyYWN0ZXJzDQo5IDAgb2JqDQo8PA0KICAvVHlwZSAvRm9udERlc2NyaXB0b3INCiAgL0ZvbnROYW1lIC9IZWx2ZXRpY2ENCiAgL0ZsYWdzIDMyDQogIC9Gb250QkJveCBbIC0xNjYgLTIyNSAxMDAwIDkzMSBdDQogIC9JdGFsaWNBbmdsZSAwDQogIC9Bc2NlbnQgNzE4DQogIC9EZXNjZW50IC0yMDcNCiAgL0NhcEhlaWdodCA3MTgNCiAgL1N0ZW1WIDg4DQogIC9NaXNzaW5nV2lkdGggMCAgDQo+Pg0KZW5kb2JqDQoNCiUgVGhlIG9iamVjdCBjcm9zcy1yZWZlcmVuY2UgdGFibGUuIFRoZSBmaXJzdCBlbnRyeQ0KJSBkZW5vdGVzIHRoZSBzdGFydCBvZiBQREYgZGF0YSBpbiB0aGlzIGZpbGUuDQp4cmVmDQowIDEwDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTIgMDAwMDAgbg0KMDAwMDAwMDA5MiAwMDAwMCBuDQowMDAwMDAyNTQzIDAwMDAwIG4NCjAwMDAwMDI2MTUgMDAwMDAgbg0KMDAwMDAwMjc3OCAwMDAwMCBuDQowMDAwMDAzNTgzIDAwMDAwIG4NCjAwMDAwMDM4MDcgMDAwMDAgbg0KMDAwMDAwMzk2OCAwMDAwMCBuDQowMDAwMDA0NTIwIDAwMDAwIG4NCnRyYWlsZXINCjw8DQogIC9TaXplIDEwDQogIC9Sb290IDEgMCBSDQogIC9JRCBbIDwzMWM3YThhMjY5ZTRjNTliYzNjZDdkZjBkYWJiZjM4OD48MzFjN2E4YTI2OWU0YzU5YmMzY2Q3ZGYwZGFiYmYzODg+IF0NCj4+DQpzdGFydHhyZWYNCjQ4NDcNCiUlRU9GDQo=';