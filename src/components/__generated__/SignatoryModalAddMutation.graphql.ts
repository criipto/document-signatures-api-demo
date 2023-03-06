/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type AddSignatoryInput = {
    signatureOrderId: string;
    reference?: string | null;
    role?: string | null;
    documents?: Array<SignatoryDocumentInput> | null;
    evidenceProviders?: Array<SignatoryEvidenceProviderInput> | null;
    evidenceValidation?: Array<SignatoryEvidenceValidationInput> | null;
    signatureAppearance?: SignatureAppearanceInput | null;
};
export type SignatoryDocumentInput = {
    id: string;
    preapproved?: boolean | null;
    pdfSealPosition?: PdfSealPosition | null;
};
export type PdfSealPosition = {
    page: number;
    x: number;
    y: number;
};
export type SignatoryEvidenceProviderInput = {
    id: string;
};
export type SignatoryEvidenceValidationInput = {
    key: string;
    value: string;
};
export type SignatureAppearanceInput = {
    identifierFromEvidence: Array<string>;
    displayName?: Array<SignatureAppearanceTemplateInput> | null;
};
export type SignatureAppearanceTemplateInput = {
    template: string;
    replacements?: Array<SignatureAppearanceTemplateReplacementInput> | null;
};
export type SignatureAppearanceTemplateReplacementInput = {
    placeholder: string;
    fromEvidence: Array<string>;
};
export type SignatoryModalAddMutationVariables = {
    input: AddSignatoryInput;
};
export type SignatoryModalAddMutationResponse = {
    readonly addSignatory: {
        readonly signatureOrder: {
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
            readonly " $fragmentRefs": FragmentRefs<"SignatoryModal_signatureOrder">;
        };
    } | null;
};
export type SignatoryModalAddMutation = {
    readonly response: SignatoryModalAddMutationResponse;
    readonly variables: SignatoryModalAddMutationVariables;
};



/*
mutation SignatoryModalAddMutation(
  $input: AddSignatoryInput!
) {
  addSignatory(input: $input) {
    signatureOrder {
      ...SignatoryModal_signatureOrder
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

fragment SignatoryDocumentInput_signatureOrder on SignatureOrder {
  documents {
    __typename
    id
    title
  }
}

fragment SignatoryModal_signatureOrder on SignatureOrder {
  id
  status
  documents {
    __typename
    id
  }
  evidenceProviders {
    __typename
    ... on OidcJWTSignatureEvidenceProvider {
      id
      name
      domain
      clientID
      acrValues
    }
    ... on CriiptoVerifySignatureEvidenceProvider {
      id
      name
      domain
      clientID
      acrValues
      message
    }
    ... on DrawableSignatureEvidenceProvider {
      id
      requireName
    }
  }
  ...SignatoryDocumentInput_signatureOrder
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
  "name": "title",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "evidenceProviders",
  "plural": true,
  "selections": [
    (v10/*: any*/)
  ],
  "storageKey": null
},
v12 = [
  (v10/*: any*/),
  (v2/*: any*/),
  (v9/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "domain",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientID",
  "storageKey": null
},
v16 = {
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
    "name": "SignatoryModalAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddSignatoryOutput",
        "kind": "LinkedField",
        "name": "addSignatory",
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
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SignatoryModal_signatureOrder"
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
    "name": "SignatoryModalAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddSignatoryOutput",
        "kind": "LinkedField",
        "name": "addSignatory",
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
                "selections": (v12/*: any*/),
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
                  (v10/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/)
                    ],
                    "type": "OidcJWTSignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "message",
                        "storageKey": null
                      }
                    ],
                    "type": "CriiptoVerifySignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
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
                            "selections": (v12/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
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
    "cacheID": "3d09adbf2db36dd6b72926ee22e2d41d",
    "id": null,
    "metadata": {},
    "name": "SignatoryModalAddMutation",
    "operationKind": "mutation",
    "text": "mutation SignatoryModalAddMutation(\n  $input: AddSignatoryInput!\n) {\n  addSignatory(input: $input) {\n    signatureOrder {\n      ...SignatoryModal_signatureOrder\n      signatories {\n        id\n        status\n        statusReason\n        href\n        downloadHref\n        reference\n        role\n        documents {\n          edges {\n            status\n            node {\n              __typename\n              id\n              title\n            }\n          }\n        }\n        evidenceProviders {\n          __typename\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n\nfragment SignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  evidenceProviders {\n    __typename\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n"
  }
};
})();
(node as any).hash = '2f7de82b7d6488842f8b428ec78ad1c3';
export default node;
