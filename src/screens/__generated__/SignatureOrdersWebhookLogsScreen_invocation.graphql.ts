/**
 * @generated SignedSource<<eaadbdb9560891e3ba67dc46b4f6cd32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type WebhookInvocationEvent = "SIGNATORY_DOCUMENT_STATUS_CHANGED" | "SIGNATORY_DOWNLOAD_LINK_OPENED" | "SIGNATORY_REJECTED" | "SIGNATORY_SIGNED" | "SIGNATORY_SIGN_ERROR" | "SIGNATORY_SIGN_LINK_OPENED" | "SIGNATURE_ORDER_EXPIRED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SignatureOrdersWebhookLogsScreen_invocation$data = {
  readonly correlationId: string;
  readonly event: WebhookInvocationEvent | null;
  readonly exception?: string;
  readonly requestBody: string;
  readonly responseBody: string | null;
  readonly responseStatusCode?: number;
  readonly responseTimeout?: number;
  readonly retryPayload?: string;
  readonly retryingAt?: string | null;
  readonly signatureOrderId: string | null;
  readonly timestamp: string;
  readonly url: string;
  readonly " $fragmentType": "SignatureOrdersWebhookLogsScreen_invocation";
};
export type SignatureOrdersWebhookLogsScreen_invocation$key = {
  readonly " $data"?: SignatureOrdersWebhookLogsScreen_invocation$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignatureOrdersWebhookLogsScreen_invocation">;
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
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retryingAt",
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
        (v1/*: any*/),
        (v2/*: any*/)
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
        (v1/*: any*/),
        (v2/*: any*/)
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
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "type": "WebhookTimeoutInvocation",
      "abstractKey": null
    }
  ],
  "type": "WebhookInvocation",
  "abstractKey": "__isWebhookInvocation"
};
})();

(node as any).hash = "069874750dbf720a034ddd764e4ecad6";

export default node;
