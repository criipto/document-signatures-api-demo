import React from 'react';
import {get, isBoolean, isPlainObject} from 'lodash';
import { graphql } from "react-relay";
import { useLazyLoadQuery } from 'react-relay';
import { useRouteMatch } from 'react-router-dom';
import { BatchSignatoryScreenQuery } from './__generated__/BatchSignatoryScreenQuery.graphql';

const SETTINGS = [
  'href',
  'ui.signatoryRedirectUri',
  'ui.language',
  'ui.stylesheet',
  'ui.logo.src',
  'ui.logo.href',
  'ui.disableRejection',
  'ui.renderPdfAnnotationLayer'
];

export default function BatchSignatoryScreen() {
  const match = useRouteMatch<{batchSignatoryId: string}>();
  const params = match.params;
  const data = useLazyLoadQuery<BatchSignatoryScreenQuery>(
    graphql`
      query BatchSignatoryScreenQuery($id: ID!) {
        batchSignatory(id: $id) {
          href

          items {
            signatory {
              id
              reference
              status
            }
            signatureOrder {
              id
              title
              
            }
          }

          ui {
            signatoryRedirectUri
            stylesheet
            language
            logo {
              src
              href
            }
            disableRejection
            renderPdfAnnotationLayer
          }
        }
      }
    `, {
      id: params.batchSignatoryId
    }
  );

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Setting</th>
            <th scope="col">Value</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {SETTINGS.filter(setting => get(data.batchSignatory, setting, null)).map(setting => (
            <tr key={setting}>
              <td>{setting}</td>
              <td>
                {displaySetting(data.batchSignatory, setting)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Signature Order</th>
            <th scope="col">Signatory</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.batchSignatory?.items.map((item, index) => (
            <tr key={item.signatory.id}>
              <td>
                <a href={`/signatureorders/${item.signatureOrder.id}`}>{item.signatureOrder.title}</a>
              </td>
              <td style={{wordBreak: 'break-word'}}>
                {item.signatory.reference ?? item.signatory.id}
              </td>
              <td>
                {item.signatory.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function displaySetting(batchSignatory: BatchSignatoryScreenQuery["response"]["batchSignatory"], setting: string) {
  const value = get(batchSignatory, setting, null);
  if (isPlainObject(value)) return JSON.stringify(value);
  if (isBoolean(value)) {
    return value ? "true" : "false";
  }
  if (setting === 'href' && value) {
    return <a href={value} target="_blank">{value}</a>
  }
  return value;
}