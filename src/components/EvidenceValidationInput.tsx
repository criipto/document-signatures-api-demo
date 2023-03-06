import React from "react";

type SignatoryEvidenceValidationInput = {
  key: string;
  value: string;
};

interface HasEvidenceValidation {
  evidenceValidation?: Array<SignatoryEvidenceValidationInput> | null;
}

interface Props<T> {
  item: T,
  onChange: (list: Array<SignatoryEvidenceValidationInput>) => void
}

export function filterEvidenceValidation(input: SignatoryEvidenceValidationInput[] | null | undefined) {
  if (!input) return input;
  return input.filter(i => i.key && i.value);
}

export default function EvidenceValidationInput<T extends HasEvidenceValidation>(props: Props<T>) {
  const list = props.item.evidenceValidation || [];

  const handleChange = (ev: SignatoryEvidenceValidationInput, key: keyof SignatoryEvidenceValidationInput, value: string) => {
    props.onChange(list.map(s => {
      if (s === ev) {
        return {
          ...s,
          [key]: value
        };
      }
      return s;
    }));
  }

  const handleAdd = () => {
    props.onChange(list.concat([{key: '', value: ''}]));
  }

  const handleRemove = (ev: SignatoryEvidenceValidationInput) => {
    props.onChange(list.filter(s => s !== ev));
  }

  return (
    <React.Fragment>
      {list.map((ev, index) => (
        <div className="row" key={index}>
          <div className="col-5">
            <div className="mb-3 form-floating">
              <input
                className="form-control"
                type="text"
                onChange={(event) => handleChange(ev, 'key', event.target.value)}
                value={ev.key}
                placeholder="Key"
                required
              />
              <label className="form-label">Key</label>
            </div>
          </div>
          <div className="col-5">
            <div className="mb-3 form-floating">
              <input
                className="form-control"
                type="text"
                onChange={(event) => handleChange(ev, 'value', event.target.value)}
                value={ev.value}
                placeholder="Value"
                required
              />
              <label className="form-label">Value</label>
            </div>
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-danger" onClick={() => handleRemove(ev)}>X</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary" onClick={handleAdd}>Add evidence validation</button>
    </React.Fragment>
  );
}