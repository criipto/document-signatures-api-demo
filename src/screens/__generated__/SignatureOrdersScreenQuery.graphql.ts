/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type SignatureOrdersScreenQueryVariables = {};
export type SignatureOrdersScreenQueryResponse = {
    readonly viewer: {
        readonly signatureOrders?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly status: SignatureOrderStatus;
                };
            }>;
        };
    };
};
export type SignatureOrdersScreenQuery = {
    readonly response: SignatureOrdersScreenQueryResponse;
    readonly variables: SignatureOrdersScreenQueryVariables;
};



/*
query SignatureOrdersScreenQuery {
  viewer {
    __typename
    ... on Application {
      signatureOrders {
        edges {
          node {
            id
            status
          }
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SignatureOrderConnection",
      "kind": "LinkedField",
      "name": "signatureOrders",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SignatureOrderEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "SignatureOrder",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "status",
                  "storageKey": null
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
  "type": "Application",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignatureOrdersScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignatureOrdersScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "62bcde8dbf815d17389cab213a8cd609",
    "id": null,
    "metadata": {},
    "name": "SignatureOrdersScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrdersScreenQuery {\n  viewer {\n    __typename\n    ... on Application {\n      signatureOrders {\n        edges {\n          node {\n            id\n            status\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dcb826cb2043ae0c7e2157c04a4e49bc';
export default node;
