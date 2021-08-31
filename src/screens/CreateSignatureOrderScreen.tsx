import React, {useState} from 'react';

import { useLazyLoadQuery, useMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { useHistory } from 'react-router-dom';

import {CreateSignatureOrderScreenMutation, DocumentInput} from './__generated__/CreateSignatureOrderScreenMutation.graphql';
import {CreateSignatureOrderScreenQuery} from './__generated__/CreateSignatureOrderScreenQuery.graphql';

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
  const [documents, setDocuments] = useState<LocalDocumentInput[]>([]);
  const [error, setError] = useState('');
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
    {},
    {fetchPolicy: 'store-and-network'}
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

  const [commit, inFlight] = useMutation<CreateSignatureOrderScreenMutation>(
    graphql`
      mutation CreateSignatureOrderScreenMutation($input: CreateSignatureOrderInput!) {
        createSignatureOrder(input: $input) {
          signatureOrder {
            id
          }
        }
      }
    `
  );

  if (application.__typename !== 'Application') return null;

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    if (!formValid) return;
    if (inFlight) return;

    commit({
      variables: {
        input: {
          applicationId: application.id,
          documents
        }
      },
      onCompleted: (response, errors) => {
        if (errors) {
          setError(errors[0].message);
          return;
        }

        history.push(`/signatureorders/${response.createSignatureOrder?.signatureOrder.id}`);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
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
                <label className="form-label">Title</label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-3">
        <label htmlFor="pdf_file_select" className="form-label">Add document</label>
        <input className="form-control" type="file" id="pdf_file_select" multiple onChange={handleAddDocument} />
      </div>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={!formValid || inFlight}>Create signature order</button>
    </form>
  )
}