import React from 'react';

import { type EvidenceProviderInput as SignatureOrderEvidenceProviderInput } from '../screens/__generated__/CreateSignatureOrderScreenMutation.graphql';
import { SignatoryEvidenceProviderInput } from './__generated__/SignatoryModalAddMutation.graphql';

export type EvidenceProviderType = "oidc" | "criiptoVerify" | "drawable" | "noop" | "allOf";

export type EvidenceProviderInput = SignatureOrderEvidenceProviderInput | SignatoryEvidenceProviderInput
export const evidenceProviderToType = (input: EvidenceProviderInput) : EvidenceProviderType | null => {
  if (input.oidc) return "oidc";
  if (input.criiptoVerify) return "criiptoVerify";
  if (input.drawable) return "drawable";
  if (input.noop) return "noop";
  if (input.allOf) return "allOf";
  return null;
}


export default function EvidenceProviderInputComponent(props: {
  evidenceProvider: EvidenceProviderInput
  onChange: (provider : EvidenceProviderInput, key : keyof EvidenceProviderInput, value : string | boolean | object) => void
}) {
  const {evidenceProvider, onChange} = props;
  if (evidenceProvider.oidc) {
    <React.Fragment>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => onChange(evidenceProvider, 'oidc', {...evidenceProvider.oidc, domain: event.target.value})}
          value={evidenceProvider.oidc.domain}
          placeholder="Domain"
          required
        />
        <label className="form-label">Domain</label>
      </div>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => onChange(evidenceProvider, 'oidc', {...evidenceProvider.oidc, clientID: event.target.value})}
          value={evidenceProvider.oidc.clientID}
          placeholder="ClientID"
          required
        />
        <label className="form-label">ClientID</label>
      </div>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => onChange(evidenceProvider, 'oidc', {...evidenceProvider.oidc, audience: event.target.value})}
          value={evidenceProvider.oidc.audience}
          placeholder="Audience"
          required
        />
        <label className="form-label">Audience</label>
      </div>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => onChange(evidenceProvider, 'oidc', {...evidenceProvider.oidc, acrValues: event.target.value?.length ? null : event.target.value.split(',')})}
          value={evidenceProvider.oidc.acrValues?.join(',') || ''}
          placeholder="Acr values (comma-seperated)"
        />
        <label className="form-label">Acr values (comma-seperated)</label>
      </div>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => onChange(evidenceProvider, 'oidc', {...evidenceProvider.oidc, uniqueEvidenceKey: event.target.value})}
          value={evidenceProvider.oidc.uniqueEvidenceKey || undefined}
          placeholder="Unique Evidence Key"
        />
        <label className="form-label">Unique Evidence Key</label>
      </div>
      <div className="form-check mb-3">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="checkbox"
            checked={evidenceProvider.oidc.alwaysRedirect || false}
            onChange={(event) => onChange(evidenceProvider, 'oidc', {...evidenceProvider.oidc, alwaysRedirect: event.target.checked})}
          />
          Always redirect
        </label>
      </div>
    </React.Fragment>
  }
  if (evidenceProvider.criiptoVerify) {
    return (
      <React.Fragment>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => onChange(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, acrValues: event.target.value.split(',')})}
            value={evidenceProvider.criiptoVerify?.acrValues?.join(',') || ''}
            placeholder="Acr values (comma-seperated)"
          />
          <label className="form-label">Acr values (comma-seperated)</label>
        </div>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => onChange(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, uniqueEvidenceKey: event.target.value})}
            value={evidenceProvider.criiptoVerify?.uniqueEvidenceKey || undefined}
            placeholder="Unique Evidence Key"
          />
          <label className="form-label">Unique Evidence Key</label>
        </div>
        <div className="form-check mb-3">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={evidenceProvider.criiptoVerify?.alwaysRedirect || false}
              onChange={(event) => onChange(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, alwaysRedirect: event.target.checked})}
            />
            Always redirect
          </label>
        </div>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => onChange(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, message: event.target.value})}
            value={evidenceProvider.criiptoVerify?.message || undefined}
            placeholder="Message (DK MitID)"
          />
          <label className="form-label">Message (DK MitID)</label>
        </div>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => onChange(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, loginHint: event.target.value})}
            value={evidenceProvider.criiptoVerify?.loginHint || undefined}
            placeholder="login_hint"
          />
          <label className="form-label">login_hint</label>
        </div>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => onChange(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, scope: event.target.value})}
            value={evidenceProvider.criiptoVerify?.scope || undefined}
            placeholder="scope"
          />
          <label className="form-label">scope</label>
        </div>
        <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => onChange(evidenceProvider, 'criiptoVerify', {...evidenceProvider.criiptoVerify, audiences: event.target.value?.length ? event.target.value.split(',').map(i => i.trim()) : null})}
          value={evidenceProvider.criiptoVerify.audiences?.join(', ') ?? ''}
          placeholder="Additional audiences"
        />
        <label className="form-label">Additional audiences (comma-seperated)</label>
      </div>
      </React.Fragment>
    )
  }
  if (evidenceProvider.drawable) {
    return (
      <React.Fragment>
        <div className="form-check mb-3">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={evidenceProvider.drawable?.requireName || false}
              onChange={(event) => onChange(evidenceProvider, 'drawable', {...evidenceProvider.drawable, requireName: event.target.checked})}
            />
            Require name
          </label>
        </div>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="number"
            onChange={(event) => onChange(evidenceProvider, 'drawable', {...evidenceProvider.drawable, minimumWidth: parseInt(event.target.value, 10)})}
            placeholder="Minimum width"
          />
          <label className="form-label">Minimum Width</label>
          <small className="form-text text-muted">Specifies the required minimum width of drawable in pixels.</small>
        </div>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="number"
            onChange={(event) => onChange(evidenceProvider, 'drawable', {...evidenceProvider.drawable, minimumHeight: parseInt(event.target.value, 10)})}
            placeholder="Minimum height"
          />
          <label className="form-label">Minimum Height</label>
          <small className="form-text text-muted">Specifies the required minimum height of drawable in pixels.</small>
        </div>
      </React.Fragment>
    )
  }
  return null;
}