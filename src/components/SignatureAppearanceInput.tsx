import React from 'react';
import { SignatureAppearanceInput as SignatureAppearanceInputType, SignatureAppearanceTemplateInput, SignatureAppearanceTemplateReplacementInput } from './__generated__/SignatoryModalAddMutation.graphql';

interface Props {
  value: SignatureAppearanceInputType | null | undefined
  onChange: (value: SignatureAppearanceInputType) => void
}

export function filterSignatureAppearance(input: SignatureAppearanceInputType | null | undefined) {
  if (!input) return input;
  return {
    ...input,
    displayName: input.displayName ? input.displayName.filter(i => i.template).map(i => {
      return {
        ...i,
        replacements: i.replacements?.filter(r => r.placeholder).map(r => ({
          ...r,
          fromEvidence: r.fromEvidence.filter(i => i)
        }))
      }
    }) : input.displayName
  }
}

const templateTypes = ['displayName', 'headerLeft'] as const;
type TemplateType = typeof templateTypes[number];

export default function SignatureAppearanceInput(props: Props) {
  const signatureAppearance = props.value;

  const handleIdentifierFromEvidence = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...signatureAppearance,
      identifierFromEvidence: event.target.value.split(',').map(s => s.trim())
    });
  }

  const handleAddTemplate = (key: TemplateType) => {
    props.onChange({
      ...signatureAppearance,
      identifierFromEvidence: signatureAppearance?.identifierFromEvidence ?? [],
      [key]: (signatureAppearance?.[key] ?? []).concat({
        template: '',
        replacements: null
      })
    });
  }

  const handleChangeTemplate = (key: TemplateType, t: SignatureAppearanceTemplateInput, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...signatureAppearance,
      identifierFromEvidence: signatureAppearance?.identifierFromEvidence ?? [],
      [key]: (signatureAppearance?.[key] ?? []).map(s => {
        if (s !== t) return s;
        return {
          ...t,
          template: event.target.value
        }
      })
    });
  }

  const handleAddTemplateReplacement = (key: TemplateType, t: SignatureAppearanceTemplateInput) => {
    props.onChange({
      ...signatureAppearance,
      identifierFromEvidence: signatureAppearance?.identifierFromEvidence ?? [],
      [key]: (signatureAppearance?.[key] ?? []).map(s => {
        if (s !== t) return s;
        return {
          ...t,
          replacements: (s.replacements ?? []).concat([{
            placeholder: '',
            fromEvidence: []
          }])
        }
      })
    });
  };

  const handleChangeTemplateReplacementPlaceholder = (key: TemplateType, t: SignatureAppearanceTemplateInput, r: SignatureAppearanceTemplateReplacementInput, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...signatureAppearance,
      identifierFromEvidence: signatureAppearance?.identifierFromEvidence ?? [],
      [key]: (signatureAppearance?.[key] ?? []).map(s => {
        if (s !== t) return s;
        return {
          ...t,
          replacements: (s.replacements ?? []).map(s => {
            if (s !== r) return s;
            return {
              ...s,
              placeholder: event.target.value
            }
          })
        }
      })
    });
  };

  const handleChangeTemplateReplacementFromEvidence = (key: TemplateType,t: SignatureAppearanceTemplateInput, r: SignatureAppearanceTemplateReplacementInput, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...signatureAppearance,
      identifierFromEvidence: signatureAppearance?.identifierFromEvidence ?? [],
      [key]: (signatureAppearance?.[key] ?? []).map(s => {
        if (s !== t) return s;
        return {
          ...t,
          replacements: (s.replacements ?? []).map(s => {
            if (s !== r) return s;
            return {
              ...s,
              fromEvidence: event.target.value.split(',')
            }
          })
        }
      })
    });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={handleIdentifierFromEvidence}
            value={signatureAppearance?.identifierFromEvidence.join(',') ?? ''}
            placeholder="Identifier From Evidence"
          />
          <label className="form-label">Identifier From Evidence (comma-seperated)</label>
        </div>
      </div>
      {templateTypes.map(templateType => (
        <div className="col-12">
          <div><em>{templateType}</em></div>
          {signatureAppearance?.[templateType]?.map(t => (
            <div className="mb-3">
              <div className="row">
                <div className="col-8">
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      onChange={event => handleChangeTemplate(templateType, t, event)}
                      value={t.template}
                      placeholder="Template"
                    />
                    <label className="form-label">Template</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-secondary" onClick={() => handleAddTemplateReplacement(templateType, t)}>Add replacement</button>
                </div>
              </div>
              {t.replacements?.map(r => (
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3 form-floating">
                      <input
                        className="form-control"
                        type="text"
                        onChange={event => handleChangeTemplateReplacementPlaceholder(templateType, t, r, event)}
                        value={r.placeholder}
                        placeholder="Placeholder"
                      />
                      <label className="form-label">Placeholder</label>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="mb-3 form-floating">
                      <input
                        className="form-control"
                        type="text"
                        onChange={event => handleChangeTemplateReplacementFromEvidence(templateType, t, r, event)}
                        value={r?.fromEvidence.join(',') ?? ''}
                        placeholder="From Evidence"
                      />
                      <label className="form-label">From Evidence (comma-seperated)</label>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={() => handleAddTemplate(templateType)}>Add template</button>
        </div>
      ))}
    </div>
  );
}