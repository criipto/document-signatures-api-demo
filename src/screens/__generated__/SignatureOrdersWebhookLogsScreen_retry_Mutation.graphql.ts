/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RetrySignatureOrderWebhookInput = {
    retryPayload: string;
    signatureOrderId: string;
};
export type SignatureOrdersWebhookLogsScreen_retry_MutationVariables = {
    input: RetrySignatureOrderWebhookInput;
};
export type SignatureOrdersWebhookLogsScreen_retry_MutationResponse = {
    readonly retrySignatureOrderWebhook: {
        readonly invocation: {
            readonly signatureOrderId: string | null;
            readonly " $fragmentRefs": FragmentRefs<"SignatureOrdersWebhookLogsScreen_invocation">;
        };
    } | null;
};
export type SignatureOrdersWebhookLogsScreen_retry_Mutation = {
    readonly response: SignatureOrdersWebhookLogsScreen_retry_MutationResponse;
    readonly variables: SignatureOrdersWebhookLogsScreen_retry_MutationVariables;
};



/*
mutation SignatureOrdersWebhookLogsScreen_retry_Mutation(
  $input: RetrySignatureOrderWebhookInput!
) {
  retrySignatureOrderWebhook(input: $input) {
    invocation {
      __typename
      signatureOrderId
      ...SignatureOrdersWebhookLogsScreen_invocation
    }
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
                  (v4/*: any*/)
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
                  (v4/*: any*/)
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
                  (v4/*: any*/)
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
    "cacheID": "38d4ef208fd47bcb2e59b2fc44e157b8",
    "id": null,
    "metadata": {},
    "name": "SignatureOrdersWebhookLogsScreen_retry_Mutation",
    "operationKind": "mutation",
    "text": "mutation SignatureOrdersWebhookLogsScreen_retry_Mutation(\n  $input: RetrySignatureOrderWebhookInput!\n) {\n  retrySignatureOrderWebhook(input: $input) {\n    invocation {\n      __typename\n      signatureOrderId\n      ...SignatureOrdersWebhookLogsScreen_invocation\n    }\n  }\n}\n\nfragment SignatureOrdersWebhookLogsScreen_invocation on WebhookInvocation {\n  __isWebhookInvocation: __typename\n  timestamp\n  url\n  requestBody\n  responseBody\n  event\n  correlationId\n  signatureOrderId\n  ... on WebhookSuccessfulInvocation {\n    responseStatusCode\n  }\n  ... on WebhookHttpErrorInvocation {\n    responseStatusCode\n    retryPayload\n  }\n  ... on WebhookExceptionInvocation {\n    exception\n    retryPayload\n  }\n  ... on WebhookTimeoutInvocation {\n    responseTimeout\n    retryPayload\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd9de5c901b1f01a48aed3cc9f82961df';
export default node;
