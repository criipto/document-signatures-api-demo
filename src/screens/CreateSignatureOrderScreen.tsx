import React, {useState} from 'react';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from "react-relay";

import { useHistory } from 'react-router-dom';

import {CreateSignatureOrderScreenMutation, DocumentInput, SignatoryEvidenceValidationInput, EvidenceProviderInput, CreateSignatureOrderUIInput, CreateSignatureOrderSignatoryInput, SignatureOrderUILogoInput, SignatureAppearanceInput, EvidenceValidationStage, CreateSignatureOrderWebhookInput, PdfBoundingBoxInput, PadesDocumentSealsPageTemplateInput} from './__generated__/CreateSignatureOrderScreenMutation.graphql';
import {CreateSignatureOrderScreenQuery} from './__generated__/CreateSignatureOrderScreenQuery.graphql';
import EvidenceValidationInput, { filterEvidenceValidation } from '../components/EvidenceValidationInput';

import useMutation from '../hooks/useMutation';
import EvidenceProviderInputComponent from '../components/EvidenceProviderInput';
import UIInputFields from '../components/UIInputFields';

const ALL_EVIDENCE_VALIDATION_STAGES : EvidenceValidationStage[] = ['VIEW', 'SIGN'];

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
  const [expiresInDays, setExpiresInDays] = useState<number | null>();
  const [expiresAtDate, setExpiresAt] = useState<string | null>()
  const [timezone, setTimezone] = useState('UTC');
  const [documents, setDocuments] = useState<LocalDocumentInput[]>([]);
  const [ui, setUI] = useState<CreateSignatureOrderUIInput>({});
  const [signatureAppearance, setSignatureAppearance] = useState<SignatureAppearanceInput>({identifierFromEvidence: [], displayName: null, headerLeft: null, footer: null});
  const [webhook, setWebhook] = useState<CreateSignatureOrderWebhookInput>({
    url: '',
    validateConnectivity: false,
    secret: ''
  });
  const [signatories, setSignatories] = useState<CreateSignatureOrderSignatoryInput[]>([]);
  const [disableVerifyEvidenceProvider, setDisableVerifyEvidenceProvider] = useState(false);
  const [addEvidenceProviderType, setAddEvidenceProviderType] = useState<EvidenceProviderType>("oidc");
  const [evidenceProviders, setEvidenceProviders] = useState<EvidenceProviderInput[]>([]);
  const [evidenceProviderComposition, setEvidenceProviderComposition] = useState<'any' | 'all'>('any');
  const [evidenceValidationStages, setEvidenceValidationStages] = useState<EvidenceValidationStage[]>(['SIGN']);
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
      if (file.name.endsWith('.xml')) {
        setDocuments(documents => documents.concat([
          {
            fileName: file.name,
            xml: {
              title: file.name, blob: data, storageMode: 'Temporary'
            }
          }
        ]));
      } else {
        setDocuments(documents => documents.concat([
          {
            fileName: file.name,
            pdf: {
              title: file.name, blob: data, storageMode: 'Temporary'
            }
          }
        ]));
      }
    }
    event.target.value = '';
  };

  const handleAddSamplePdfDocument = (sample: string, pdf?: Partial<LocalDocumentInput["pdf"]>) => {
    const fileName = sample === samplePDFformFields ? `sample-form-fields.pdf` : `sample.pdf`;
    const newDocuments : LocalDocumentInput[] = new Array(sampleDocumentCount).fill(undefined).map(() => ({
      fileName,
      pdf: {
        title: fileName,
        blob: sample,
        storageMode: 'Temporary',
        ...pdf
      }
    }));

    setDocuments(documents => documents.concat(newDocuments));
  }
  const handleAddSampleXmlDocument = () => {
    const newDocuments : LocalDocumentInput[] = new Array(sampleDocumentCount).fill(undefined).map(() => ({
      fileName: 'sample.xml',
      xml: {
        title: 'sample.xml',
        blob: sampleXML,
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
  const handleChangePdfDocument = (document : LocalDocumentInput, key : string, value : string | null | boolean | number) => {
    setDocuments(documents => {
      return documents.map(search => {
        if (search === document) {
          if (key === 'form.enabled') {
            return {
              ...search,
              pdf: {
                ...search.pdf!,
                form: {
                  ...search.pdf?.form,
                  enabled: value ? true : false
                }
              }
            };
          }
          if (key === 'sealsPageTemplate.blob') {
            return {
              ...search,
              pdf: {
                ...search.pdf!,
                sealsPageTemplate: {
                  ...search.pdf?.sealsPageTemplate,
                  blob: value
                }
              }
            }
          }
          if (key.startsWith('sealsPageTemplate.area.')) {
            const coord = key.replace('sealsPageTemplate.area.', '')
            return {
              ...search,
              pdf: {
                ...search.pdf!,
                sealsPageTemplate: {
                  ...search.pdf?.sealsPageTemplate,
                  area: {
                    ...search.pdf?.sealsPageTemplate?.area,
                    [coord]: (value ?? undefined) as number | undefined
                  }
                }
              }
            }
          }
          if (key.startsWith('sealsPageTemplate.expected.')) {
            const exp = key.replace('sealsPageTemplate.expected.', '');
            return {
              ...search,
              pdf: {
                ...search.pdf!,
                sealsPageTemplate: {
                  ...search.pdf?.sealsPageTemplate,
                  [exp]: (value ?? undefined) as number | undefined
                }
              }
            }
          }

          return {
            ...search,
            pdf: {
              ...search.pdf!,
              [key]: value
            }
          };
        }
        return search;
      });
    })
  };
  const handleChangeXmlDocument = (document : LocalDocumentInput, key : string, value : string | null) => {
    setDocuments(documents => {
      return documents.map(search => {
        if (search === document) {
          return {
            ...search,
            xml: {
              ...search.xml!,
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


  const handleSignatureAppearance = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: keyof SignatureAppearanceInput) => {
    if (key === 'identifierFromEvidence') {
      setSignatureAppearance(signatureAppearance => ({
        ...signatureAppearance,
        identifierFromEvidence: event.target.value.split(',').map(s => s.trim())
      }));
      return;
    }
    if (key === 'displayName') {
      setSignatureAppearance(a => a);
      return;
    }
    if (key === 'headerLeft') {
      setSignatureAppearance(a => a);
      return;
    }
    if (key === 'footer') {
      setSignatureAppearance(a => a);
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

    const documentsInput = documents.map(document => {
      if (!document.pdf) return document;

      let sealsPageTemplate = document.pdf.sealsPageTemplate;
      if (!sealsPageTemplate?.blob || sealsPageTemplate.area.x1 == null || sealsPageTemplate.area.y1 == null || sealsPageTemplate.area.x2 == null || sealsPageTemplate.area.y2 == null) {
        sealsPageTemplate = null;
      }

      return {
        ...document,
        pdf: {
          ...document.pdf,
          sealsPageTemplate
        }
      };
    });

    executor.executePromise({
      input: {
        title,
        disableVerifyEvidenceProvider: evidenceProviderComposition === 'all' ? true : disableVerifyEvidenceProvider,
        maxSignatories,
        timezone,
        expiresInDays,
        expiresAt: expiresAtDate ? new Date(expiresAtDate).toISOString() : null,
        signatories: signatories.map(signatory => {
          return {
            ...signatory,
            evidenceValidation: filterEvidenceValidation(signatory.evidenceValidation?.slice())
          }
        }),
        documents: documentsInput,
        evidenceProviders: evidenceProviderComposition === 'all' ? [
          {
            allOf: {
              providers: evidenceProviders
            }
          }
        ] : evidenceProviders.map(evidenceProvider => {
          if (evidenceProvider.criiptoVerify) {
            return {
              criiptoVerify: {
                ...evidenceProvider.criiptoVerify,
                audiences: evidenceProvider.criiptoVerify.audiences?.filter(id => id?.length)
              }
            }
          }
          return evidenceProvider;
        }),
        evidenceValidationStages,
        ui: {
          ...ui,
          stylesheet: ui.stylesheet || null,
          logo: ui.logo?.src ? ui.logo : null
        },
        webhook: webhook.url ? {
          ...webhook,
          secret: webhook.secret?.length ? webhook.secret : null
        } : null,
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
            acrValues: null,
            alwaysRedirect: false,
            message: null,
            audiences: null
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

  const handleMoveEvidenceProvider = (provider: EvidenceProviderInput, direction: 'up' | 'down') => {
    setEvidenceProviders(providers => {
      const index = providers.indexOf(provider);
      if (direction === 'up') {
        const updatedProviders = providers.slice();
        const from = index;
        const to = index - 1;
        updatedProviders.splice(
          to,
          0,
          updatedProviders.splice(from, 1)[0]
        );
        return updatedProviders;
      }
      if (direction === 'down') {
        const updatedProviders = providers.slice();
        const from = index;
        const to = index + 1;
        updatedProviders.splice(
          to,
          0,
          updatedProviders.splice(from, 1)[0]
        );
        return updatedProviders;
      }
      return providers;
    });
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
              onChange={(event) => setExpiresInDays(parseInt(event.target.value, 10))}
              value={expiresInDays ?? undefined}
              placeholder="Expires In (Days)"
            />
            <label className="form-label">Expires In (Days)</label>
            <small className="form-text text-muted">For compliance reasons a signature order must be configured to expire automatically if not closed or cancelled. Cannot be provided with Expires At.</small>
          </div>
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="datetime-local"
              onChange={(event) => setExpiresAt(event.target.value)}
              value={expiresAtDate ?? undefined}
              placeholder="Expires At"
            />
            <label className="form-label">Expires At</label>
            <small className="form-text text-muted">For compliance reasons a signature order must be configured to expire automatically if not closed or cancelled. Cannot be provided with Expires In.</small>
          </div>
        </div>
        <div className="col-sm">
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="text"
              onChange={(event) => setWebhook(webhook => ({...webhook, url: event.target.value}))}
              value={webhook.url || ''}
              placeholder="Webhook URI"
            />
            <label className="form-label">Webhook URI</label>
            <small className="form-text text-muted">You can use https://webhook.site/ for testing</small>
          </div>
          <div className="mb-3 form-floating">
            <input
              className="form-control"
              type="text"
              onChange={(event) => setWebhook(webhook => ({...webhook, secret: event.target.value}))}
              value={webhook.secret || ''}
              placeholder="Webhook secret"
            />
            <label className="form-label">Webhook secret</label>
            <small className="form-text text-muted">Must be base64 string. <a href="#" onClick={(event) => {
              event.preventDefault();

              const bytes = new Uint8Array(32);
              crypto.getRandomValues(bytes);
              const b64encoded = bytesToBase64(bytes);
              console.log(b64encoded);
              setWebhook(webhook => ({...webhook, secret: b64encoded}))
            }}>Generate</a></small>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              id={`webhook_validateConnectivity`} type="checkbox"
              checked={webhook.validateConnectivity || false}
              onChange={(event) => setWebhook(webhook => ({...webhook, validateConnectivity: event.target.checked}))}
            />
            <label className="form-check-label" htmlFor={`webhook_validateConnectivity`} >
              Validate connectivity
            </label>
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
        <UIInputFields
          fieldWrapperClassName="col-4"
          ui={ui}
          onChange={setUI}
        />
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
              <strong>{"xml" in document ? "XML: " : "PDF: "} {document.fileName}</strong>
              {"pdf" in document && document.pdf ? (
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
                ) : null}
                {"xml" in document && document.xml ? (
                <div className="mb-2 form-floating">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => handleChangeXmlDocument(document, 'title', event.target.value)}
                    value={document.xml.title}
                    placeholder="Document title"
                    required
                  />
                  <label className="form-label">Document title</label>
                </div>
                ) : null}

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

              {"pdf" in document && document.pdf ? (
                <>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      id={`document_${document.fileName}_formEnabled`} type="checkbox"
                      checked={document.pdf.form?.enabled ?? false}
                      onChange={(event) => handleChangePdfDocument(document, 'form.enabled', event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor={`document_${document.fileName}_formEnabled`} >
                      Enable form filling
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <select
                      className="form-control"
                      onChange={(event) => handleChangePdfDocument(document, 'displayDocumentID', (event.target.value?.length ? event.target.value : null))}
                      value={document.pdf.displayDocumentID ?? ""}
                      placeholder="Display Document ID"
                    >
                      <option value="">No</option>
                      <option value="LEFT">LEFT</option>
                      <option value="TOP">TOP</option>
                      <option value="RIGHT">RIGHT</option>
                      <option value="BOTTOM">BOTTOM</option>
                    </select>
                    <label className="form-label">Display Document ID</label>
                  </div>
                </>
              ) : null}

              {"pdf" in document && document.pdf ? (
                <>
                  <div className="mb-2">
                    <em>Seal template</em>
                    <input className="form-control" type="file" id="pdf_file_select" onChange={async event => {
                      try {
                        const base64 = await toBase64(event.target.files![0]);
                        handleChangePdfDocument(document, `sealsPageTemplate.blob`, base64);
                      } catch (err) {
                        console.error(err);
                      }
                    }} accept=".pdf" />
                    <div className="row my-2">
                      {(['x1', 'y1', 'x2', 'y2'] as const).map((coord: keyof PdfBoundingBoxInput) => (
                        <div className="col-3">
                          <div className="form-floating">
                            <input
                              className="form-control"
                              type="number"
                              onChange={(event) => handleChangePdfDocument(document, `sealsPageTemplate.area.${coord}`, event.target.value ? parseInt(event.target.value, 10) : null)}
                              value={document.pdf?.sealsPageTemplate?.area?.[coord]}
                              placeholder={coord}
                            />
                            <label className="form-label">{coord}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="row">
                      {(['expectedColumns', 'expectedRows'] as const).map((exp: keyof PadesDocumentSealsPageTemplateInput) => (
                        <div className="col-6">
                          <div className="form-floating">
                            <input
                              className="form-control"
                              type="number"
                              onChange={(event) => handleChangePdfDocument(document, `sealsPageTemplate.expected.${exp}`, event.target.value ? parseInt(event.target.value, 10) : null)}
                              value={document.pdf?.sealsPageTemplate?.[exp] as number | undefined}
                              placeholder={exp}
                            />
                            <label className="form-label">{exp}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}

              <button type="button" className="btn btn-secondary btn-small" onClick={() => handleRemoveDocument(document)}>Remove</button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <label htmlFor="pdf_file_select" className="form-label"><strong>Add document</strong></label>
        <input className="form-control" type="file" id="pdf_file_select" multiple onChange={handleAddDocument} accept=".pdf,.xml" />
        <div className="d-flex flex-row align-items-center mt-3 gap-1">
          <input style={{width: 100}} className="form-control" type="number" min={1} step={1} value={sampleDocumentCount} onChange={event => setSampleDocumentCount(parseInt(event.target.value, 10))} />
          <button type="button" className="btn btn-secondary btn-small" onClick={() => handleAddSamplePdfDocument(samplePDF)}>Add PDF sample</button>
          <button type="button" className="btn btn-secondary btn-small" onClick={() => handleAddSamplePdfDocument(samplePDFformFields, {form: {enabled: true}})}>Add PDF sample (with forms)</button>
          <button type="button" className="btn btn-secondary btn-small" onClick={() => handleAddSampleXmlDocument()}>Add XML sample</button>
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
      <div className="mb-3">
        <label>Composition:&nbsp;</label>
        <select className="form-control" style={{width: '250px', display: 'inline-block'}}  value={evidenceProviderComposition} onChange={event => setEvidenceProviderComposition(event.target.value as any)}>
          <option value="any">Any</option>
          <option value="all">All</option>
        </select>
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

              <EvidenceProviderInputComponent
                evidenceProvider={evidenceProvider}
                onChange={(provider, key, value) => handleChangeEvidenceProvider(provider, key, value)}
              />

              <div className="mt-2">
                <button type="button" className="btn btn-secondary btn-small" onClick={() => handleRemoveEvidenceProvider(evidenceProvider)}>Remove evidence provider</button>
              </div>
              <div className="mt-2">
                {evidenceProvider !== evidenceProviders[0] ? (
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => handleMoveEvidenceProvider(evidenceProvider, 'up')}>Move up</button>
                ) : null}
                {evidenceProvider !== evidenceProviders[evidenceProviders.length - 1] ? (
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => handleMoveEvidenceProvider(evidenceProvider, 'down')}>Move down</button>
                ) : null}
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
      <h4>Evidence Validation Stages</h4>
      {ALL_EVIDENCE_VALIDATION_STAGES.map(evidenceValidationStage => (
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            id={evidenceValidationStage} type="checkbox"
            checked={evidenceValidationStages.includes(evidenceValidationStage)}
            onChange={(event) => setEvidenceValidationStages(stages => event.target.checked ? stages.concat([evidenceValidationStage]) : stages.filter(s => s !== evidenceValidationStage))}
          />
          <label className="form-check-label" htmlFor={evidenceValidationStage} >
            {evidenceValidationStage}
          </label>
        </div>
      ))}
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

function bytesToBase64(bytes: Uint8Array ) {
  var binary = '';
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

const samplePDF = 'JVBERi0yLjANCg0KMSAwIG9iag0KPDwNCiAgL1R5cGUgL0NhdGFsb2cNCiAgL01ldGFkYXRhIDIgMCBSDQogIC9QYWdlcyAzIDAgUg0KPj4NCmVuZG9iag0KDQoyIDAgb2JqDQo8PA0KICAvTGVuZ3RoIDIzNTENCiAgL1R5cGUgL01ldGFkYXRhDQogIC9TdWJ0eXBlIC9YTUwNCj4+DQpzdHJlYW0NCjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0luc2VydCBYTVAgdG9vbCBuYW1lIGhlcmUuJz4NCiAgPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPg0KICAgICAgPHBkZjpQcm9kdWNlcj5EYXRhbG9naWNzIC0gZXhhbXBsZSBwcm9kdWNlciBwcm9ncmFtIG5hbWUgaGVyZTwvcGRmOlByb2R1Y2VyPg0KICAgICAgPHBkZjpDb3B5cmlnaHQ+Q29weXJpZ2h0IDIwMTcgUERGIEFzc29jaWF0aW9uPC9wZGY6Q29weXJpZ2h0Pg0KICAgICAgPHBkZjpLZXl3b3Jkcz5QREYgMi4wIHNhbXBsZSBleGFtcGxlPC9wZGY6S2V5d29yZHM+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4NCiAgICAgIDx4YXA6Q3JlYXRlRGF0ZT4yMDE3LTA1LTI0VDEwOjMwOjExWjwveGFwOkNyZWF0ZURhdGU+DQogICAgICA8eGFwOk1ldGFkYXRhRGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1ldGFkYXRhRGF0ZT4NCiAgICAgIDx4YXA6TW9kaWZ5RGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1vZGlmeURhdGU+DQogICAgICA8eGFwOkNyZWF0b3JUb29sPkRhdGFsb2dpY3MgLSBleGFtcGxlIGNyZWF0b3IgdG9vbCBuYW1lIGhlcmU8L3hhcDpDcmVhdG9yVG9vbD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPg0KICAgICAgPGRjOmZvcm1hdD5hcHBsaWNhdGlvbi9wZGY8L2RjOmZvcm1hdD4NCiAgICAgIDxkYzp0aXRsZT4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5BIHNpbXBsZSBQREYgMi4wIGV4YW1wbGUgZmlsZTwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOnRpdGxlPg0KICAgICAgPGRjOmNyZWF0b3I+DQogICAgICAgIDxyZGY6U2VxPg0KICAgICAgICAgIDxyZGY6bGk+RGF0YWxvZ2ljcyBJbmNvcnBvcmF0ZWQ8L3JkZjpsaT4NCiAgICAgICAgPC9yZGY6U2VxPg0KICAgICAgPC9kYzpjcmVhdG9yPg0KICAgICAgPGRjOmRlc2NyaXB0aW9uPg0KICAgICAgICA8cmRmOkFsdD4NCiAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkRlbW9uc3RyYXRpb24gb2YgYSBzaW1wbGUgUERGIDIuMCBmaWxlLjwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOmRlc2NyaXB0aW9uPg0KICAgICAgPGRjOnJpZ2h0cz4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5Db3B5cmlnaHQgMjAxNyBQREYgQXNzb2NpYXRpb24uIExpY2Vuc2VkIHRvIHRoZSBwdWJsaWMgdW5kZXIgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1TaGFyZUFsaWtlIDQuMCBJbnRlcm5hdGlvbmFsIGxpY2Vuc2UuPC9yZGY6bGk+DQogICAgICAgIDwvcmRmOkFsdD4NCiAgICAgIDwvZGM6cmlnaHRzPg0KICAgIDwvcmRmOkRlc2NyaXB0aW9uPg0KICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhhcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iPg0KICAgICAgPHhhcFJpZ2h0czpNYXJrZWQ+VHJ1ZTwveGFwUmlnaHRzOk1hcmtlZD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIj4NCiAgICAgIDxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL3NhLzQuMC8iIC8+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iPg0KICAgICAgPHhhcE1NOkRvY3VtZW50SUQ+dXVpZDozZWVmMjE2Ni04MzMyLWFiYjQtM2QzMS03NzMzNDU3ODg3M2Y8L3hhcE1NOkRvY3VtZW50SUQ+DQogICAgICA8eGFwTU06SW5zdGFuY2VJRD51dWlkOjk5MWJjY2U3LWVlNzAtMTFhMy05MWFhLTc3YmJlMjE4MWZkODwveGFwTU06SW5zdGFuY2VJRD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgPC9yZGY6UkRGPg0KPC94OnhtcG1ldGE+DQplbmRzdHJlYW0NCmVuZG9iag0KDQozIDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZXMNCiAgL0tpZHMgWzQgMCBSXQ0KICAvQ291bnQgMQ0KPj4NCmVuZG9iag0KDQo0IDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZQ0KICAvUGFyZW50IDMgMCBSDQogIC9NZWRpYUJveCBbMCAwIDYxMiAzOTZdDQogIC9Db250ZW50cyBbNSAwIFIgNiAwIFJdDQogIC9SZXNvdXJjZXMgPDwNCiAgICAvRm9udCA8PCAvRjEgNyAwIFIgPj4NCiAgPj4NCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCA3NDQgPj4NCnN0cmVhbQ0KJSBTYXZlIHRoZSBjdXJyZW50IGdyYXBoaWMgc3RhdGUNCnEgDQoNCiUgRHJhdyBhIGJsYWNrIGxpbmUgc2VnbWVudCwgdXNpbmcgdGhlIGRlZmF1bHQgbGluZSB3aWR0aC4NCjE1MCAyNTAgbQ0KMTUwIDM1MCBsDQpTDQoNCiUgRHJhdyBhIHRoaWNrZXIsIGRhc2hlZCBsaW5lIHNlZ21lbnQuDQo0IHcgJSBTZXQgbGluZSB3aWR0aCB0byA0IHBvaW50cw0KWzQgNl0gMCBkICUgU2V0IGRhc2ggcGF0dGVybiB0byA0IHVuaXRzIG9uLCA2IHVuaXRzIG9mZg0KMTUwIDI1MCBtDQo0MDAgMjUwIGwNClMNCltdIDAgZCAlIFJlc2V0IGRhc2ggcGF0dGVybiB0byBhIHNvbGlkIGxpbmUNCjEgdyAlIFJlc2V0IGxpbmUgd2lkdGggdG8gMSB1bml0DQoNCiUgRHJhdyBhIHJlY3RhbmdsZSB3aXRoIGEgMS11bml0IHJlZCBib3JkZXIsIGZpbGxlZCB3aXRoIGxpZ2h0IGJsdWUuDQoxLjAgMC4wIDAuMCBSRyAlIFJlZCBmb3Igc3Ryb2tlIGNvbG9yDQowLjUgMC43NSAxLjAgcmcgJSBMaWdodCBibHVlIGZvciBmaWxsIGNvbG9yDQoyMDAgMzAwIDUwIDc1IHJlDQpCDQoNCiUgRHJhdyBhIGN1cnZlIGZpbGxlZCB3aXRoIGdyYXkgYW5kIHdpdGggYSBjb2xvcmVkIGJvcmRlci4NCjAuNSAwLjEgMC4yIFJHDQowLjcgZw0KMzAwIDMwMCBtDQozMDAgNDAwIDQwMCA0MDAgNDAwIDMwMCBjDQpiDQoNCiUgUmVzdG9yZSB0aGUgZ3JhcGhpYyBzdGF0ZSB0byB3aGF0IGl0IHdhcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgc3RyZWFtDQpRDQoNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8IC9MZW5ndGggMTY2ID4+DQpzdHJlYW0NCiUgQSB0ZXh0IGJsb2NrIHRoYXQgc2hvd3MgIkhlbGxvIFdvcmxkIg0KJSBObyBjb2xvciBpcyBzZXQsIHNvIHRoaXMgZGVmYXVsdHMgdG8gYmxhY2sgaW4gRGV2aWNlR3JheSBjb2xvcnNwYWNlDQpCVA0KICAvRjEgMjQgVGYNCiAgMTAwIDEwMCBUZA0KICAoSGVsbG8gV29ybGQpIFRqDQpFVA0KZW5kc3RyZWFtDQplbmRvYmoNCg0KNyAwIG9iag0KPDwNCiAgL1R5cGUgL0ZvbnQNCiAgL1N1YnR5cGUgL1R5cGUxDQogIC9CYXNlRm9udCAvSGVsdmV0aWNhDQogIC9GaXJzdENoYXIgMzMNCiAgL0xhc3RDaGFyIDEyNg0KICAvV2lkdGhzIDggMCBSDQogIC9Gb250RGVzY3JpcHRvciA5IDAgUg0KPj4NCmVuZG9iag0KDQo4IDAgb2JqDQpbIDI3OCAzNTUgNTU2IDU1NiA4ODkgNjY3IDIyMiAzMzMgMzMzIDM4OSA1ODQgMjc4IDMzMyAyNzggMjc4IDU1Ng0KICA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAyNzggMjc4IDU4NCA1ODQgNTg0IDU1NiAxMDE1DQogIDY2NyA2NjcgNzIyIDcyMiA2NjcgNjExIDc3OCA3MjIgMjc4IDUwMCA2NjcgNTU2IDgzMyA3MjIgNzc4IDY2Nw0KICA3NzggNzIyIDY2NyA2MTEgNzIyIDY2NyA5NDQgNjY3IDY2NyA2MTEgMjc4IDI3OCAyNzggNDY5IDU1NiAyMjINCiAgNTU2IDU1NiA1MDAgNTU2IDU1NiAyNzggNTU2IDU1NiAyMjIgMjIyIDUwMCAyMjIgODMzIDU1NiA1NTYgNTU2DQogIDU1NiAzMzMgNTAwIDI3OCA1NTYgNTAwIDcyMiA1MDAgNTAwIDUwMCAzMzQgMjYwIDMzNCA1ODQgXQ0KZW5kb2JqDQoNCiUgVGhpcyBGb250RGVzY3JpcHRvciBjb250YWlucyBvbmx5IHRoZSByZXF1aXJlZCBlbnRyaWVzIGZvciBQREYgMi4wDQolIGZvciB1bmVtYmVkZGVkIHN0YW5kYXJkIDE0IGZvbnRzIHRoYXQgY29udGFpbiBMYXRpbiBjaGFyYWN0ZXJzDQo5IDAgb2JqDQo8PA0KICAvVHlwZSAvRm9udERlc2NyaXB0b3INCiAgL0ZvbnROYW1lIC9IZWx2ZXRpY2ENCiAgL0ZsYWdzIDMyDQogIC9Gb250QkJveCBbIC0xNjYgLTIyNSAxMDAwIDkzMSBdDQogIC9JdGFsaWNBbmdsZSAwDQogIC9Bc2NlbnQgNzE4DQogIC9EZXNjZW50IC0yMDcNCiAgL0NhcEhlaWdodCA3MTgNCiAgL1N0ZW1WIDg4DQogIC9NaXNzaW5nV2lkdGggMCAgDQo+Pg0KZW5kb2JqDQoNCiUgVGhlIG9iamVjdCBjcm9zcy1yZWZlcmVuY2UgdGFibGUuIFRoZSBmaXJzdCBlbnRyeQ0KJSBkZW5vdGVzIHRoZSBzdGFydCBvZiBQREYgZGF0YSBpbiB0aGlzIGZpbGUuDQp4cmVmDQowIDEwDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTIgMDAwMDAgbg0KMDAwMDAwMDA5MiAwMDAwMCBuDQowMDAwMDAyNTQzIDAwMDAwIG4NCjAwMDAwMDI2MTUgMDAwMDAgbg0KMDAwMDAwMjc3OCAwMDAwMCBuDQowMDAwMDAzNTgzIDAwMDAwIG4NCjAwMDAwMDM4MDcgMDAwMDAgbg0KMDAwMDAwMzk2OCAwMDAwMCBuDQowMDAwMDA0NTIwIDAwMDAwIG4NCnRyYWlsZXINCjw8DQogIC9TaXplIDEwDQogIC9Sb290IDEgMCBSDQogIC9JRCBbIDwzMWM3YThhMjY5ZTRjNTliYzNjZDdkZjBkYWJiZjM4OD48MzFjN2E4YTI2OWU0YzU5YmMzY2Q3ZGYwZGFiYmYzODg+IF0NCj4+DQpzdGFydHhyZWYNCjQ4NDcNCiUlRU9GDQo=';
const samplePDFformFields = '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2YDpXwnTv0RNTX+HfWn6O9TRiz88Nf2dMP1r7Fcv/pJL/6oG07+Wefo77EvTv5YY+tfyrcUf56bp77AvQ3+DXEN/ixhDf4v6hv4WezH0N3Aziz/Oyizn/wamv8HZGvo7iae/k/r0d/A09LdrMP0d/qOhvxWmv8XZmsUf37X0L1HT0t/hv1j672ppvKXD0IK4I39aW3X3GFNby0WSfkYnD8H/vWvTOCFLnt+j6uBDCmVuZHN0cmVhbQplbmRvYmoKCjM0IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1RydWVUeXBlL0Jhc2VGb250L0NBQUFBQStBcmlhbE1UCi9GaXJzdENoYXIgMAovTGFzdENoYXIgNTAKL1dpZHRoc1s3NTAgNjEwIDU1NiAyMjIgNTAwIDI3NyA1NTYgNTU2IDU1NiA1MDAgODMzIDU1NiAyMjIgNTU2IDI3NyA1NTYKMzMzIDU1NiA2NjYgNzIyIDYxMCAyNzcgNzIyIDUwMCA1NTYgNTU2IDI3NyA3MjIgNzIyIDUwMCA1MDAgNzc3CjMzMyA1NTYgNTU2IDU1NiAzMzMgMjc3IDUwMCAzMzMgMjc3IDcyMiA3NzcgMjc3IDY2NiA1NTYgNTU2IDU1Ngo2NjYgNjY2IDUwMCBdCi9Gb250RGVzY3JpcHRvciAzMiAwIFIKL1RvVW5pY29kZSAzMyAwIFIKPj4KZW5kb2JqCgozNSAwIG9iago8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL0FyaWFsTVQKL0ZsYWdzIDQKL0ZvbnRCQm94Wy02NjQgLTMyNCAyMDAwIDEwMDZdL0l0YWxpY0FuZ2xlIDAKL0FzY2VudCA5MDUKL0Rlc2NlbnQgLTIxMQovQ2FwSGVpZ2h0IDEwMDUKL1N0ZW1WIDgwCj4+CmVuZG9iagoKMzYgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHJ1ZVR5cGUvQmFzZUZvbnQvQXJpYWxNVAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIgL0xhc3RDaGFyIDI1NQovV2lkdGhzWzI3NyAyNzcgMzU0IDU1NiA1NTYgODg5IDY2NiAxOTAgMzMzIDMzMyAzODkgNTgzIDI3NyAzMzMgMjc3IDI3Nwo1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjc3IDI3NyA1ODMgNTgzIDU4MyA1NTYKMTAxNSA2NjYgNjY2IDcyMiA3MjIgNjY2IDYxMCA3NzcgNzIyIDI3NyA1MDAgNjY2IDU1NiA4MzMgNzIyIDc3Nwo2NjYgNzc3IDcyMiA2NjYgNjEwIDcyMiA2NjYgOTQzIDY2NiA2NjYgNjEwIDI3NyAyNzcgMjc3IDQ2OSA1NTYKMzMzIDU1NiA1NTYgNTAwIDU1NiA1NTYgMjc3IDU1NiA1NTYgMjIyIDIyMiA1MDAgMjIyIDgzMyA1NTYgNTU2CjU1NiA1NTYgMzMzIDUwMCAyNzcgNTU2IDUwMCA3MjIgNTAwIDUwMCA1MDAgMzMzIDI1OSAzMzMgNTgzIDAKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMAowIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwCjI3NyAzMzMgNTU2IDU1NiA1NTYgNTU2IDI1OSA1NTYgMzMzIDczNiAzNzAgNTU2IDU4MyAzMzMgNzM2IDU1MgozOTkgNTQ4IDMzMyAzMzMgMzMzIDU3NiA1MzcgMjc3IDMzMyAzMzMgMzY1IDU1NiA4MzMgODMzIDgzMyA2MTAKNjY2IDY2NiA2NjYgNjY2IDY2NiA2NjYgMTAwMCA3MjIgNjY2IDY2NiA2NjYgNjY2IDI3NyAyNzcgMjc3IDI3Nwo3MjIgNzIyIDc3NyA3NzcgNzc3IDc3NyA3NzcgNTgzIDc3NyA3MjIgNzIyIDcyMiA3MjIgNjY2IDY2NiA2MTAKNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODg5IDUwMCA1NTYgNTU2IDU1NiA1NTYgMjc3IDI3NyAyNzcgMjc3CjU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NDggNjEwIDU1NiA1NTYgNTU2IDU1NiA1MDAgNTU2IDUwMApdCi9Gb250RGVzY3JpcHRvciAzNSAwIFI+PgplbmRvYmoKCjE1IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L1phcGZEaW5nYmF0cwo+PgplbmRvYmoKCjYgMCBvYmoKPDwvRjEgMjkgMCBSL0YyIDM0IDAgUi9GMyAzNiAwIFIvWmFEaSAxNSAwIFIKPj4KZW5kb2JqCgozNyAwIG9iago8PC9Gb250IDYgMCBSCi9YT2JqZWN0PDwvSW00IDQgMCBSPj4KL1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQy9JbWFnZUkvSW1hZ2VCXQo+PgplbmRvYmoKCjEgMCBvYmoKPDwvVHlwZS9QYWdlL1BhcmVudCAyNCAwIFIvUmVzb3VyY2VzIDM3IDAgUi9NZWRpYUJveFswIDAgNTk1IDg0Ml0vQW5ub3RzWwo1IDAgUiA3IDAgUiAyMyAwIFIgOCAwIFIgOSAwIFIgMTAgMCBSIDEzIDAgUiAxMSAwIFIgMjIgMCBSIDEyIDAgUiAxNCAwIFIgMTcgMCBSIDE4IDAgUiAxOSAwIFIgMjAgMCBSCjIxIDAgUiAxNiAwIFIgXQovR3JvdXA8PC9TL1RyYW5zcGFyZW5jeS9DUy9EZXZpY2VSR0IvSSB0cnVlPj4vQ29udGVudHMgMiAwIFI+PgplbmRvYmoKCjI0IDAgb2JqCjw8L1R5cGUvUGFnZXMKL1Jlc291cmNlcyAzNyAwIFIKL01lZGlhQm94WyAwIDAgNTk1IDg0MiBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgozOCAwIG9iago8PC9UeXBlL1hPYmplY3QKL1N1YnR5cGUvRm9ybQovQkJveFswIDAgMTQ5LjggMTQuNF0KL1Jlc291cmNlcyAzNyAwIFIKL0xlbmd0aCAxOAovRmlsdGVyL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nNMPqVBw8nXmcgViABQmAtcKZW5kc3RyZWFtCmVuZG9iagoKNSAwIG9iago8PC9UeXBlL0Fubm90L1N1YnR5cGUvV2lkZ2V0L0YgNAovUmVjdFsxNjUuNyA0NTMuNyAzMTUuNyA0NjcuOV0KL0ZUL1R4Ci9QIDEgMCBSCi9UKEdpdmVuIE5hbWUgVGV4dCBCb3gpCi9UVTxGRUZGMDA0NjAwNjkwMDcyMDA3MzAwNzQwMDIwMDA2RTAwNjEwMDZEMDA2NT4KL1YgPEZFRkY+Ci9EViA8RkVGRj4KL01heExlbiA0MAovRFI8PC9Gb250IDYgMCBSPj4KL0RBKDAgMCAwIHJnIC9GMyAxMSBUZikKL0FQPDwKL04gMzggMCBSCj4+Cj4+CmVuZG9iagoKMzkgMCBvYmoKPDwvVHlwZS9YT2JqZWN0Ci9TdWJ0eXBlL0Zvcm0KL0JCb3hbMCAwIDE0OS44IDE0LjRdCi9SZXNvdXJjZXMgMzcgMCBSCi9MZW5ndGggMTgKL0ZpbHRlci9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzTD6lQcPJ15nIFYgAUJgLXCmVuZHN0cmVhbQplbmRvYmoKCjcgMCBvYmoKPDwvVHlwZS9Bbm5vdC9TdWJ0eXBlL1dpZGdldC9GIDQKL1JlY3RbMTY1LjcgNDIxLjIgMzE1LjcgNDM1LjRdCi9GVC9UeAovUCAxIDAgUgovVChGYW1pbHkgTmFtZSBUZXh0IEJveCkKL1RVPEZFRkYwMDRDMDA2MTAwNzMwMDc0MDAyMDAwNkUwMDYxMDA2RDAwNjU+Ci9WIDxGRUZGPgovRFYgPEZFRkY+Ci9NYXhMZW4gNDAKL0RSPDwvRm9udCA2IDAgUj4+Ci9EQSgwIDAgMCByZyAvRjMgMTEgVGYpCi9BUDw8Ci9OIDM5IDAgUgo+Pgo+PgplbmRvYmoKCjQwIDAgb2JqCjw8L1R5cGUvWE9iamVjdAovU3VidHlwZS9Gb3JtCi9CQm94WzAgMCA2OC4zIDE0LjRdCi9SZXNvdXJjZXMgMzcgMCBSCi9MZW5ndGggMTgKL0ZpbHRlci9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzTD6lQcPJ15nIFYgAUJgLXCmVuZHN0cmVhbQplbmRvYmoKCjggMCBvYmoKPDwvVHlwZS9Bbm5vdC9TdWJ0eXBlL1dpZGdldC9GIDQKL1JlY3RbMzc4LjQgMzg4LjQgNDQ2LjkgNDAyLjZdCi9GVC9UeAovUCAxIDAgUgovVChIb3VzZSBuciBUZXh0IEJveCkKL1RVPEZFRkYwMDQ4MDA2RjAwNzUwMDczMDA2NTAwMjAwMDYxMDA2RTAwNjQwMDIwMDA2NjAwNkMwMDZGMDA2RjAwNzI+Ci9WIDxGRUZGPgovRFYgPEZFRkY+Ci9NYXhMZW4gMjAKL0RSPDwvRm9udCA2IDAgUj4+Ci9EQSgwIDAgMCByZyAvRjMgMTEgVGYpCi9BUDw8Ci9OIDQwIDAgUgo+Pgo+PgplbmRvYmoKCjQxIDAgb2JqCjw8L1R5cGUvWE9iamVjdAovU3VidHlwZS9Gb3JtCi9CQm94WzAgMCAxNDkuOCAxNC40XQovUmVzb3VyY2VzIDM3IDAgUgovTGVuZ3RoIDE4Ci9GaWx0ZXIvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnic0w+pUHDydeZyBWIAFCYC1wplbmRzdHJlYW0KZW5kb2JqCgo5IDAgb2JqCjw8L1R5cGUvQW5ub3QvU3VidHlwZS9XaWRnZXQvRiA0Ci9SZWN0WzE2NS43IDM2OC40IDMxNS43IDM4Mi42XQovRlQvVHgKL1AgMSAwIFIKL1QoQWRkcmVzcyAyIFRleHQgQm94KQovViA8RkVGRj4KL0RWIDxGRUZGPgovTWF4TGVuIDQwCi9EUjw8L0ZvbnQgNiAwIFI+PgovREEoMCAwIDAgcmcgL0YzIDExIFRmKQovQVA8PAovTiA0MSAwIFIKPj4KPj4KZW5kb2JqCgo0MiAwIG9iago8PC9UeXBlL1hPYmplY3QKL1N1YnR5cGUvRm9ybQovQkJveFswIDAgNzIuNiAxNC40XQovUmVzb3VyY2VzIDM3IDAgUgovTGVuZ3RoIDE4Ci9GaWx0ZXIvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnic0w+pUHDydeZyBWIAFCYC1wplbmRzdHJlYW0KZW5kb2JqCgoxMCAwIG9iago8PC9UeXBlL0Fubm90L1N1YnR5cGUvV2lkZ2V0L0YgNAovUmVjdFsxNjUuNyAzNDguNSAyMzguNSAzNjIuN10KL0ZUL1R4Ci9QIDEgMCBSCi9UKFBvc3Rjb2RlIFRleHQgQm94KQovViA8RkVGRj4KL0RWIDxGRUZGPgovTWF4TGVuIDIwCi9EUjw8L0ZvbnQgNiAwIFI+PgovREEoMCAwIDAgcmcgL0YzIDExIFRmKQovQVA8PAovTiA0MiAwIFIKPj4KPj4KZW5kb2JqCgo0MyAwIG9iago8PC9UeXBlL1hPYmplY3QKL1N1YnR5cGUvRm9ybQovQkJveFswIDAgMTQ5LjggMTQuNF0KL1Jlc291cmNlcyAzNyAwIFIKL0xlbmd0aCA0NwovRmlsdGVyL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nDNUMATConQuAwVdAz0g28RSzwJI6pkoFKUqpGlx6YdUKDj5OnO5AjEA0IUJdQplbmRzdHJlYW0KZW5kb2JqCgoxMSAwIG9iago8PC9UeXBlL0Fubm90L1N1YnR5cGUvV2lkZ2V0L0YgNAovUmVjdFsxNjUuNyAzMTUuOSAzMTUuNyAzMzAuMV0KL0ZUL0NoCi9QIDEgMCBSCi9UKENvdW50cnkgQ29tYm8gQm94KQovVFU8RkVGRjAwNTUwMDczMDA2NTAwMjAwMDczMDA2NTAwNkMwMDY1MDA2MzAwNzQwMDY5MDA2RjAwNkUwMDIwMDA2RjAwNzIwMDIwMDA3NzAwNzIwMDY5MDA3NDAwNjUwMDIwMDA2MzAwNkYwMDc1MDA2RTAwNzQwMDcyMDA3OTAwMjAwMDZFMDA2MTAwNkQwMDY1PgovRmYgMzkzMjE2Ci9WIDxGRUZGPgovRFYgPEZFRkY+Ci9PcHRbCjxGRUZGMDA0MTAwNzUwMDczMDA3NDAwNzIwMDY5MDA2MT4KPEZFRkYwMDQyMDA2NTAwNkMwMDY3MDA2OTAwNzUwMDZEPgo8RkVGRjAwNDIwMDcyMDA2OTAwNzQwMDYxMDA2OTAwNkU+CjxGRUZGMDA0MjAwNzUwMDZDMDA2NzAwNjEwMDcyMDA2OTAwNjE+CjxGRUZGMDA0MzAwNzIwMDZGMDA2MTAwNzQwMDY5MDA2MT4KPEZFRkYwMDQzMDA3OTAwNzAwMDcyMDA3NTAwNzM+CjxGRUZGMDA0MzAwN0EwMDY1MDA2MzAwNjgwMDJEMDA1MjAwNjUwMDcwMDA3NTAwNjIwMDZDMDA2OTAwNjM+CjxGRUZGMDA0NDAwNjUwMDZFMDA2RDAwNjEwMDcyMDA2Qj4KPEZFRkYwMDQ1MDA3MzAwNzQwMDZGMDA2RTAwNjkwMDYxPgo8RkVGRjAwNDYwMDY5MDA2RTAwNkMwMDYxMDA2RTAwNjQ+CjxGRUZGMDA0NjAwNzIwMDYxMDA2RTAwNjMwMDY1Pgo8RkVGRjAwNDcwMDY1MDA3MjAwNkQwMDYxMDA2RTAwNzk+CjxGRUZGMDA0NzAwNzIwMDY1MDA2NTAwNjMwMDY1Pgo8RkVGRjAwNDgwMDc1MDA2RTAwNjcwMDYxMDA3MjAwNzk+CjxGRUZGMDA0OTAwNzIwMDY1MDA2QzAwNjEwMDZFMDA2ND4KPEZFRkYwMDQ5MDA3NDAwNjEwMDZDMDA3OT4KPEZFRkYwMDRDMDA2MTAwNzQwMDc2MDA2OTAwNjE+CjxGRUZGMDA0QzAwNjkwMDc0MDA2ODAwNzUwMDYxMDA2RTAwNjkwMDYxPgo8RkVGRjAwNEMwMDc1MDA3ODAwNjUwMDZEMDA2MjAwNkYwMDc1MDA3MjAwNjc+CjxGRUZGMDA0RDAwNjEwMDZDMDA3NDAwNjE+CjxGRUZGMDA0RTAwNjUwMDc0MDA2ODAwNjUwMDcyMDA2QzAwNjEwMDZFMDA2NDAwNzM+CjxGRUZGMDA1MDAwNkYwMDZDMDA2MTAwNkUwMDY0Pgo8RkVGRjAwNTAwMDZGMDA3MjAwNzQwMDc1MDA2NzAwNjEwMDZDPgo8RkVGRjAwNTIwMDZGMDA2RDAwNjEwMDZFMDA2OTAwNjE+CjxGRUZGMDA1MzAwNkMwMDZGMDA3NjAwNjEwMDZCMDA2OTAwNjE+CjxGRUZGMDA1MzAwNkMwMDZGMDA3NjAwNjUwMDZFMDA2OTAwNjE+CjxGRUZGMDA1MzAwNzAwMDYxMDA2OTAwNkU+CjxGRUZGMDA1MzAwNzcwMDY1MDA2NDAwNjUwMDZFPgpdCi9EUjw8L0ZvbnQgNiAwIFI+PgovREEoMCAwIDAgcmcgL0YzIDExIFRmKQovQVA8PAovTiA0MyAwIFIKPj4KPj4KZW5kb2JqCgo0NCAwIG9iago8PC9UeXBlL1hPYmplY3QKL1N1YnR5cGUvRm9ybQovQkJveFswIDAgNzIuMSAxNC40XQovUmVzb3VyY2VzIDM3IDAgUgovTGVuZ3RoIDE4Ci9GaWx0ZXIvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnic0w+pUHDydeZyBWIAFCYC1wplbmRzdHJlYW0KZW5kb2JqCgoxMiAwIG9iago8PC9UeXBlL0Fubm90L1N1YnR5cGUvV2lkZ2V0L0YgNAovUmVjdFsxNjUuNyAyNTAuOCAyMzggMjY1XQovRlQvVHgKL1AgMSAwIFIKL1QoSGVpZ2h0IEZvcm1hdHRlZCBGaWVsZCkKL1RVPEZFRkYwMDU2MDA2MTAwNkMwMDc1MDA2NTAwMjAwMDY2MDA3MjAwNkYwMDZEMDAyMDAwMzQwMDMwMDAyMDAwNzQwMDZGMDAyMDAwMzIwMDM1MDAzMDAwMjAwMDYzMDA2RD4KL1YgPEZFRkYwMDMxMDAzNTAwMzA+Ci9EViA8RkVGRjAwMzEwMDM1MDAzMD4KL01heExlbiAyMAovRFI8PC9Gb250IDYgMCBSPj4KL0RBKDAgMCAwIHJnIC9GMyAxMSBUZikKL0FQPDwKL04gNDQgMCBSCj4+Cj4+CmVuZG9iagoKNDUgMCBvYmoKPDwvVHlwZS9YT2JqZWN0Ci9TdWJ0eXBlL0Zvcm0KL0JCb3hbMCAwIDE0OS45IDE0LjRdCi9SZXNvdXJjZXMgMzcgMCBSCi9MZW5ndGggMTgKL0ZpbHRlci9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzTD6lQcPJ15nIFYgAUJgLXCmVuZHN0cmVhbQplbmRvYmoKCjEzIDAgb2JqCjw8L1R5cGUvQW5ub3QvU3VidHlwZS9XaWRnZXQvRiA0Ci9SZWN0WzI5Ny4xIDM0OC41IDQ0Ny4yIDM2Mi43XQovRlQvVHgKL1AgMSAwIFIKL1QoQ2l0eSBUZXh0IEJveCkKL1YgPEZFRkY+Ci9EViA8RkVGRj4KL01heExlbiA0MAovRFI8PC9Gb250IDYgMCBSPj4KL0RBKDAgMCAwIHJnIC9GMyAxMSBUZikKL0FQPDwKL04gNDUgMCBSCj4+Cj4+CmVuZG9iagoKNDYgMCBvYmoKPDwvVHlwZS9YT2JqZWN0Ci9TdWJ0eXBlL0Zvcm0KL0JCb3hbMCAwIDExLjEgMTEuMV0KL1Jlc291cmNlcyAzNyAwIFIKL0xlbmd0aCA2NQovRmlsdGVyL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nNMPqVBw8nXmKlRwCuEyUADBonQF/ahEl0wFQ0M9Q4WQNC5DPQsFEA5JUdCw0FQIyeJyDeEK5HIFagMAz/4OAgplbmRzdHJlYW0KZW5kb2JqCgo0NyAwIG9iago8PC9UeXBlL1hPYmplY3QKL1N1YnR5cGUvRm9ybQovQkJveFswIDAgMTEuMSAxMS4xXQovUmVzb3VyY2VzIDM3IDAgUgovTGVuZ3RoIDE4Ci9GaWx0ZXIvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnic0w+pUHDydeZyBWIAFCYC1wplbmRzdHJlYW0KZW5kb2JqCgoxNCAwIG9iago8PC9UeXBlL0Fubm90L1N1YnR5cGUvV2lkZ2V0L0YgNAovUmVjdFsxNjQuMSAyMjEuNCAxNzUuNCAyMzIuM10KL0ZUL0J0bgovUCAxIDAgUgovVChEcml2aW5nIExpY2Vuc2UgQ2hlY2sgQm94KQovVFU8RkVGRjAwNDMwMDYxMDA3MjAwMjAwMDY0MDA3MjAwNjkwMDc2MDA2OTAwNkUwMDY3MDAyMDAwNkMwMDY5MDA2MzAwNjUwMDZFMDA3MzAwNjU+Ci9WIC9PZmYKL0RWIC9PZmYKL0RSPDwvRm9udDw8L1phRGkgMTUgMCBSPj4+PgovREEoMCAwIDAgcmcgL1phRGkgMCBUZikKL01LPDwvQ0EoOCk+PgovQVA8PAovTjw8IC9ZZXMgNDYgMCBSIC9PZmYgNDcgMCBSPj4KPj4KL0FTIC9PZmYKPj4KZW5kb2JqCgo0OCAwIG9iago8PC9UeXBlL1hPYmplY3QKL1N1YnR5cGUvRm9ybQovQkJveFswIDAgMTU2LjkgMTQuNF0KL1Jlc291cmNlcyAzNyAwIFIKL0xlbmd0aCA1MAovRmlsdGVyL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nDNUMFQw0DNTKErnMlAwUDA0NdOzVDA00TNRKEpVSNPi0g+pUHDydeZyBWIAyHEJSwplbmRzdHJlYW0KZW5kb2JqCgoxNiAwIG9iago8PC9UeXBlL0Fubm90L1N1YnR5cGUvV2lkZ2V0L0YgNAovUmVjdFsxNjUuNyAxNDMuNCAzMjIuOCAxNTcuNl0KL0ZUL0NoCi9QIDEgMCBSCi9UKEZhdm91cml0ZSBDb2xvdXIgTGlzdCBCb3gpCi9UVTxGRUZGMDA1MzAwNjUwMDZDMDA2NTAwNjMwMDc0MDAyMDAwNjYwMDcyMDA2RjAwNkQwMDIwMDA2MzAwNkYwMDZDMDA2RjAwNzUwMDcyMDAyMDAwNzMwMDcwMDA2NTAwNjMwMDc0MDA3MjAwNzUwMDZEPgovRmYgMTMxMDcyCi9WIDxGRUZGMDA1MjAwNjUwMDY0PgovRFYgPEZFRkYwMDUyMDA2NTAwNjQ+Ci9PcHRbCjxGRUZGMDA0MjAwNkMwMDYxMDA2MzAwNkI+CjxGRUZGMDA0MjAwNzIwMDZGMDA3NzAwNkU+CjxGRUZGMDA1MjAwNjUwMDY0Pgo8RkVGRjAwNEYwMDcyMDA2MTAwNkUwMDY3MDA2NT4KPEZFRkYwMDU5MDA2NTAwNkMwMDZDMDA2RjAw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RkYwMDUzMDA2NTAwNkMwMDY1MDA2MzAwNzQwMDIwMDA2NjAwNzIwMDZGMDA2RDAwMjAwMDZDMDA2OTAwNzMwMDc0PgovRmYgMTMxMDcyCi9WIDxGRUZGMDA0RDAwNjEwMDZFPgovRFYgPEZFRkYwMDREMDA2MTAwNkU+Ci9PcHRbCjxGRUZGMDA0RDAwNjEwMDZFPgo8RkVGRjAwNTcwMDZGMDA2RDAwNjEwMDZFPgpdCi9EUjw8L0ZvbnQgNiAwIFI+PgovREEoMCAwIDAgcmcgL0YzIDExIFRmKQovQVA8PAovTiA1OSAwIFIKPj4KPj4KZW5kb2JqCgo2MCAwIG9iago8PC9UeXBlL1hPYmplY3QKL1N1YnR5cGUvRm9ybQovQkJveFswIDAgMTQ5LjggMTQuNF0KL1Jlc291cmNlcyAzNyAwIFIKL0xlbmd0aCAxOAovRmlsdGVyL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nNMPqVBw8nXmcgViABQmAtcKZW5kc3RyZWFtCmVuZG9iagoKMjMgMCBvYmoKPDwvVHlwZS9Bbm5vdC9TdWJ0eXBlL1dpZGdldC9GIDQKL1JlY3RbMTY1LjcgMzg4LjMgMzE1LjcgNDAyLjVdCi9GVC9UeAovUCAxIDAgUgovVChBZGRyZXNzIDEgVGV4dCBCb3gpCi9WIDxGRUZGPgovRFYgPEZFRkY+Ci9NYXhMZW4gNDAKL0RSPDwvRm9udCA2IDAgUj4+Ci9EQSgwIDAgMCByZyAvRjMgMTEgVGYpCi9BUDw8Ci9OIDYwIDAgUgo+Pgo+PgplbmRvYmoKCjYxIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyNCAwIFIKL09wZW5BY3Rpb25bMSAwIFIgL1hZWiBudWxsIG51bGwgMF0KL1ZpZXdlclByZWZlcmVuY2VzPDwvRGlzcGxheURvY1RpdGxlIHRydWUKPj4KL0xhbmcoZW4tR0IpCi9BY3JvRm9ybTw8L0ZpZWxkc1sKNSAwIFIgNyAwIFIgOCAwIFIgOSAwIFIgMTAgMCBSCjExIDAgUiAxMiAwIFIgMTMgMCBSIDE0IDAgUiAxNiAwIFIKMTcgMCBSIDE4IDAgUiAxOSAwIFIgMjAgMCBSIDIxIDAgUgoyMiAwIFIgMjMgMCBSIApdL0RSIDM3IDAgUi9OZWVkQXBwZWFyYW5jZXMgdHJ1ZT4+Cj4+CmVuZG9iagoKNjIgMCBvYmoKPDwvVGl0bGU8RkVGRjAwNTAwMDQ0MDA0NjAwMjAwMDQ2MDA2RjAwNzIwMDZEMDAyMDAwNDUwMDc4MDA2MTAwNkQwMDcwMDA2QzAwNjU+Ci9LZXl3b3JkczxGRUZGMDA1MDAwNDQwMDQ2MDAyMDAwNDYwMDZGMDA3MjAwNkQ+Ci9DcmVhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0RjAwNzAwMDY1MDA2RTAwNEYwMDY2MDA2NjAwNjkwMDYzMDA2NTAwMkUwMDZGMDA3MjAwNjcwMDIwMDAzMzAwMkUwMDM0PgovQ3JlYXRpb25EYXRlKEQ6MjAxMzA2MjkyMDQ4NTMrMDInMDAnKT4+CmVuZG9iagoKeHJlZgowIDYzCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDA1MzIzMCAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDE3ODUgMDAwMDAgbiAKMDAwMDAwMTgwNiAwMDAwMCBuIAowMDAwMDUzNzU3IDAwMDAwIG4gCjAwMDAwNTMwNjggMDAwMDAgbiAKMDAwMDA1NDE4MSAwMDAwMCBuIAowMDAwMDU0NjAxIDAwMDAwIG4gCjAwMDAwNTUwNDMgMDAwMDAgbiAKMDAwMDA1NTQxNSAwMDAwMCBuIAowMDAwMDU1ODE3IDAwMDAwIG4gCjAwMDAwNTczNTkgMDAwMDAgbiAKMDAwMDA1Nzg1OSAwMDAwMCBuIAowMDAwMDU4NDMwIDAwMDAwIG4gCjAwMDAwNTI5OTkgMDAwMDAgbiAKMDAwMDA1ODk3MCAwMDAwMCBuIAowMDAwMDU5OTY5IDAwMDAwIG4gCjAwMDAwNjA1ODQgMDAwMDAgbiAKMDAwMDA2MTIwMyAwMDAwMCBuIAowMDAwMDYxODIyIDAwMDAwIG4gCjAwMDAwNjI0NDEgMDAwMDAgbiAKMDAwMDA2Mjg4NSAwMDAwMCBuIAowMDAwMDYzNDA4IDAwMDAwIG4gCjAwMDAwNTM1MDAgMDAwMDAgbiAKMDAwMDAxNjU2NCAwMDAwMCBuIAowMDAwMDI4ODI0IDAwMDAwIG4gCjAwMDAwMjg4NDcgMDAwMDAgbiAKMDAwMDAyOTA0MyAwMDAwMCBuIAowMDAwMDI5NDE0IDAwMDAwIG4gCjAwMDAwMjk2NDIgMDAwMDAgbiAKMDAwMDA1MDc2NCAwMDAwMCBuIAowMDAwMDUwNzg3IDAwMDAwIG4gCjAwMDAwNTA5NzggMDAwMDAgbiAKMDAwMDA1MTQ5MyAwMDAwMCBuIAowMDAwMDUxODQ4IDAwMDAwIG4gCjAwMDAwNTIwMTQgMDAwMDAgbiAKMDAwMDA1MzEzMiAwMDAwMCBuIAowMDAwMDUzNjAwIDAwMDAwIG4gCjAwMDAwNTQwMjQgMDAwMDAgbiAKMDAwMDA1NDQ0NSAwMDAwMCBuIAowMDAwMDU0ODg2IDAwMDAwIG4gCjAwMDAwNTUyNTkgMDAwMDAgbiAKMDAwMDA1NTYzMSAwMDAwMCBuIAowMDAwMDU3MjAzIDAwMDAwIG4gCjAwMDAwNTc3MDIgMDAwMDAgbiAKMDAwMDA1ODA3MSAwMDAwMCBuIAowMDAwMDU4Mjc0IDAwMDAwIG4gCjAwMDAwNTg3ODEgMDAwMDAgbiAKMDAwMDA1OTYxMCAwMDAwMCBuIAowMDAwMDU5ODEzIDAwMDAwIG4gCjAwMDAwNjAyMjUgMDAwMDAgbiAKMDAwMDA2MDQyOCAwMDAwMCBuIAowMDAwMDYwODQ0IDAwMDAwIG4gCjAwMDAwNjEwNDcgMDAwMDAgbiAKMDAwMDA2MTQ2MyAwMDAwMCBuIAowMDAwMDYxNjY2IDAwMDAwIG4gCjAwMDAwNjIwODIgMDAwMDAgbiAKMDAwMDA2MjI4NSAwMDAwMCBuIAowMDAwMDYyNzAxIDAwMDAwIG4gCjAwMDAwNjMyNTEgMDAwMDAgbiAKMDAwMDA2MzYyNSAwMDAwMCBuIAowMDAwMDYzOTM5IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2My9Sb290IDYxIDAgUgovSW5mbyA2MiAwIFIKL0lEIFsgPDVFMEE1NTM1NTU2MjJBMDUxNkU5ODc3Q0E1NTIxN0E2Pgo8NUUwQTU1MzU1NTYyMkEwNTE2RTk4NzdDQTU1MjE3QTY+IF0KL0RvY0NoZWNrc3VtIC9CMzg2MjMyQkE5OUYyNjE1MUU1OUVENUQzQzY1N0QxQwo+PgpzdGFydHhyZWYKNjQyNTEKJSVFT0YK';
const sampleXML = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPENBVEFMT0c+CiAgPFBMQU5UPgogICAgPENPTU1PTj5CbG9vZHJvb3Q8L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+U2FuZ3VpbmFyaWEgY2FuYWRlbnNpczwvQk9UQU5JQ0FMPgogICAgPFpPTkU+NDwvWk9ORT4KICAgIDxMSUdIVD5Nb3N0bHkgU2hhZHk8L0xJR0hUPgogICAgPFBSSUNFPiQyLjQ0PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDMxNTk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkNvbHVtYmluZTwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5BcXVpbGVnaWEgY2FuYWRlbnNpczwvQk9UQU5JQ0FMPgogICAgPFpPTkU+MzwvWk9ORT4KICAgIDxMSUdIVD5Nb3N0bHkgU2hhZHk8L0xJR0hUPgogICAgPFBSSUNFPiQ5LjM3PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDMwNjk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPk1hcnNoIE1hcmlnb2xkPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkNhbHRoYSBwYWx1c3RyaXM8L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+TW9zdGx5IFN1bm55PC9MSUdIVD4KICAgIDxQUklDRT4kNi44MTwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjA1MTc5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5Db3dzbGlwPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkNhbHRoYSBwYWx1c3RyaXM8L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+TW9zdGx5IFNoYWR5PC9MSUdIVD4KICAgIDxQUklDRT4kOS45MDwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjAzMDY5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5EdXRjaG1hbidzLUJyZWVjaGVzPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkRpY2VudHJhIGN1Y3VsbGFyaWE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjM8L1pPTkU+CiAgICA8TElHSFQ+TW9zdGx5IFNoYWR5PC9MSUdIVD4KICAgIDxQUklDRT4kNi40NDwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjAxMjA5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5HaW5nZXIsIFdpbGQ8L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+QXNhcnVtIGNhbmFkZW5zZTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+MzwvWk9ORT4KICAgIDxMSUdIVD5Nb3N0bHkgU2hhZHk8L0xJR0hUPgogICAgPFBSSUNFPiQ5LjAzPC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDQxODk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkhlcGF0aWNhPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkhlcGF0aWNhIGFtZXJpY2FuYTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+NDwvWk9ORT4KICAgIDxMSUdIVD5Nb3N0bHkgU2hhZHk8L0xJR0hUPgogICAgPFBSSUNFPiQ0LjQ1PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDEyNjk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkxpdmVybGVhZjwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5IZXBhdGljYSBhbWVyaWNhbmE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+TW9zdGx5IFNoYWR5PC9MSUdIVD4KICAgIDxQUklDRT4kMy45OTwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjAxMDI5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5KYWNrLUluLVRoZS1QdWxwaXQ8L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+QXJpc2FlbWEgdHJpcGh5bGx1bTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+NDwvWk9ORT4KICAgIDxMSUdIVD5Nb3N0bHkgU2hhZHk8L0xJR0hUPgogICAgPFBSSUNFPiQzLjIzPC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDIwMTk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPk1heWFwcGxlPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPlBvZG9waHlsbHVtIHBlbHRhdHVtPC9CT1RBTklDQUw+CiAgICA8Wk9ORT4zPC9aT05FPgogICAgPExJR0hUPk1vc3RseSBTaGFkeTwvTElHSFQ+CiAgICA8UFJJQ0U+JDIuOTg8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wNjA1OTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+UGhsb3gsIFdvb2RsYW5kPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPlBobG94IGRpdmFyaWNhdGE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjM8L1pPTkU+CiAgICA8TElHSFQ+U3VuIG9yIFNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kMi44MDwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjAxMjI5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5QaGxveCwgQmx1ZTwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5QaGxveCBkaXZhcmljYXRhPC9CT1RBTklDQUw+CiAgICA8Wk9ORT4zPC9aT05FPgogICAgPExJR0hUPlN1biBvciBTaGFkZTwvTElHSFQ+CiAgICA8UFJJQ0U+JDUuNTk8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wMjE2OTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+U3ByaW5nLUJlYXV0eTwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5DbGF5dG9uaWEgVmlyZ2luaWNhPC9CT1RBTklDQUw+CiAgICA8Wk9ORT43PC9aT05FPgogICAgPExJR0hUPk1vc3RseSBTaGFkeTwvTElHSFQ+CiAgICA8UFJJQ0U+JDYuNTk8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wMjAxOTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+VHJpbGxpdW08L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+VHJpbGxpdW0gZ3JhbmRpZmxvcnVtPC9CT1RBTklDQUw+CiAgICA8Wk9ORT41PC9aT05FPgogICAgPExJR0hUPlN1biBvciBTaGFkZTwvTElHSFQ+CiAgICA8UFJJQ0U+JDMuOTA8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wNDI5OTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+V2FrZSBSb2JpbjwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5UcmlsbGl1bSBncmFuZGlmbG9ydW08L0JPVEFOSUNBTD4KICAgIDxaT05FPjU8L1pPTkU+CiAgICA8TElHSFQ+U3VuIG9yIFNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kMy4yMDwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjAyMjE5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5WaW9sZXQsIERvZy1Ub290aDwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5Fcnl0aHJvbml1bSBhbWVyaWNhbnVtPC9CT1RBTklDQUw+CiAgICA8Wk9ORT40PC9aT05FPgogICAgPExJR0hUPlNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kOS4wNDwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjAyMDE5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5Ucm91dCBMaWx5PC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkVyeXRocm9uaXVtIGFtZXJpY2FudW08L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+U2hhZGU8L0xJR0hUPgogICAgPFBSSUNFPiQ2Ljk0PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDMyNDk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkFkZGVyJ3MtVG9uZ3VlPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkVyeXRocm9uaXVtIGFtZXJpY2FudW08L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+U2hhZGU8L0xJR0hUPgogICAgPFBSSUNFPiQ5LjU4PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDQxMzk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkFuZW1vbmU8L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+QW5lbW9uZSBibGFuZGE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjY8L1pPTkU+CiAgICA8TElHSFQ+TW9zdGx5IFNoYWR5PC9MSUdIVD4KICAgIDxQUklDRT4kOC44NjwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjEyMjY5ODwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5HcmVjaWFuIFdpbmRmbG93ZXI8L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+QW5lbW9uZSBibGFuZGE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjY8L1pPTkU+CiAgICA8TElHSFQ+TW9zdGx5IFNoYWR5PC9MSUdIVD4KICAgIDxQUklDRT4kOS4xNjwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjA3MTA5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5CZWUgQmFsbTwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5Nb25hcmRhIGRpZHltYTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+NDwvWk9ORT4KICAgIDxMSUdIVD5TaGFkZTwvTElHSFQ+CiAgICA8UFJJQ0U+JDQuNTk8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wNTAzOTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+QmVyZ2Ftb3Q8L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+TW9uYXJkYSBkaWR5bWE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+U2hhZGU8L0xJR0hUPgogICAgPFBSSUNFPiQ3LjE2PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDQyNzk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkJsYWNrLUV5ZWQgU3VzYW48L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+UnVkYmVja2lhIGhpcnRhPC9CT1RBTklDQUw+CiAgICA8Wk9ORT5Bbm51YWw8L1pPTkU+CiAgICA8TElHSFQ+U3Vubnk8L0xJR0hUPgogICAgPFBSSUNFPiQ5LjgwPC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDYxODk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkJ1dHRlcmN1cDwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5SYW51bmN1bHVzPC9CT1RBTklDQUw+CiAgICA8Wk9ORT40PC9aT05FPgogICAgPExJR0hUPlNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kMi41NzwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjA2MTA5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5Dcm93Zm9vdDwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5SYW51bmN1bHVzPC9CT1RBTklDQUw+CiAgICA8Wk9ORT40PC9aT05FPgogICAgPExJR0hUPlNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kOS4zNDwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjA0MDM5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5CdXR0ZXJmbHkgV2VlZDwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5Bc2NsZXBpYXMgdHViZXJvc2E8L0JPVEFOSUNBTD4KICAgIDxaT05FPkFubnVhbDwvWk9ORT4KICAgIDxMSUdIVD5TdW5ueTwvTElHSFQ+CiAgICA8UFJJQ0U+JDIuNzg8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wNjMwOTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+Q2lucXVlZm9pbDwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5Qb3RlbnRpbGxhPC9CT1RBTklDQUw+CiAgICA8Wk9ORT5Bbm51YWw8L1pPTkU+CiAgICA8TElHSFQ+U2hhZGU8L0xJR0hUPgogICAgPFBSSUNFPiQ3LjA2PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDUyNTk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPlByaW1yb3NlPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPk9lbm90aGVyYTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+MyAtIDU8L1pPTkU+CiAgICA8TElHSFQ+U3Vubnk8L0xJR0hUPgogICAgPFBSSUNFPiQ2LjU2PC9QUklDRT4KICAgIDxBVkFJTEFCSUxJVFk+MDEzMDk5PC9BVkFJTEFCSUxJVFk+CiAgPC9QTEFOVD4KICA8UExBTlQ+CiAgICA8Q09NTU9OPkdlbnRpYW48L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+R2VudGlhbmE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+U3VuIG9yIFNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kNy44MTwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjA1MTg5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5CbHVlIEdlbnRpYW48L0NPTU1PTj4KICAgIDxCT1RBTklDQUw+R2VudGlhbmE8L0JPVEFOSUNBTD4KICAgIDxaT05FPjQ8L1pPTkU+CiAgICA8TElHSFQ+U3VuIG9yIFNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kOC41NjwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjA1MDI5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5KYWNvYidzIExhZGRlcjwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5Qb2xlbW9uaXVtIGNhZXJ1bGV1bTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+QW5udWFsPC9aT05FPgogICAgPExJR0hUPlNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kOS4yNjwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjAyMjE5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5HcmVlayBWYWxlcmlhbjwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5Qb2xlbW9uaXVtIGNhZXJ1bGV1bTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+QW5udWFsPC9aT05FPgogICAgPExJR0hUPlNoYWRlPC9MSUdIVD4KICAgIDxQUklDRT4kNC4zNjwvUFJJQ0U+CiAgICA8QVZBSUxBQklMSVRZPjA3MTQ5OTwvQVZBSUxBQklMSVRZPgogIDwvUExBTlQ+CiAgPFBMQU5UPgogICAgPENPTU1PTj5DYWxpZm9ybmlhIFBvcHB5PC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkVzY2hzY2hvbHppYSBjYWxpZm9ybmljYTwvQk9UQU5JQ0FMPgogICAgPFpPTkU+QW5udWFsPC9aT05FPgogICAgPExJR0hUPlN1bjwvTElHSFQ+CiAgICA8UFJJQ0U+JDcuODk8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wMzI3OTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+U2hvb3RpbmcgU3RhcjwvQ09NTU9OPgogICAgPEJPVEFOSUNBTD5Eb2RlY2F0aGVvbjwvQk9UQU5JQ0FMPgogICAgPFpPTkU+QW5udWFsPC9aT05FPgogICAgPExJR0hUPk1vc3RseSBTaGFkeTwvTElHSFQ+CiAgICA8UFJJQ0U+JDguNjA8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wNTEzOTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+U25ha2Vyb290PC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkNpbWljaWZ1Z2E8L0JPVEFOSUNBTD4KICAgIDxaT05FPkFubnVhbDwvWk9ORT4KICAgIDxMSUdIVD5TaGFkZTwvTElHSFQ+CiAgICA8UFJJQ0U+JDUuNjM8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wNzExOTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgogIDxQTEFOVD4KICAgIDxDT01NT04+Q2FyZGluYWwgRmxvd2VyPC9DT01NT04+CiAgICA8Qk9UQU5JQ0FMPkxvYmVsaWEgY2FyZGluYWxpczwvQk9UQU5JQ0FMPgogICAgPFpPTkU+MjwvWk9ORT4KICAgIDxMSUdIVD5TaGFkZTwvTElHSFQ+CiAgICA8UFJJQ0U+JDMuMDI8L1BSSUNFPgogICAgPEFWQUlMQUJJTElUWT4wMjIyOTk8L0FWQUlMQUJJTElUWT4KICA8L1BMQU5UPgo8L0NBVEFMT0c+Cg=='