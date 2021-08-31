/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type IndexScreenQueryVariables = {};
export type IndexScreenQueryResponse = {
    readonly viewer: {
        readonly __typename: "Application";
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"CreateSignatureOrderScreen_application">;
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
      ...CreateSignatureOrderScreen_application
    }
    ... on AnonymousViewer {
      authenticated
    }
  }
}

fragment CreateSignatureOrderScreen_application on Application {
  id
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
              (v1/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CreateSignatureOrderScreen_application"
              }
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
    ]
  },
  "params": {
    "cacheID": "aed0be44c3a56454de1d94c7333f61c7",
    "id": null,
    "metadata": {},
    "name": "IndexScreenQuery",
    "operationKind": "query",
    "text": "query IndexScreenQuery {\n  viewer {\n    __typename\n    ... on Application {\n      id\n      ...CreateSignatureOrderScreen_application\n    }\n    ... on AnonymousViewer {\n      authenticated\n    }\n  }\n}\n\nfragment CreateSignatureOrderScreen_application on Application {\n  id\n}\n"
  }
};
})();
(node as any).hash = 'bd09ce3e516e3a40bb3667fd100aa5a8';
export default node;
