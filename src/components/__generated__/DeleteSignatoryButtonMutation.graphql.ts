/**
 * @generated SignedSource<<66d7ff53a72d35035704b95f54d99551>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type DeleteSignatoryInput = {
  signatoryId: string;
  signatureOrderId: string;
};
export type DeleteSignatoryButtonMutation$variables = {
  input: DeleteSignatoryInput;
};
export type DeleteSignatoryButtonMutation$data = {
  readonly deleteSignatory: {
    readonly signatureOrder: {
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
      readonly " $fragmentSpreads": FragmentRefs<"AddSignatoryButton_signatureOrder">;
    };
  } | null;
};
export type DeleteSignatoryButtonMutation = {
  response: DeleteSignatoryButtonMutation$data;
  variables: DeleteSignatoryButtonMutation$variables;
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "statusReason",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadHref",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "traceId",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "spanId",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v13 = [
  (v12/*: any*/),
  (v2/*: any*/),
  (v11/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "domain",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientID",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "acrValues",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteSignatoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteSignatoryOutput",
        "kind": "LinkedField",
        "name": "deleteSignatory",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AddSignatoryButton_signatureOrder"
              },
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v11/*: any*/)
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
    "name": "DeleteSignatoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteSignatoryOutput",
        "kind": "LinkedField",
        "name": "deleteSignatory",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "documents",
                "plural": true,
                "selections": (v13/*: any*/),
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
                  (v12/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/)
                    ],
                    "type": "OidcJWTSignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "message",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "loginHint",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "scope",
                        "storageKey": null
                      }
                    ],
                    "type": "CriiptoVerifySignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "requireName",
                        "storageKey": null
                      }
                    ],
                    "type": "DrawableSignatureEvidenceProvider",
                    "abstractKey": null
                  }
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": (v13/*: any*/),
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
                      (v12/*: any*/),
                      (v2/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "7569925cf29d162b8d364dd9807c0029",
    "id": null,
    "metadata": {},
    "name": "DeleteSignatoryButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteSignatoryButtonMutation(\n  $input: DeleteSignatoryInput!\n) {\n  deleteSignatory(input: $input) {\n    signatureOrder {\n      ...AddSignatoryButton_signatureOrder\n      signatories {\n        id\n        status\n        statusReason\n        href\n        downloadHref\n        reference\n        role\n        traceId\n        spanId\n        documents {\n          edges {\n            status\n            node {\n              __typename\n              id\n              title\n            }\n          }\n        }\n        evidenceProviders {\n          __typename\n          id\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment AddSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignatoryModal_signatureOrder\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n\nfragment SignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  evidenceProviders {\n    __typename\n    id\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n      loginHint\n      scope\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n"
  }
};
})();

(node as any).hash = "dddc6a5c868815bed1dc3b4e87ddfb86";

export default node;
