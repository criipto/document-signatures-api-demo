/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type WebhookInvocationEvent = "SIGNATORY_DOCUMENT_STATUS_CHANGED" | "SIGNATORY_DOWNLOAD_LINK_OPENED" | "SIGNATORY_REJECTED" | "SIGNATORY_SIGNED" | "SIGNATORY_SIGN_ERROR" | "SIGNATORY_SIGN_LINK_OPENED" | "SIGNATURE_ORDER_EXPIRED" | "%future added value";
export type SignatureOrdersWebhookLogsScreenQueryVariables = {
    id: string;
    from: string;
    to: string;
    succeeded?: boolean | null;
};
export type SignatureOrdersWebhookLogsScreenQueryResponse = {
    readonly signatureOrder: {
        readonly webhook: {
            readonly url: string;
            readonly logs: ReadonlyArray<{
                readonly event: WebhookInvocationEvent | null;
                readonly timestamp: string;
                readonly " $fragmentRefs": FragmentRefs<"SignatureOrdersWebhookLogsScreen_invocation">;
            }>;
        } | null;
    } | null;
};
export type SignatureOrdersWebhookLogsScreenQuery = {
    readonly response: SignatureOrdersWebhookLogsScreenQueryResponse;
    readonly variables: SignatureOrdersWebhookLogsScreenQueryVariables;
};



/*
query SignatureOrdersWebhookLogsScreenQuery(
  $id: ID!
  $from: String!
  $to: String!
  $succeeded: Boolean
) {
  signatureOrder(id: $id) {
    webhook {
      url
      logs(from: $from, to: $to, succeeded: $succeeded) {
        __typename
        event
        timestamp
        ...SignatureOrdersWebhookLogsScreen_invocation
      }
    }
    id
  }
}

fragment SignatureOrdersWebhookLogsScreen_invocation on WebhookInvocation {
  __isWebhookInvocation: __typename
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
*/

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
                      (v10/*: any*/)
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
                      (v10/*: any*/)
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
                      (v10/*: any*/)
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
    "cacheID": "1631935014a71314121f5f73507480aa",
    "id": null,
    "metadata": {},
    "name": "SignatureOrdersWebhookLogsScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrdersWebhookLogsScreenQuery(\n  $id: ID!\n  $from: String!\n  $to: String!\n  $succeeded: Boolean\n) {\n  signatureOrder(id: $id) {\n    webhook {\n      url\n      logs(from: $from, to: $to, succeeded: $succeeded) {\n        __typename\n        event\n        timestamp\n        ...SignatureOrdersWebhookLogsScreen_invocation\n      }\n    }\n    id\n  }\n}\n\nfragment SignatureOrdersWebhookLogsScreen_invocation on WebhookInvocation {\n  __isWebhookInvocation: __typename\n  timestamp\n  url\n  requestBody\n  responseBody\n  event\n  correlationId\n  signatureOrderId\n  ... on WebhookSuccessfulInvocation {\n    responseStatusCode\n  }\n  ... on WebhookHttpErrorInvocation {\n    responseStatusCode\n    retryPayload\n  }\n  ... on WebhookExceptionInvocation {\n    exception\n    retryPayload\n  }\n  ... on WebhookTimeoutInvocation {\n    responseTimeout\n    retryPayload\n  }\n}\n"
  }
};
})();
(node as any).hash = '1ccd72b038c562315c3bfff179a5ac33';
export default node;
