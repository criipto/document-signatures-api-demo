/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type IndexScreenQueryVariables = {};
export type IndexScreenQueryResponse = {
    readonly viewer: {
        readonly __typename: "Application";
        readonly id: string;
    } | {
        readonly __typename: "AnonymousViewer";
        readonly authenticated: boolean;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    };
};
export type IndexScreenQuery = {
    readonly response: IndexScreenQueryResponse;
    readonly variables: IndexScreenQueryVariables;
};



/*
query IndexScreenQuery {
  viewer {
    __typename
    ... on Application {
      id
    }
    ... on AnonymousViewer {
      authenticated
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
      },
      {
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
    "name": "IndexScreenQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexScreenQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b417beb708baae9b7718c8a2d515a7a4",
    "id": null,
    "metadata": {},
    "name": "IndexScreenQuery",
    "operationKind": "query",
    "text": "query IndexScreenQuery {\n  viewer {\n    __typename\n    ... on Application {\n      id\n    }\n    ... on AnonymousViewer {\n      authenticated\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e47b05799ef415ec9519644174daf82e';
export default node;
