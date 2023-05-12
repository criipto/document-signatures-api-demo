/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type WebhookInvocationEvent = "SIGNATORY_DOCUMENT_STATUS_CHANGED" | "SIGNATORY_DOWNLOAD_LINK_OPENED" | "SIGNATORY_REJECTED" | "SIGNATORY_SIGNED" | "SIGNATORY_SIGN_ERROR" | "SIGNATORY_SIGN_LINK_OPENED" | "SIGNATURE_ORDER_EXPIRED" | "%future added value";
export type SignatureOrdersWebhookLogsScreen_invocation = {
    readonly timestamp: string;
    readonly url: string;
    readonly requestBody: string;
    readonly responseBody: string;
    readonly event: WebhookInvocationEvent | null;
    readonly correlationId: string;
    readonly signatureOrderId: string | null;
    readonly responseStatusCode?: number;
    readonly retryPayload?: string;
    readonly exception?: string;
    readonly responseTimeout?: number;
    readonly " $refType": "SignatureOrdersWebhookLogsScreen_invocation";
};
export type SignatureOrdersWebhookLogsScreen_invocation$data = SignatureOrdersWebhookLogsScreen_invocation;
export type SignatureOrdersWebhookLogsScreen_invocation$key = {
    readonly " $data"?: SignatureOrdersWebhookLogsScreen_invocation$data;
    readonly " $fragmentRefs": FragmentRefs<"SignatureOrdersWebhookLogsScreen_invocation">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "responseStatusCode",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retryPayload",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignatureOrdersWebhookLogsScreen_invocation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timestamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requestBody",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "responseBody",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "event",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "correlationId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "signatureOrderId",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/)
      ],
      "type": "WebhookSuccessfulInvocation",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "type": "WebhookHttpErrorInvocation",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "exception",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "type": "WebhookExceptionInvocation",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "responseTimeout",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "type": "WebhookTimeoutInvocation",
      "abstractKey": null
    }
  ],
  "type": "WebhookInvocation",
  "abstractKey": "__isWebhookInvocation"
};
})();
(node as any).hash = 'aabd05799e313192df02c8658388249b';
export default node;
