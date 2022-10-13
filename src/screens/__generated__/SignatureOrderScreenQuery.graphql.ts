/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Language = "DA_DK" | "EN_US" | "SV_SE" | "%future added value";
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type SignatureOrderScreenQueryVariables = {
    id: string;
};
export type SignatureOrderScreenQueryResponse = {
    readonly signatureOrder: {
        readonly id: string;
        readonly status: SignatureOrderStatus;
        readonly title: string | null;
        readonly timezone: string;
        readonly createdAt: unknown;
        readonly expiresAt: unknown;
        readonly closedAt: unknown | null;
        readonly ui: {
            readonly signatoryRedirectUri: string | null;
            readonly stylesheet: string | null;
            readonly language: Language;
            readonly logo: {
                readonly src: string;
                readonly href: string | null;
            } | null;
            readonly disableRejection: boolean;
        };
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
            readonly " $fragmentRefs": FragmentRefs<"DeleteSignatoryButton_signatory" | "ChangeSignatoryButton_signatory" | "SignActingAsButton_signatory">;
        }>;
        readonly evidenceProviders: ReadonlyArray<{
            readonly __typename: "OidcJWTSignatureEvidenceProvider";
            readonly id: string;
            readonly name: string;
            readonly domain: string;
            readonly clientID: string;
            readonly acrValues: ReadonlyArray<string>;
            readonly alwaysRedirect: boolean;
        } | {
            readonly __typename: "CriiptoVerifySignatureEvidenceProvider";
            readonly id: string;
            readonly name: string;
            readonly domain: string;
            readonly clientID: string;
            readonly acrValues: ReadonlyArray<string>;
            readonly alwaysRedirect: boolean;
            readonly message: string | null;
        } | {
            readonly __typename: "DrawableSignatureEvidenceProvider";
            readonly id: string;
            readonly requireName: boolean;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }>;
        readonly documents: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
            readonly blob: string | null;
            readonly signatures: ReadonlyArray<{
                readonly __typename: string;
                readonly signatory: {
                    readonly id: string;
                    readonly reference: string | null;
                } | null;
            }> | null;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"CancelSignatureOrderButton_signatureOrder" | "AddSignatoryButton_signatureOrder" | "DeleteSignatoryButton_signatureOrder" | "ChangeSignatoryButton_signatureOrder" | "SignActingAsButton_signatureOrder" | "CloseSignatureOrderButton_signatureOrder" | "ExtendSignatureOrderButton_signatureOrder">;
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
    title
    timezone
    createdAt
    expiresAt
    closedAt
    ui {
      signatoryRedirectUri
      stylesheet
      language
      logo {
        src
        href
      }
      disableRejection
    }
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
      ...DeleteSignatoryButton_signatory
      ...ChangeSignatoryButton_signatory
      ...SignActingAsButton_signatory
    }
    evidenceProviders {
      __typename
      ... on OidcJWTSignatureEvidenceProvider {
        id
        name
        domain
        clientID
        acrValues
        alwaysRedirect
      }
      ... on CriiptoVerifySignatureEvidenceProvider {
        id
        name
        domain
        clientID
        acrValues
        alwaysRedirect
        message
      }
      ... on DrawableSignatureEvidenceProvider {
        id
        requireName
      }
    }
    documents {
      __typename
      __isDocument: __typename
      id
      title
      blob
      signatures {
        __typename
        signatory {
          id
          reference
        }
      }
    }
    ...CancelSignatureOrderButton_signatureOrder
    ...AddSignatoryButton_signatureOrder
    ...DeleteSignatoryButton_signatureOrder
    ...ChangeSignatoryButton_signatureOrder
    ...SignActingAsButton_signatureOrder
    ...CloseSignatureOrderButton_signatureOrder
    ...ExtendSignatureOrderButton_signatureOrder
  }
}

fragment AddSignatoryButton_signatureOrder on SignatureOrder {
  id
  status
  ...SignatoryModal_signatureOrder
}

fragment CancelSignatureOrderButton_signatureOrder on SignatureOrder {
  id
  status
}

fragment ChangeSignatoryButton_signatory on Signatory {
  id
  status
  ...SignatoryModal_signatory
}

fragment ChangeSignatoryButton_signatureOrder on SignatureOrder {
  id
  status
  ...SignatoryModal_signatureOrder
}

fragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {
  id
  status
}

fragment DeleteSignatoryButton_signatory on Signatory {
  id
  status
}

fragment DeleteSignatoryButton_signatureOrder on SignatureOrder {
  id
}

fragment ExtendSignatureOrderButton_signatureOrder on SignatureOrder {
  id
  status
}

fragment SignActingAsButton_signatory on Signatory {
  id
  status
  documents {
    edges {
      status
    }
  }
  ...SignActingAsModal_signatory
}

fragment SignActingAsButton_signatureOrder on SignatureOrder {
  id
  status
  ...SignActingAsModal_signatureOrder
}

fragment SignActingAsModal_signatory on Signatory {
  id
  status
  documents {
    edges {
      status
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

fragment SignatoryDocumentInput_signatureOrder on SignatureOrder {
  documents {
    __typename
    id
    title
  }
}

fragment SignatoryModal_signatory on Signatory {
  id
  status
  reference
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
  documents {
    edges {
      status
      node {
        __typename
        id
      }
    }
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timezone",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expiresAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "closedAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "SignatureOrderUI",
  "kind": "LinkedField",
  "name": "ui",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "signatoryRedirectUri",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stylesheet",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "language",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SignatureOrderUILogo",
      "kind": "LinkedField",
      "name": "logo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        },
        (v9/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "disableRejection",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "statusReason",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alwaysRedirect",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v20 = {
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
v21 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "evidenceProviders",
  "plural": true,
  "selections": [
    (v13/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/),
        (v17/*: any*/),
        (v18/*: any*/)
      ],
      "type": "OidcJWTSignatureEvidenceProvider",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/),
        (v17/*: any*/),
        (v18/*: any*/),
        (v19/*: any*/)
      ],
      "type": "CriiptoVerifySignatureEvidenceProvider",
      "abstractKey": null
    },
    (v20/*: any*/)
  ],
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "blob",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "signatures",
  "plural": true,
  "selections": [
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Signatory",
      "kind": "LinkedField",
      "name": "signatory",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v12/*: any*/)
      ],
      "storageKey": null
    }
  ],
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
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v10/*: any*/),
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
              (v11/*: any*/),
              (v9/*: any*/),
              (v12/*: any*/),
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
                          (v4/*: any*/)
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
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DeleteSignatoryButton_signatory"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChangeSignatoryButton_signatory"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SignActingAsButton_signatory"
              }
            ],
            "storageKey": null
          },
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/)
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
            "name": "ChangeSignatoryButton_signatureOrder"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SignActingAsButton_signatureOrder"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CloseSignatureOrderButton_signatureOrder"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ExtendSignatureOrderButton_signatureOrder"
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
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v10/*: any*/),
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
              (v11/*: any*/),
              (v9/*: any*/),
              (v12/*: any*/),
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
                          (v13/*: any*/),
                          (v2/*: any*/),
                          (v4/*: any*/)
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
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
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
                      (v2/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v19/*: any*/)
                    ],
                    "type": "CriiptoVerifySignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  (v20/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              (v13/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isDocument"
              },
              (v2/*: any*/),
              (v4/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "185d87babe8ccc685b45001a8c8d4778",
    "id": null,
    "metadata": {},
    "name": "SignatureOrderScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrderScreenQuery(\n  $id: ID!\n) {\n  signatureOrder(id: $id) {\n    id\n    status\n    title\n    timezone\n    createdAt\n    expiresAt\n    closedAt\n    ui {\n      signatoryRedirectUri\n      stylesheet\n      language\n      logo {\n        src\n        href\n      }\n      disableRejection\n    }\n    signatories {\n      id\n      status\n      statusReason\n      href\n      reference\n      documents {\n        edges {\n          status\n          node {\n            __typename\n            id\n            title\n          }\n        }\n      }\n      evidenceProviders {\n        __typename\n      }\n      ...DeleteSignatoryButton_signatory\n      ...ChangeSignatoryButton_signatory\n      ...SignActingAsButton_signatory\n    }\n    evidenceProviders {\n      __typename\n      ... on OidcJWTSignatureEvidenceProvider {\n        id\n        name\n        domain\n        clientID\n        acrValues\n        alwaysRedirect\n      }\n      ... on CriiptoVerifySignatureEvidenceProvider {\n        id\n        name\n        domain\n        clientID\n        acrValues\n        alwaysRedirect\n        message\n      }\n      ... on DrawableSignatureEvidenceProvider {\n        id\n        requireName\n      }\n    }\n    documents {\n      __typename\n      __isDocument: __typename\n      id\n      title\n      blob\n      signatures {\n        __typename\n        signatory {\n          id\n          reference\n        }\n      }\n    }\n    ...CancelSignatureOrderButton_signatureOrder\n    ...AddSignatoryButton_signatureOrder\n    ...DeleteSignatoryButton_signatureOrder\n    ...ChangeSignatoryButton_signatureOrder\n    ...SignActingAsButton_signatureOrder\n    ...CloseSignatureOrderButton_signatureOrder\n    ...ExtendSignatureOrderButton_signatureOrder\n  }\n}\n\nfragment AddSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignatoryModal_signatureOrder\n}\n\nfragment CancelSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment ChangeSignatoryButton_signatory on Signatory {\n  id\n  status\n  ...SignatoryModal_signatory\n}\n\nfragment ChangeSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignatoryModal_signatureOrder\n}\n\nfragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment DeleteSignatoryButton_signatory on Signatory {\n  id\n  status\n}\n\nfragment DeleteSignatoryButton_signatureOrder on SignatureOrder {\n  id\n}\n\nfragment ExtendSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment SignActingAsButton_signatory on Signatory {\n  id\n  status\n  documents {\n    edges {\n      status\n    }\n  }\n  ...SignActingAsModal_signatory\n}\n\nfragment SignActingAsButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignActingAsModal_signatureOrder\n}\n\nfragment SignActingAsModal_signatory on Signatory {\n  id\n  status\n  documents {\n    edges {\n      status\n    }\n  }\n}\n\nfragment SignActingAsModal_signatureOrder on SignatureOrder {\n  id\n  status\n  evidenceProviders {\n    __typename\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n    }\n  }\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n\nfragment SignatoryModal_signatory on Signatory {\n  id\n  status\n  reference\n  evidenceProviders {\n    __typename\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  documents {\n    edges {\n      status\n      node {\n        __typename\n        id\n      }\n    }\n  }\n}\n\nfragment SignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  evidenceProviders {\n    __typename\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n"
  }
};
})();
(node as any).hash = '023cb532c445b69ff788577e5a86f583';
export default node;
