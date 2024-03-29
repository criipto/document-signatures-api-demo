/**
 * @generated SignedSource<<dcba92d33adf94d6847f6e3203ebe270>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebhookInvocationEvent = "SIGNATORY_DOCUMENT_STATUS_CHANGED" | "SIGNATORY_DOWNLOAD_LINK_OPENED" | "SIGNATORY_REJECTED" | "SIGNATORY_SIGNED" | "SIGNATORY_SIGN_ERROR" | "SIGNATORY_SIGN_LINK_OPENED" | "SIGNATURE_ORDER_EXPIRED" | "%future added value";
export type SignatureOrdersWebhookLogsScreenQuery$variables = {
  from: string;
  id: string;
  succeeded?: boolean | null;
  to: string;
};
export type SignatureOrdersWebhookLogsScreenQuery$data = {
  readonly signatureOrder: {
    readonly webhook: {
      readonly logs: ReadonlyArray<{
        readonly event: WebhookInvocationEvent | null;
        readonly timestamp: string;
        readonly " $fragmentSpreads": FragmentRefs<"SignatureOrdersWebhookLogsScreen_invocation">;
      }>;
      readonly url: string;
    } | null;
  } | null;
};
export type SignatureOrdersWebhookLogsScreenQuery = {
  response: SignatureOrdersWebhookLogsScreenQuery$data;
  variables: SignatureOrdersWebhookLogsScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "from"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "succeeded"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "to"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "from",
    "variableName": "from"
  },
  {
    "kind": "Variable",
    "name": "succeeded",
    "variableName": "succeeded"
  },
  {
    "kind": "Variable",
    "name": "to",
    "variableName": "to"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "event",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "responseStatusCode",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retryPayload",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retryingAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignatureOrdersWebhookLogsScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "SignatureOrder",
        "kind": "LinkedField",
        "name": "signatureOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SignatureOrderWebhook",
            "kind": "LinkedField",
            "name": "webhook",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "logs",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "SignatureOrdersWebhookLogsScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "SignatureOrder",
        "kind": "LinkedField",
        "name": "signatureOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SignatureOrderWebhook",
            "kind": "LinkedField",
            "name": "webhook",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "logs",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isWebhookInvocation"
                  },
                  (v5/*: any*/),
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
                      (v9/*: any*/)
                    ],
                    "type": "WebhookSuccessfulInvocation",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/)
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
                      (v10/*: any*/),
                      (v11/*: any*/)
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
                      (v10/*: any*/),
                      (v11/*: any*/)
                    ],
                    "type": "WebhookTimeoutInvocation",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "331cbc2d87e9ded78032bf908836b1b8",
    "id": null,
    "metadata": {},
    "name": "SignatureOrdersWebhookLogsScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrdersWebhookLogsScreenQuery(\n  $id: ID!\n  $from: String!\n  $to: String!\n  $succeeded: Boolean\n) {\n  signatureOrder(id: $id) {\n    webhook {\n      url\n      logs(from: $from, to: $to, succeeded: $succeeded) {\n        __typename\n        event\n        timestamp\n        ...SignatureOrdersWebhookLogsScreen_invocation\n      }\n    }\n    id\n  }\n}\n\nfragment SignatureOrdersWebhookLogsScreen_invocation on WebhookInvocation {\n  __isWebhookInvocation: __typename\n  timestamp\n  url\n  requestBody\n  responseBody\n  event\n  correlationId\n  signatureOrderId\n  ... on WebhookSuccessfulInvocation {\n    responseStatusCode\n  }\n  ... on WebhookHttpErrorInvocation {\n    responseStatusCode\n    retryPayload\n    retryingAt\n  }\n  ... on WebhookExceptionInvocation {\n    exception\n    retryPayload\n    retryingAt\n  }\n  ... on WebhookTimeoutInvocation {\n    responseTimeout\n    retryPayload\n    retryingAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ccd72b038c562315c3bfff179a5ac33";

export default node;
