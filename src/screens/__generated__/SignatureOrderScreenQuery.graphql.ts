/**
 * @generated SignedSource<<8aae3a6b15f95a1ea70458431171bf4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Language = "DA_DK" | "EN_US" | "NB_NO" | "SV_SE" | "%future added value";
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type SignatureOrderScreenQuery$variables = {
  id: string;
};
export type SignatureOrderScreenQuery$data = {
  readonly signatureOrder: {
    readonly closedAt: any | null;
    readonly createdAt: any;
    readonly documents: ReadonlyArray<{
      readonly __typename: string;
      readonly blob: string | null;
      readonly id: string;
      readonly signatures: ReadonlyArray<{
        readonly __typename: string;
        readonly signatory: {
          readonly id: string;
          readonly reference: string | null;
          readonly role: string | null;
        } | null;
      }> | null;
      readonly title: string;
    }>;
    readonly evidenceProviders: ReadonlyArray<{
      readonly __typename: string;
      readonly acrValues?: ReadonlyArray<string>;
      readonly alwaysRedirect?: boolean;
      readonly clientID?: string;
      readonly domain?: string;
      readonly id: string;
      readonly loginHint?: string | null;
      readonly message?: string | null;
      readonly name?: string;
      readonly providers?: ReadonlyArray<{
        readonly __typename: string;
      }>;
      readonly requireName?: boolean;
      readonly scope?: string | null;
    }>;
    readonly expiresAt: any;
    readonly id: string;
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
      readonly status: SignatoryStatus;
      readonly statusReason: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"ChangeSignatoryButton_signatory" | "DeleteSignatoryButton_signatory" | "SignActingAsButton_signatory">;
    }>;
    readonly status: SignatureOrderStatus;
    readonly timezone: string;
    readonly title: string | null;
    readonly ui: {
      readonly disableRejection: boolean;
      readonly language: Language;
      readonly logo: {
        readonly href: string | null;
        readonly src: string;
      } | null;
      readonly signatoryRedirectUri: string | null;
      readonly stylesheet: string | null;
    };
    readonly webhook: {
      readonly url: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"AddSignatoryButton_signatureOrder" | "CancelSignatureOrderButton_signatureOrder" | "ChangeSignatoryButton_signatureOrder" | "CloseSignatureOrderButton_signatureOrder" | "DeleteSignatoryButton_signatureOrder" | "ExtendSignatureOrderButton_signatureOrder" | "SignActingAsButton_signatureOrder">;
  } | null;
};
export type SignatureOrderScreenQuery = {
  response: SignatureOrderScreenQuery$data;
  variables: SignatureOrderScreenQuery$variables;
};

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
  "concreteType": "SignatureOrderWebhook",
  "kind": "LinkedField",
  "name": "webhook",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "statusReason",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadHref",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v17 = [
  (v16/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "domain",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientID",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "acrValues",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alwaysRedirect",
  "storageKey": null
},
v23 = {
  "kind": "InlineFragment",
  "selections": [
    (v18/*: any*/),
    (v19/*: any*/),
    (v20/*: any*/),
    (v21/*: any*/),
    (v22/*: any*/)
  ],
  "type": "OidcJWTSignatureEvidenceProvider",
  "abstractKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "loginHint",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scope",
  "storageKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    (v18/*: any*/),
    (v19/*: any*/),
    (v20/*: any*/),
    (v21/*: any*/),
    (v22/*: any*/),
    (v24/*: any*/),
    (v25/*: any*/),
    (v26/*: any*/)
  ],
  "type": "CriiptoVerifySignatureEvidenceProvider",
  "abstractKey": null
},
v28 = {
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
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "blob",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "signatures",
  "plural": true,
  "selections": [
    (v16/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Signatory",
      "kind": "LinkedField",
      "name": "signatory",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/)
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
          (v11/*: any*/),
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
              (v12/*: any*/),
              (v9/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
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
                "selections": (v17/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "evidenceProviders",
            "plural": true,
            "selections": [
              (v16/*: any*/),
              (v2/*: any*/),
              (v23/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "providers",
                    "plural": true,
                    "selections": (v17/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "AllOfSignatureEvidenceProvider",
                "abstractKey": null
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
              (v16/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/)
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
          (v11/*: any*/),
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
              (v12/*: any*/),
              (v9/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
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
                          (v16/*: any*/),
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
                  (v16/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/)
                    ],
                    "type": "OidcJWTSignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/)
                    ],
                    "type": "CriiptoVerifySignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  (v28/*: any*/)
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
              (v16/*: any*/),
              (v2/*: any*/),
              (v23/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "providers",
                    "plural": true,
                    "selections": [
                      (v16/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "AllOfSignatureEvidenceProvider",
                "abstractKey": null
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
              (v16/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isDocument"
              },
              (v2/*: any*/),
              (v4/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ca6089e9cfe0c5a0e4335f559cc783e3",
    "id": null,
    "metadata": {},
    "name": "SignatureOrderScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrderScreenQuery(\n  $id: ID!\n) {\n  signatureOrder(id: $id) {\n    id\n    status\n    title\n    timezone\n    createdAt\n    expiresAt\n    closedAt\n    ui {\n      signatoryRedirectUri\n      stylesheet\n      language\n      logo {\n        src\n        href\n      }\n      disableRejection\n    }\n    webhook {\n      url\n    }\n    signatories {\n      id\n      status\n      statusReason\n      href\n      downloadHref\n      reference\n      role\n      documents {\n        edges {\n          status\n          node {\n            __typename\n            id\n            title\n          }\n        }\n      }\n      evidenceProviders {\n        __typename\n        id\n      }\n      ...DeleteSignatoryButton_signatory\n      ...ChangeSignatoryButton_signatory\n      ...SignActingAsButton_signatory\n    }\n    evidenceProviders {\n      __typename\n      id\n      ... on OidcJWTSignatureEvidenceProvider {\n        id\n        name\n        domain\n        clientID\n        acrValues\n        alwaysRedirect\n      }\n      ... on CriiptoVerifySignatureEvidenceProvider {\n        id\n        name\n        domain\n        clientID\n        acrValues\n        alwaysRedirect\n        message\n        loginHint\n        scope\n      }\n      ... on DrawableSignatureEvidenceProvider {\n        id\n        requireName\n      }\n      ... on AllOfSignatureEvidenceProvider {\n        providers {\n          __typename\n          id\n        }\n      }\n    }\n    documents {\n      __typename\n      __isDocument: __typename\n      id\n      title\n      blob\n      signatures {\n        __typename\n        signatory {\n          id\n          reference\n          role\n        }\n      }\n    }\n    ...CancelSignatureOrderButton_signatureOrder\n    ...AddSignatoryButton_signatureOrder\n    ...DeleteSignatoryButton_signatureOrder\n    ...ChangeSignatoryButton_signatureOrder\n    ...SignActingAsButton_signatureOrder\n    ...CloseSignatureOrderButton_signatureOrder\n    ...ExtendSignatureOrderButton_signatureOrder\n  }\n}\n\nfragment AddSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignatoryModal_signatureOrder\n}\n\nfragment CancelSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment ChangeSignatoryButton_signatory on Signatory {\n  id\n  status\n  ...SignatoryModal_signatory\n}\n\nfragment ChangeSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignatoryModal_signatureOrder\n}\n\nfragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment DeleteSignatoryButton_signatory on Signatory {\n  id\n  status\n}\n\nfragment DeleteSignatoryButton_signatureOrder on SignatureOrder {\n  id\n}\n\nfragment ExtendSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment SignActingAsButton_signatory on Signatory {\n  id\n  status\n  documents {\n    edges {\n      status\n    }\n  }\n  ...SignActingAsModal_signatory\n}\n\nfragment SignActingAsButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignActingAsModal_signatureOrder\n}\n\nfragment SignActingAsModal_signatory on Signatory {\n  id\n  status\n  documents {\n    edges {\n      status\n    }\n  }\n}\n\nfragment SignActingAsModal_signatureOrder on SignatureOrder {\n  id\n  status\n  evidenceProviders {\n    __typename\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n    }\n    id\n  }\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n\nfragment SignatoryModal_signatory on Signatory {\n  id\n  status\n  reference\n  role\n  evidenceProviders {\n    __typename\n    id\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n      loginHint\n      scope\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  documents {\n    edges {\n      status\n      node {\n        __typename\n        id\n      }\n    }\n  }\n}\n\nfragment SignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  evidenceProviders {\n    __typename\n    id\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n      loginHint\n      scope\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n"
  }
};
})();

(node as any).hash = "0b072149dd9db3c38f9d7f62fb3f75e4";

export default node;
