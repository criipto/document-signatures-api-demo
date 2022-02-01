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
    readonly timezones: ReadonlyArray<string>;
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
    id
  }
  timezones
}
*/

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
    "name": "CreateSignatureOrderScreenQuery",
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
          }
        ],
        "storageKey": null
      },
      (v2/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateSignatureOrderScreenQuery",
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
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "5947ac2b4350bb0f21933e700816599e",
    "id": null,
    "metadata": {},
    "name": "CreateSignatureOrderScreenQuery",
    "operationKind": "query",
    "text": "query CreateSignatureOrderScreenQuery {\n  viewer {\n    __typename\n    ... on Application {\n      id\n    }\n    id\n  }\n  timezones\n}\n"
  }
};
})();
(node as any).hash = '591e6be6c856e9bdff6b31b5c72ccc13';
export default node;
