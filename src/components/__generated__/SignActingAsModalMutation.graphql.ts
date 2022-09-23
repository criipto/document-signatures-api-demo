/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignActingAsInput = {
    signatoryId: string;
    evidence: SignInput;
};
export type SignInput = {
    id: string;
    oidc?: SignOidcInput | null;
    criiptoVerify?: SignCriiptoVerifyInput | null;
    drawable?: SignDrawableInput | null;
    noop?: boolean | null;
};
export type SignOidcInput = {
    jwt: string;
};
export type SignCriiptoVerifyInput = {
    jwt: string;
};
export type SignDrawableInput = {
    name?: string | null;
    image: string;
};
export type SignActingAsModalMutationVariables = {
    input: SignActingAsInput;
};
export type SignActingAsModalMutationResponse = {
    readonly signActingAs: {
        readonly signatureOrder: {
            readonly signatories: ReadonlyArray<{
                readonly id: string;
                readonly status: SignatoryStatus;
                readonly statusReason: string | null;
                readonly href: string;
                readonly reference: string | null;
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
            readonly " $fragmentRefs": FragmentRefs<"SignActingAsModal_signatureOrder">;
        };
    } | null;
};
export type SignActingAsModalMutation = {
    readonly response: SignActingAsModalMutationResponse;
    readonly variables: SignActingAsModalMutationVariables;
};



/*
mutation SignActingAsModalMutation(
  $input: SignActingAsInput!
) {
  signActingAs(input: $input) {
    signatureOrder {
      ...SignActingAsModal_signatureOrder
      signatories {
        id
        status
        statusReason
        href
        reference
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

fragment SignActingAsModal_signatureOrder on SignatureOrder {
  id
  status
  evidenceProviders {
    __typename
    ... on DrawableSignatureEvidenceProvider {
      id
      requireName
    }
    ... on OidcJWTSignatureEvidenceProvider {
      id
    }
    ... on CriiptoVerifySignatureEvidenceProvider {
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
  "name": "reference",
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
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "evidenceProviders",
  "plural": true,
  "selections": [
    (v8/*: any*/)
  ],
  "storageKey": null
},
v10 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignActingAsModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignActingAsOutput",
        "kind": "LinkedField",
        "name": "signActingAs",
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
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SignActingAsModal_signatureOrder"
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
    "name": "SignActingAsModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignActingAsOutput",
        "kind": "LinkedField",
        "name": "signActingAs",
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
                "name": "evidenceProviders",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
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
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v10/*: any*/),
                    "type": "OidcJWTSignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v10/*: any*/),
                    "type": "CriiptoVerifySignatureEvidenceProvider",
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
                              (v8/*: any*/),
                              (v2/*: any*/),
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
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
    "cacheID": "e9c974614d6186df7707fb2e78d9bd1c",
    "id": null,
    "metadata": {},
    "name": "SignActingAsModalMutation",
    "operationKind": "mutation",
    "text": "mutation SignActingAsModalMutation(\n  $input: SignActingAsInput!\n) {\n  signActingAs(input: $input) {\n    signatureOrder {\n      ...SignActingAsModal_signatureOrder\n      signatories {\n        id\n        status\n        statusReason\n        href\n        reference\n        documents {\n          edges {\n            status\n            node {\n              __typename\n              id\n              title\n            }\n          }\n        }\n        evidenceProviders {\n          __typename\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment SignActingAsModal_signatureOrder on SignatureOrder {\n  id\n  status\n  evidenceProviders {\n    __typename\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '46c90cceade6b52a3f50688ad608f826';
export default node;
