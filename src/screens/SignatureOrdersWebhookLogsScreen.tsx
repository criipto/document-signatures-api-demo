import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import graphql from 'babel-plugin-relay/macro';
import { PreloadedQuery, useFragment, usePreloadedQuery, useQueryLoader } from "react-relay";
import React, { useEffect, useReducer, useState } from "react";
import { SignatureOrdersWebhookLogsScreenQuery, WebhookInvocationEvent } from "./__generated__/SignatureOrdersWebhookLogsScreenQuery.graphql";

import schema from '../schema.json';
import { SignatureOrdersWebhookLogsScreen_invocation$key } from "./__generated__/SignatureOrdersWebhookLogsScreen_invocation.graphql";
import useMutationExtra from "../hooks/useMutation";
import { SignatureOrdersWebhookLogsScreen_retry_Mutation } from "./__generated__/SignatureOrdersWebhookLogsScreen_retry_Mutation.graphql";

const EVENTS = schema.data.__schema.types.find(s => s.name === 'WebhookInvocationEvent')?.enumValues?.map(s => s.name) ?? [];
const Query = graphql`
  query SignatureOrdersWebhookLogsScreenQuery($id: ID!, $from: String!, $to: String!, $succeeded: Boolean) {
    signatureOrder(id: $id) {
      webhook {
        url

        logs(from: $from, to: $to, succeeded: $succeeded) {
          event
          timestamp
          ...SignatureOrdersWebhookLogsScreen_invocation
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

  const [queryReference, loadQuery] = useQueryLoader<SignatureOrdersWebhookLogsScreenQuery>(Query, null);
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

function Logs(props: {queryReference: PreloadedQuery<SignatureOrdersWebhookLogsScreenQuery>, event: WebhookInvocationEvent | null}) {
  const data = usePreloadedQuery<SignatureOrdersWebhookLogsScreenQuery>(Query, props.queryReference);
  
  return (
    <table className="table" style={{tableLayout: 'fixed'}}>
      <thead>
        <tr>
          <th style={{width: '50px'}}></th>
          <th style={{width: '25%'}}>Timestamp</th>
          <th style={{width: '25%'}}>Event</th>
          <th style={{width: '50%'}}>URL</th>
          <th style={{width: '50px'}}></th>
        </tr>
      </thead>
      <tbody>
        {data.signatureOrder?.webhook?.logs.filter(e => !props.event || e.event === props.event).map(e => (
          <LogEntry
            key={e.event+e.timestamp}
            invocation={e}
            variables={{
              from: props.queryReference.variables.from,
              to: props.queryReference.variables.to,
              succeeded: props.queryReference.variables.succeeded,
            }}
          />
        ))}
      </tbody>
    </table>
  );
}

function LogEntry(props: {
  invocation: SignatureOrdersWebhookLogsScreen_invocation$key,
  variables: Omit<SignatureOrdersWebhookLogsScreenQuery["variables"], "id">
}) {
  const invocation = useFragment(
    graphql`
      fragment SignatureOrdersWebhookLogsScreen_invocation on WebhookInvocation {
        timestamp
        url
        requestBody
        responseBody
        event
        correlationId
        signatureOrderId

        ... on WebhookSuccessfulInvocation {
          responseStatusCode
        }
        ... on WebhookHttpErrorInvocation {
          responseStatusCode
          retryPayload
        }

        ... on WebhookExceptionInvocation {
          exception
          retryPayload
        }
        ... on WebhookTimeoutInvocation {
          responseTimeout
          retryPayload
        }
      }
    `,
    props.invocation
  );

  const [executor, status] = useMutationExtra<SignatureOrdersWebhookLogsScreen_retry_Mutation>(
    graphql`
      mutation SignatureOrdersWebhookLogsScreen_retry_Mutation($input: RetrySignatureOrderWebhookInput!) {
        retrySignatureOrderWebhook(input: $input) {
          invocation {
            signatureOrderId
            ...SignatureOrdersWebhookLogsScreen_invocation
          }
        }
      }
    `,
    {
      updater: (store, data) => {
        const invocation = store.getRootField('retrySignatureOrderWebhook').getLinkedRecord('invocation');
        const signatureOrderId = invocation.getValue('signatureOrderId');
        if (!signatureOrderId) return;
        const existing = store.get(signatureOrderId)?.getLinkedRecord('webhook')?.getLinkedRecords('logs', props.variables);
        const logs = [invocation as any].concat(existing ?? []);
        store.get(signatureOrderId)?.getLinkedRecord('webhook')?.setLinkedRecords(logs, 'logs', props.variables);
      }
    }
  );

  const handleRetry = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!invocation.signatureOrderId || !invocation.retryPayload) return;
    executor.execute({
      input: {
        signatureOrderId: invocation.signatureOrderId,
        retryPayload: invocation.retryPayload
      }
    });
  };

  const [showDetails, toggleDetails] = useReducer(value => !value, false);

  return (
    <React.Fragment>
      <tr key={invocation.event+invocation.timestamp} onClick={toggleDetails} style={{cursor: 'pointer'}}>
        <td>
          {invocation.responseTimeout ? (
            <span className="badge bg-danger">Timeout</span>
          ) : invocation.exception ? (
            <span className="badge bg-danger">Error</span>
          ) : (invocation.responseStatusCode ?? 0) >= 400 ? (
            <span className="badge bg-danger">{invocation.responseStatusCode}</span>
          ) : (invocation.responseStatusCode ?? 0) >= 300 ? (
            <span className="badge bg-warning">{invocation.responseStatusCode}</span>
          ) : (invocation.responseStatusCode ?? 0) >= 200 ? (
            <span className="badge bg-success">{invocation.responseStatusCode}</span>
          ) : null}
        </td>
        <td>
          {invocation.timestamp}
        </td>
        <td style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
          {invocation.event}
        </td>
        <td>
          {invocation.url}
        </td>
        <td>
          {invocation.signatureOrderId && invocation.retryPayload && (
            <button className="btn btn-secondary btn-sm" disabled={status.pending} onClick={handleRetry}>
              Retry
            </button>
          )}
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan={3}>
            <strong>Request</strong><br />
            <pre style={{overflowX: 'auto'}}><code>{tryParseJSON(invocation.requestBody) ? JSON.stringify(JSON.parse(invocation.requestBody), null, 2) : invocation.requestBody}</code></pre>
          </td>
          <td colSpan={2}>
            <strong>Response</strong><br />
            {invocation.responseStatusCode}{invocation.responseTimeout}
            <pre style={{overflowX: 'auto'}}><code>{invocation.responseBody ?? invocation.exception ?? 'Response timed out'}</code></pre>
          </td>
        </tr>
      )}
    </React.Fragment>
  )
}

function tryParseJSON(input: string) {
  try {
    return JSON.parse(input);
  }
  catch {
    return null;
  }
}