import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import useMutation from "../hooks/useMutation";
import { ValidateDocumentScreenMutation } from './__generated__/ValidateDocumentScreenMutation.graphql';

export default function ValidateDocumentScreen() {
  const [type, setType] = useState<'pdf' | 'xml'>('pdf');
  const [result, setResult] = useState<ValidateDocumentScreenMutation["response"]["validateDocument"] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [executor, status] = useMutation<ValidateDocumentScreenMutation>(
    graphql`
      mutation ValidateDocumentScreenMutation($input: ValidateDocumentInput!) {
        validateDocument(input: $input) {
          errors
          fixable
        }
      }
    `
  );

  const handleSubmit = async (event : React.FormEvent) => {
    if (status.pending) return;
    if (!file) return;
    event.preventDefault();

    const data = await toBase64(file);

    await executor.executePromise({
      input: {
        pdf: type === 'pdf' ? data : null,
        xml: type === 'xml' ? data : null,
      }
    }).then(response => {
      setResult(response.validateDocument);
    });
  }

  const handleAddfile = async (event : React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    const file = event.target.files![0];
    setFile(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Validate document</h4>
      <div className="mb-3 form-floating">
        <select
          className="form-control"
          onChange={(event) => setType(event.target.value as any)}
          value={type}
          placeholder="Type"
        >
          <option value={'pdf'} key={'pdf'}>{'pdf'}</option>
          <option value={'xml'} key={'xml'}>{'xml'}</option>
        </select>
        <label className="form-label">Type</label>
      </div>
      <div className="mb-3">
        <label htmlFor="file_select" className="form-label"><strong>Select file</strong></label>
        <input className="form-control" type="file" id="file_select" onChange={handleAddfile} />
      </div>
      {status.error && (
        <div className="alert alert-danger">
          {status.error.message}
        </div>
      )}
      {result && (
        <div className="alert">
          <pre>{JSON.stringify(result)}</pre>
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={status.pending}>Validate</button>
    </form>
  );
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