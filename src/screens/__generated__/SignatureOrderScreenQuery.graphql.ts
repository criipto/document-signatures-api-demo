/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryStatus = "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type SignatureOrderScreenQueryVariables = {
    id: string;
};
export type SignatureOrderScreenQueryResponse = {
    readonly signatureOrder: {
        readonly id: string;
        readonly status: SignatureOrderStatus;
        readonly signatureWorkflow: {
            readonly id: string;
        } | null;
        readonly signatories: ReadonlyArray<{
            readonly id: string;
            readonly status: SignatoryStatus;
            readonly href: string;
            readonly " $fragmentRefs": FragmentRefs<"DeleteSignatoryButton_signatory">;
        }>;
        readonly documents: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
            readonly blob: string | null;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"CancelSignatureOrderButton_signatureOrder" | "AddSignatoryButton_signatureOrder" | "DeleteSignatoryButton_signatureOrder" | "CloseSignatureOrderButton_signatureOrder">;
    } | null;
};
export type SignatureOrderScreenQuery = {
    readonly response: SignatureOrderScreenQueryResponse;
    readonly variables: SignatureOrderScreenQueryVariables;
};



/*
query SignatureOrderScreenQuery(
  $id: ID!
) {
  signatureOrder(id: $id) {
    id
    status
    signatureWorkflow {
      id
    }
    signatories {
      id
      status
      href
      ...DeleteSignatoryButton_signatory
    }
    documents {
      __typename
      __isDocument: __typename
      id
      title
      blob
    }
    ...CancelSignatureOrderButton_signatureOrder
    ...AddSignatoryButton_signatureOrder
    ...DeleteSignatoryButton_signatureOrder
    ...CloseSignatureOrderButton_signatureOrder
  }
}

fragment AddSignatoryButton_signatureOrder on SignatureOrder {
  id
  status
  openSignatory {
    id
  }
}

fragment CancelSignatureOrderButton_signatureOrder on SignatureOrder {
  id
  status
}

fragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {
  id
  status
  openSignatory {
    id
  }
}

fragment DeleteSignatoryButton_signatory on Signatory {
  id
  status
}

fragment DeleteSignatoryButton_signatureOrder on SignatureOrder {
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "name": "status",
  "storageKey": null
},
v4 = [
  (v2/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "SignatureWorkflow",
  "kind": "LinkedField",
  "name": "signatureWorkflow",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "blob",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignatureOrderScreenQuery",
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
          (v3/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Signatory",
            "kind": "LinkedField",
            "name": "signatories",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DeleteSignatoryButton_signatory"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CancelSignatureOrderButton_signatureOrder"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddSignatoryButton_signatureOrder"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DeleteSignatoryButton_signatureOrder"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CloseSignatureOrderButton_signatureOrder"
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
    "name": "SignatureOrderScreenQuery",
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
          (v3/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Signatory",
            "kind": "LinkedField",
            "name": "signatories",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
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
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isDocument"
              },
              (v2/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Signatory",
            "kind": "LinkedField",
            "name": "openSignatory",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b389c2898b982db57e135d4745a25a91",
    "id": null,
    "metadata": {},
    "name": "SignatureOrderScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrderScreenQuery(\n  $id: ID!\n) {\n  signatureOrder(id: $id) {\n    id\n    status\n    signatureWorkflow {\n      id\n    }\n    signatories {\n      id\n      status\n      href\n      ...DeleteSignatoryButton_signatory\n    }\n    documents {\n      __typename\n      __isDocument: __typename\n      id\n      title\n      blob\n    }\n    ...CancelSignatureOrderButton_signatureOrder\n    ...AddSignatoryButton_signatureOrder\n    ...DeleteSignatoryButton_signatureOrder\n    ...CloseSignatureOrderButton_signatureOrder\n  }\n}\n\nfragment AddSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  openSignatory {\n    id\n  }\n}\n\nfragment CancelSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n  openSignatory {\n    id\n  }\n}\n\nfragment DeleteSignatoryButton_signatory on Signatory {\n  id\n  status\n}\n\nfragment DeleteSignatoryButton_signatureOrder on SignatureOrder {\n  id\n}\n"
  }
};
})();
(node as any).hash = 'dacf16dcc0c35c50e5e6ed305cf6255c';
export default node;
