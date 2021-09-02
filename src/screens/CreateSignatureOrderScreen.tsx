import React, {useState} from 'react';

import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { useHistory } from 'react-router-dom';

import {CreateSignatureOrderScreenMutation, DocumentInput} from './__generated__/CreateSignatureOrderScreenMutation.graphql';
import {CreateSignatureOrderScreenQuery} from './__generated__/CreateSignatureOrderScreenQuery.graphql';

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
  const [documents, setDocuments] = useState<LocalDocumentInput[]>([]);
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

  console.log(application);

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    if (!formValid) return;
    if (status.pending) return;

    executor.executePromise({
      input: {
        title,
        documents
      }
    })
    .then((response) => {
      history.push(`/signatureorders/${response.createSignatureOrder?.signatureOrder.id}`);
    })
    .catch(console.error)
  }

  return (
    <form onSubmit={handleSubmit}>
       <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title || ''}
            placeholder="Signature order title"
            required
          />
          <label className="form-label">Signature order title</label>
        </div>
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
      {status.error && (
        <div className="alert alert-danger">
          {status.error}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={!formValid || status.pending}>Create signature order</button>
    </form>
  )
}