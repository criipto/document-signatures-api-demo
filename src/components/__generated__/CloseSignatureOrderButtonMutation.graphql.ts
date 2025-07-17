/**
 * @generated SignedSource<<ea0c04241cff6b4639e4228a4c1dc566>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type CloseSignatureOrderInput = {
  retainDocumentsForDays?: number | null;
  signatureOrderId: string;
};
export type CloseSignatureOrderButtonMutation$variables = {
  input: CloseSignatureOrderInput;
};
export type CloseSignatureOrderButtonMutation$data = {
  readonly closeSignatureOrder: {
    readonly signatureOrder: {
      readonly documents: ReadonlyArray<{
        readonly blob: string | null;
      }>;
      readonly signatories: ReadonlyArray<{
        readonly documents: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly id: string;
              readonly title: string;
            };
            readonly status: SignatoryDocumentStatus | null;
          }>;
        };
        readonly downloadHref: string | null;
        readonly evidenceProviders: ReadonlyArray<{
          readonly __typename: string;
        }>;
        readonly href: string;
        readonly id: string;
        readonly reference: string | null;
        readonly role: string | null;
        readonly spanId: string;
        readonly status: SignatoryStatus;
        readonly statusReason: string | null;
        readonly traceId: string;
      }>;
      readonly status: SignatureOrderStatus;
    };
  } | null;
};
export type CloseSignatureOrderButtonMutation = {
  response: CloseSignatureOrderButtonMutation$data;
  variables: CloseSignatureOrderButtonMutation$variables;
};

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
  "name": "traceId",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "spanId",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
                  (v10/*: any*/),
                  (v11/*: any*/),
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
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "evidenceProviders",
                    "plural": true,
                    "selections": [
                      (v13/*: any*/)
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
                  (v13/*: any*/),
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
                  (v10/*: any*/),
                  (v11/*: any*/),
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
                              (v13/*: any*/),
                              (v4/*: any*/),
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "evidenceProviders",
                    "plural": true,
                    "selections": [
                      (v13/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
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
    "cacheID": "5c673a02f862f694451fec5169df603e",
    "id": null,
    "metadata": {},
    "name": "CloseSignatureOrderButtonMutation",
    "operationKind": "mutation",
    "text": "mutation CloseSignatureOrderButtonMutation(\n  $input: CloseSignatureOrderInput!\n) {\n  closeSignatureOrder(input: $input) {\n    signatureOrder {\n      status\n      documents {\n        __typename\n        blob\n        id\n      }\n      signatories {\n        id\n        status\n        statusReason\n        href\n        downloadHref\n        reference\n        role\n        traceId\n        spanId\n        documents {\n          edges {\n            status\n            node {\n              __typename\n              id\n              title\n            }\n          }\n        }\n        evidenceProviders {\n          __typename\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dccfc702a4d8739a2581c4c92a5029ff";

export default node;
