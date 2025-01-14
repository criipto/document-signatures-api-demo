import React from 'react';
import { CreateSignatureOrderUIInput } from "../screens/__generated__/CreateSignatureOrderScreenMutation.graphql"
import { SignatureOrderUILogoInput } from './__generated__/SignatoryModalAddMutation.graphql';

export default function UIInputFields(props: {
  ui: CreateSignatureOrderUIInput | null | undefined
  onChange: (value: React.SetStateAction<CreateSignatureOrderUIInput>) => void
  fieldWrapperClassName?: string
}) {
  const {ui, onChange, fieldWrapperClassName} = props;
  const handleUI = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: keyof CreateSignatureOrderUIInput) => {
    onChange(ui => ({
      ...ui,
      [key]: (event.target.type === "checkbox" && "checked" in event.target) ? event.target.checked : event.target.value
    }));
  }

  const handleUILogo = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: keyof SignatureOrderUILogoInput) => {
    onChange(ui => ({
      ...ui,
      logo: {
        src: '',
        href: '',
        ...ui.logo,
        [key]: event.target.value
      }
    }));
  }

  return (
    <>
      <div className={fieldWrapperClassName}>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => handleUI(event, 'signatoryRedirectUri')}
            value={ui?.signatoryRedirectUri || ''}
            placeholder="Signatory redirect URI"
          />
          <label className="form-label">Signatory redirect URI</label>
        </div>
      </div>
      <div className={fieldWrapperClassName}>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => handleUI(event, 'stylesheet')}
            value={ui?.stylesheet || ''}
            placeholder="Stylesheet"
          />
          <label className="form-label">Stylesheet</label>
        </div>
      </div>
      <div className={fieldWrapperClassName}>
        <div className="mb-3 form-floating">
          <select
            className="form-control"
            onChange={(event) => handleUI(event, 'language')}
            value={ui?.language || 'EN_US'}
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
      <div className={fieldWrapperClassName}>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => handleUILogo(event, 'src')}
            value={ui?.logo?.src || ''}
            placeholder="Logo SRC"
          />
          <label className="form-label">Logo SRC</label>
        </div>
      </div>
      <div className={fieldWrapperClassName}>
        <div className="mb-3 form-floating">
          <input
            className="form-control"
            type="text"
            onChange={(event) => handleUILogo(event, 'href')}
            value={ui?.logo?.href || ''}
            placeholder="Logo Href"
          />
          <label className="form-label">Logo Href</label>
        </div>
      </div>
      <div className={fieldWrapperClassName}>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            id={`ui_disableRejection`} type="checkbox"
            checked={ui?.disableRejection ||false}
            onChange={(event) => handleUI(event, 'disableRejection')}
          />
          <label className="form-check-label" htmlFor={`ui_disableRejection`} >
            Disable rejection
          </label>
        </div>
      </div>
      <div className={fieldWrapperClassName}>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            id={`ui_renderPdfAnnotationLayer`} type="checkbox"
            checked={ui?.renderPdfAnnotationLayer ||false}
            onChange={(event) => handleUI(event, 'renderPdfAnnotationLayer')}
          />
          <label className="form-check-label" htmlFor={`ui_renderPdfAnnotationLayer`} >
            Render PDF annotation layer
          </label>
        </div>
      </div>
    </>
  )
}