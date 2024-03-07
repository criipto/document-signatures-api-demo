/**
 * @generated SignedSource<<2536e5eaa9daff75c60b60999b405a20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type IndexScreenQuery$variables = {};
export type IndexScreenQuery$data = {
  readonly viewer: {
    readonly __typename: "AnonymousViewer";
    readonly authenticated: boolean;
  } | {
    readonly __typename: "Application";
    readonly id: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type IndexScreenQuery = {
  response: IndexScreenQuery$data;
  variables: IndexScreenQuery$variables;
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "authenticated",
      "storageKey": null
    }
  ],
  "type": "AnonymousViewer",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexScreenQuery",
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
              (v1/*: any*/)
            ],
            "type": "Application",
            "abstractKey": null
          },
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexScreenQuery",
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ac2dd76b24f89c6d93234199583b1d1e",
    "id": null,
    "metadata": {},
    "name": "IndexScreenQuery",
    "operationKind": "query",
    "text": "query IndexScreenQuery {\n  viewer {\n    __typename\n    ... on Application {\n      id\n    }\n    ... on AnonymousViewer {\n      authenticated\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e47b05799ef415ec9519644174daf82e";

export default node;
