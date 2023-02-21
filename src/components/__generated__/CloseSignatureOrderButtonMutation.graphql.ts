/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type CloseSignatureOrderInput = {
    signatureOrderId: string;
    retainDocumentsForDays?: number | null;
};
export type CloseSignatureOrderButtonMutationVariables = {
    input: CloseSignatureOrderInput;
};
export type CloseSignatureOrderButtonMutationResponse = {
    readonly closeSignatureOrder: {
        readonly signatureOrder: {
            readonly status: SignatureOrderStatus;
            readonly documents: ReadonlyArray<{
                readonly blob: string | null;
            }>;
            readonly signatories: ReadonlyArray<{
                readonly id: string;
                readonly status: SignatoryStatus;
                readonly statusReason: string | null;
                readonly href: string;
                readonly downloadHref: string | null;
                readonly reference: string | null;
                readonly role: string | null;
                readonly documents: {
                    readonly edges: ReadonlyArray<{
                        readonly status: SignatoryDocumentStatus | null;
                        readonly node: {
                            readonly id: string;
                            readonly title: string;
                        };
                    }>;
                };
                readonly evidenceProviders: ReadonlyArray<{
                    readonly __typename: string;
                }>;
            }>;
        };
    } | null;
};
export type CloseSignatureOrderButtonMutation = {
    readonly response: CloseSignatureOrderButtonMutationResponse;
    readonly variables: CloseSignatureOrderButtonMutationVariables;
};



/*
mutation CloseSignatureOrderButtonMutation(
  $input: CloseSignatureOrderInput!
) {
  closeSignatureOrder(input: $input) {
    signatureOrder {
      status
      documents {
        __typename
        blob
        id
      }
      signatories {
        id
        status
        statusReason
        href
        downloadHref
        reference
        role
        documents {
          edges {
            status
            node {
              __typename
              id
              title
            }
          }
        }
        evidenceProviders {
          __typename
        }
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "blob",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "statusReason",
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
  "name": "downloadHref",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "evidenceProviders",
  "plural": true,
  "selections": [
    (v11/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CloseSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CloseSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "closeSignatureOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
                  (v3/*: any*/)
                ],
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
                  (v4/*: any*/),
                  (v2/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SignatoryDocumentConnection",
                    "kind": "LinkedField",
                    "name": "documents",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SignatoryDocumentEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CloseSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CloseSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "closeSignatureOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
                  (v11/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
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
                  (v4/*: any*/),
                  (v2/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SignatoryDocumentConnection",
                    "kind": "LinkedField",
                    "name": "documents",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SignatoryDocumentEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v11/*: any*/),
                              (v4/*: any*/),
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "75afdd94d2452785450c6bf128853164",
    "id": null,
    "metadata": {},
    "name": "CloseSignatureOrderButtonMutation",
    "operationKind": "mutation",
    "text": "mutation CloseSignatureOrderButtonMutation(\n  $input: CloseSignatureOrderInput!\n) {\n  closeSignatureOrder(input: $input) {\n    signatureOrder {\n      status\n      documents {\n        __typename\n        blob\n        id\n      }\n      signatories {\n        id\n        status\n        statusReason\n        href\n        downloadHref\n        reference\n        role\n        documents {\n          edges {\n            status\n            node {\n              __typename\n              id\n              title\n            }\n          }\n        }\n        evidenceProviders {\n          __typename\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dccfc702a4d8739a2581c4c92a5029ff';
export default node;
