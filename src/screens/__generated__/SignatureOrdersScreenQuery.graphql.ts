/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type SignatureOrdersScreenQueryVariables = {
    status?: SignatureOrderStatus | null;
};
export type SignatureOrdersScreenQueryResponse = {
    readonly viewer: {
        readonly signatureOrders?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly title: string | null;
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
query SignatureOrdersScreenQuery(
  $status: SignatureOrderStatus
) {
  viewer {
    __typename
    ... on Application {
      signatureOrders(status: $status) {
        edges {
          node {
            id
            title
            status
          }
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "status",
          "variableName": "status"
        }
      ],
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
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
    "argumentDefinitions": (v0/*: any*/),
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
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
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dd8d44d10d3f68aeebf4d97e1c8c69e0",
    "id": null,
    "metadata": {},
    "name": "SignatureOrdersScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrdersScreenQuery(\n  $status: SignatureOrderStatus\n) {\n  viewer {\n    __typename\n    ... on Application {\n      signatureOrders(status: $status) {\n        edges {\n          node {\n            id\n            title\n            status\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '515657c797c19e01500536288bc7901a';
export default node;
