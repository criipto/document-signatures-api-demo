/**
 * @generated SignedSource<<2c0939fd0b44a49462838ef8f8a2406b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type CreateBatchSignatoryScreenQuery$variables = {};
export type CreateBatchSignatoryScreenQuery$data = {
  readonly timezones: ReadonlyArray<string>;
  readonly viewer: {
    readonly __typename: "Application";
    readonly id: string;
    readonly signatureOrders: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly signatories: ReadonlyArray<{
            readonly id: string;
            readonly reference: string | null;
            readonly status: SignatoryStatus;
          }>;
          readonly title: string | null;
        };
      }>;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type CreateBatchSignatoryScreenQuery = {
  response: CreateBatchSignatoryScreenQuery$data;
  variables: CreateBatchSignatoryScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "status",
      "value": "OPEN"
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
              "concreteType": "Signatory",
              "kind": "LinkedField",
              "name": "signatories",
              "plural": true,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reference",
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
  "storageKey": "signatureOrders(status:\"OPEN\")"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timezones",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateBatchSignatoryScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "type": "Application",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      (v3/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateBatchSignatoryScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/)
            ],
            "type": "Application",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      (v3/*: any*/)
    ]
  },
  "params": {
    "cacheID": "5a16f7a0e3956deeed8608133ae31faf",
    "id": null,
    "metadata": {},
    "name": "CreateBatchSignatoryScreenQuery",
    "operationKind": "query",
    "text": "query CreateBatchSignatoryScreenQuery {\n  viewer {\n    __typename\n    ... on Application {\n      id\n      signatureOrders(status: OPEN) {\n        edges {\n          node {\n            id\n            title\n            signatories {\n              id\n              reference\n              status\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n  timezones\n}\n"
  }
};
})();

(node as any).hash = "3fdb67b56687548007005c2544b2cdb5";

export default node;
