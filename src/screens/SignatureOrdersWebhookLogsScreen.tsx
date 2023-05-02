import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import graphql from 'babel-plugin-relay/macro';
import { usePreloadedQuery, useQueryLoader } from "react-relay";
import React, { useEffect, useState } from "react";
import { SignatureOrdersWebhookLogsScreenQuery, WebhookInvocationEvent } from "./__generated__/SignatureOrdersWebhookLogsScreenQuery.graphql";

import schema from '../schema.json';

const EVENTS = schema.data.__schema.types.find(s => s.name === 'WebhookInvocationEvent')?.enumValues?.map(s => s.name) ?? [];
const Query = graphql`
  query SignatureOrdersWebhookLogsScreenQuery($id: ID!, $from: String!, $to: String!, $succeeded: Boolean) {
    signatureOrder(id: $id) {
      webhook {
        url

        logs(from: $from, to: $to, succeeded: $succeeded) {
          timestamp
          url
          responseBody
          event

          ... on WebhookSuccessfulInvocation {
            responseStatusCode
          }
          ... on WebhookHttpErrorInvocation {
            responseStatusCode
          }

          ... on WebhookExceptionInvocation {
            exception
          }
          ... on WebhookTimeoutInvocation {
            responseTimeout
          }
        }
      }
    }
  }
`

export default function SignatureOrdersWebhookLogsScreen() {
  const match = useRouteMatch<{signatureOrderId: string}>();
  const [from, setFrom] = useState(() => moment().startOf('day').subtract(7, 'days').toDate())
  const [to, setTo] = useState(() => moment().endOf('day').toDate());
  const [succeeded, setSucceeded] = useState<boolean | null>(null);
  const [event, setEvent] = useState<WebhookInvocationEvent | null>(null);

  const handleChange = (key: 'from' | 'to', event: React.ChangeEvent<HTMLInputElement>) => {
    if (key === 'from') setFrom(new Date(event.target.value));
    if (key === 'to') setTo(new Date(event.target.value));
  }

  const [queryReference, loadQuery] = useQueryLoader(Query, null);
  useEffect(() => {
    loadQuery({
      id: match.params.signatureOrderId,
      from: from.toJSON(),
      to: to.toJSON(),
      succeeded
    });
  }, [from, to, succeeded, loadQuery, match.params.signatureOrderId]);

  return (
    <div>
      <Link to={`/signatureorders/${match.params.signatureOrderId}`}>Back to signature order</Link>
      <br /><br />
      <div style={{display: 'flex', flex: 'flex-row', gap: '8px'}}>
        Between
        <input type="datetime-local" value={moment(from).format('YYYY-MM-DDTHH:mm')} onChange={event => handleChange('from', event)} />
        and
        <input type="datetime-local" value={moment(to).format('YYYY-MM-DDTHH:mm')} onChange={event => handleChange('to', event)} />

        <select
          value={succeeded === true ? 'true' : succeeded === false ? 'false' : ''}
          onChange={event => {
            if (event.target.value === 'true') setSucceeded(true);
            else if (event.target.value === 'false') setSucceeded(false);
            else setSucceeded(null);
          }}
        >
          <option value="">All states</option>
          <option value="true">Only succesfull</option>
          <option value="false">Only failed</option>
        </select>

        <select
          value={event ?? ""}
          onChange={event => {
            if (event.target.value) setEvent(event.target.value as any)
            else setEvent(null)
          }}
        >
          <option value="">All events</option>
          {EVENTS.map(event => <option key={event} value={event}>{event}</option>)}
        </select>
      </div>
      <div style={{marginTop: '25px'}}>
        <React.Suspense fallback={"Loading ..."}>
          {queryReference && (<Logs queryReference={queryReference} event={event} />)}
        </React.Suspense>
      </div>
    </div>
  )
}

function Logs(props: {queryReference: any, event: WebhookInvocationEvent | null}) {
  const data = usePreloadedQuery<SignatureOrdersWebhookLogsScreenQuery>(Query, props.queryReference);
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Timestamp</th>
          <th>Event</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.signatureOrder?.webhook?.logs.filter(e => !props.event || e.event === props.event).map(e => (
          <React.Fragment>
            <tr key={e.event+e.timestamp}>
              <td>
                {e.responseTimeout ? (
                  <span className="badge bg-danger">Timeout</span>
                ) : e.exception ? (
                  <span className="badge bg-danger">Error</span>
                ) : (e.responseStatusCode ?? 0) >= 400 ? (
                  <span className="badge bg-danger">{e.responseStatusCode}</span>
                ) : (e.responseStatusCode ?? 0) >= 300 ? (
                  <span className="badge bg-warning">{e.responseStatusCode}</span>
                ) : (e.responseStatusCode ?? 0) >= 200 ? (
                  <span className="badge bg-success">{e.responseStatusCode}</span>
                ) : null}
              </td>
              <td>
                {e.timestamp}
              </td>
              <td>
                {e.event}
              </td>
              <td>
                {e.url}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}