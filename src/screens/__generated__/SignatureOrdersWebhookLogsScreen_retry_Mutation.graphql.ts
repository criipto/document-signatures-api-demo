/**
 * @generated SignedSource<<47e8a0a8dc24bdc712678e39782a04bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RetrySignatureOrderWebhookInput = {
  retryPayload: string;
  signatureOrderId: string;
};
export type SignatureOrdersWebhookLogsScreen_retry_Mutation$variables = {
  input: RetrySignatureOrderWebhookInput;
};
export type SignatureOrdersWebhookLogsScreen_retry_Mutation$data = {
  readonly retrySignatureOrderWebhook: {
    readonly invocation: {
      readonly signatureOrderId: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"SignatureOrdersWebhookLogsScreen_invocation">;
    };
  } | null;
};
export type SignatureOrdersWebhookLogsScreen_retry_Mutation = {
  response: SignatureOrdersWebhookLogsScreen_retry_Mutation$data;
  variables: SignatureOrdersWebhookLogsScreen_retry_Mutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "signatureOrderId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "responseStatusCode",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retryPayload",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retryingAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignatureOrdersWebhookLogsScreen_retry_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RetrySignatureOrderWebhookOutput",
        "kind": "LinkedField",
        "name": "retrySignatureOrderWebhook",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "invocation",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SignatureOrdersWebhookLogsScreen_invocation"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignatureOrdersWebhookLogsScreen_retry_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RetrySignatureOrderWebhookOutput",
        "kind": "LinkedField",
        "name": "retrySignatureOrderWebhook",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "invocation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isWebhookInvocation"
              },
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
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "WebhookSuccessfulInvocation",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
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
                  (v4/*: any*/),
                  (v5/*: any*/)
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
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "type": "WebhookTimeoutInvocation",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "da0f1b84b3f79742644c926ea09cee60",
    "id": null,
    "metadata": {},
    "name": "SignatureOrdersWebhookLogsScreen_retry_Mutation",
    "operationKind": "mutation",
    "text": "mutation SignatureOrdersWebhookLogsScreen_retry_Mutation(\n  $input: RetrySignatureOrderWebhookInput!\n) {\n  retrySignatureOrderWebhook(input: $input) {\n    invocation {\n      __typename\n      signatureOrderId\n      ...SignatureOrdersWebhookLogsScreen_invocation\n    }\n  }\n}\n\nfragment SignatureOrdersWebhookLogsScreen_invocation on WebhookInvocation {\n  __isWebhookInvocation: __typename\n  timestamp\n  url\n  requestBody\n  responseBody\n  event\n  correlationId\n  signatureOrderId\n  ... on WebhookSuccessfulInvocation {\n    responseStatusCode\n  }\n  ... on WebhookHttpErrorInvocation {\n    responseStatusCode\n    retryPayload\n    retryingAt\n  }\n  ... on WebhookExceptionInvocation {\n    exception\n    retryPayload\n    retryingAt\n  }\n  ... on WebhookTimeoutInvocation {\n    responseTimeout\n    retryPayload\n    retryingAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "d9de5c901b1f01a48aed3cc9f82961df";

export default node;
