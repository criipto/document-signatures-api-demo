/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CreateSignatureWorkflowScreenQueryVariables = {
    signatureOrderId: string;
};
export type CreateSignatureWorkflowScreenQueryResponse = {
    readonly signatureOrder: {
        readonly id: string;
        readonly documents: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"SignatoryDocumentInput_signatureOrder">;
    } | null;
};
export type CreateSignatureWorkflowScreenQuery = {
    readonly response: CreateSignatureWorkflowScreenQueryResponse;
    readonly variables: CreateSignatureWorkflowScreenQueryVariables;
};



/*
query CreateSignatureWorkflowScreenQuery(
  $signatureOrderId: ID!
) {
  signatureOrder(id: $signatureOrderId) {
    id
    documents {
      __typename
      id
      title
    }
    ...SignatoryDocumentInput_signatureOrder
  }
}

fragment SignatoryDocumentInput_signatureOrder on SignatureOrder {
  documents {
    __typename
    id
    title
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "signatureOrderId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "signatureOrderId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateSignatureWorkflowScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignatureOrder",
        "kind": "LinkedField",
        "name": "signatureOrder",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SignatoryDocumentInput_signatureOrder"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateSignatureWorkflowScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignatureOrder",
        "kind": "LinkedField",
        "name": "signatureOrder",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0d7e22911142840bbe647506f1f88707",
    "id": null,
    "metadata": {},
    "name": "CreateSignatureWorkflowScreenQuery",
    "operationKind": "query",
    "text": "query CreateSignatureWorkflowScreenQuery(\n  $signatureOrderId: ID!\n) {\n  signatureOrder(id: $signatureOrderId) {\n    id\n    documents {\n      __typename\n      id\n      title\n    }\n    ...SignatoryDocumentInput_signatureOrder\n  }\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n"
  }
};
})();
(node as any).hash = '4baa5f8217bacbf853ba1673e9626c08';
export default node;
