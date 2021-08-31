/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateSignatureOrderScreenQueryVariables = {};
export type CreateSignatureOrderScreenQueryResponse = {
    readonly viewer: {
        readonly __typename: "Application";
        readonly id: string;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    };
};
export type CreateSignatureOrderScreenQuery = {
    readonly response: CreateSignatureOrderScreenQueryResponse;
    readonly variables: CreateSignatureOrderScreenQueryVariables;
};



/*
query CreateSignatureOrderScreenQuery {
  viewer {
    __typename
    ... on Application {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "type": "Application",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateSignatureOrderScreenQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateSignatureOrderScreenQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f9d599d96e5e6e6d6d7b08e59dcbb053",
    "id": null,
    "metadata": {},
    "name": "CreateSignatureOrderScreenQuery",
    "operationKind": "query",
    "text": "query CreateSignatureOrderScreenQuery {\n  viewer {\n    __typename\n    ... on Application {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7565598f9fb9689f7c8505bf44f2f904';
export default node;
