/**
 * @generated SignedSource<<14fcd9f5027b464addb466a4998c23cf>>
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
export type VerifyApplicationEnvironment = "PRODUCTION" | "TEST" | "%future added value";
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
      readonly originalBlob: string | null;
      readonly signatures: ReadonlyArray<{
        readonly __typename: string;
        readonly claims?: ReadonlyArray<{
          readonly name: string;
          readonly value: string;
        }>;
        readonly image?: string;
        readonly jwks?: string;
        readonly jwt?: string;
        readonly name?: string | null;
        readonly signatory: {
          readonly id: string;
          readonly reference: string | null;
          readonly role: string | null;
        } | null;
        readonly signatures?: ReadonlyArray<{
          readonly __typename: "DrawableSignature";
          readonly image: string;
          readonly name: string | null;
        } | {
          readonly __typename: "JWTSignature";
          readonly claims: ReadonlyArray<{
            readonly name: string;
            readonly value: string;
          }>;
          readonly jwks: string;
          readonly jwt: string;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        }>;
      }> | null;
      readonly title: string;
    }>;
    readonly evidenceProviders: ReadonlyArray<{
      readonly __typename: string;
      readonly acrValues?: ReadonlyArray<string>;
      readonly alwaysRedirect?: boolean;
      readonly audiences?: ReadonlyArray<string>;
      readonly clientID?: string;
      readonly domain?: string;
      readonly environment?: VerifyApplicationEnvironment | null;
      readonly id: string;
      readonly loginHint?: string | null;
      readonly message?: string | null;
      readonly minimumHeight?: number | null;
      readonly minimumWidth?: number | null;
      readonly name?: string;
      readonly providers?: ReadonlyArray<{
        readonly __typename: string;
      }>;
      readonly requireName?: boolean;
      readonly scope?: string | null;
    }>;
    readonly expiresAt: any;
    readonly id: string;
    readonly maxSignatories: number;
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
      readonly renderPdfAnnotationLayer: boolean;
      readonly signatoryRedirectUri: string | null;
      readonly stylesheet: string | null;
    };
    readonly webhook: {
      readonly url: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"AddSignatoryButton_signatureOrder" | "CancelSignatureOrderButton_signatureOrder" | "ChangeSignatoryButton_signatureOrder" | "ChangeSignatureOrderButton_signatureOrder" | "CleanupSignatureOrderButton_signatureOrder" | "CloseSignatureOrderButton_signatureOrder" | "DeleteSignatoryButton_signatureOrder" | "ExtendSignatureOrderButton_signatureOrder" | "SignActingAsButton_signatureOrder">;
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
  "name": "maxSignatories",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expiresAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "closedAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
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
        (v10/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "disableRejection",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "renderPdfAnnotationLayer",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = {
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "statusReason",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadHref",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v18 = [
  (v17/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "domain",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientID",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "acrValues",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alwaysRedirect",
  "storageKey": null
},
v24 = {
  "kind": "InlineFragment",
  "selections": [
    (v19/*: any*/),
    (v20/*: any*/),
    (v21/*: any*/),
    (v22/*: any*/),
    (v23/*: any*/)
  ],
  "type": "OidcJWTSignatureEvidenceProvider",
  "abstractKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "loginHint",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scope",
  "storageKey": null
},
v28 = {
  "kind": "InlineFragment",
  "selections": [
    (v19/*: any*/),
    (v20/*: any*/),
    (v21/*: any*/),
    (v22/*: any*/),
    (v23/*: any*/),
    (v25/*: any*/),
    (v26/*: any*/),
    (v27/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "audiences",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "environment",
      "storageKey": null
    }
  ],
  "type": "CriiptoVerifySignatureEvidenceProvider",
  "abstractKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requireName",
  "storageKey": null
},
v30 = {
  "kind": "InlineFragment",
  "selections": [
    (v29/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minimumWidth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minimumHeight",
      "storageKey": null
    }
  ],
  "type": "DrawableSignatureEvidenceProvider",
  "abstractKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "blob",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "originalBlob",
  "storageKey": null
},
v33 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "JWTClaim",
      "kind": "LinkedField",
      "name": "claims",
      "plural": true,
      "selections": [
        (v19/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jwt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jwks",
      "storageKey": null
    }
  ],
  "type": "JWTSignature",
  "abstractKey": null
},
v34 = {
  "kind": "InlineFragment",
  "selections": [
    (v19/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    }
  ],
  "type": "DrawableSignature",
  "abstractKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "signatures",
  "plural": true,
  "selections": [
    (v17/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Signatory",
      "kind": "LinkedField",
      "name": "signatory",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/)
      ],
      "storageKey": null
    },
    (v33/*: any*/),
    (v34/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "signatures",
          "plural": true,
          "selections": [
            (v17/*: any*/),
            (v33/*: any*/),
            (v34/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "CompositeSignature",
      "abstractKey": null
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
          (v9/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
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
              (v13/*: any*/),
              (v10/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
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
                "selections": (v18/*: any*/),
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
              (v17/*: any*/),
              (v2/*: any*/),
              (v24/*: any*/),
              (v28/*: any*/),
              (v30/*: any*/),
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
                    "selections": (v18/*: any*/),
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
              (v17/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v35/*: any*/)
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
            "name": "CleanupSignatureOrderButton_signatureOrder"
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeSignatureOrderButton_signatureOrder"
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
          (v9/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
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
              (v13/*: any*/),
              (v10/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
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
                          (v17/*: any*/),
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
                  (v17/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/)
                    ],
                    "type": "OidcJWTSignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/)
                    ],
                    "type": "CriiptoVerifySignatureEvidenceProvider",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v29/*: any*/)
                    ],
                    "type": "DrawableSignatureEvidenceProvider",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v11/*: any*/)
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
              (v17/*: any*/),
              (v2/*: any*/),
              (v24/*: any*/),
              (v28/*: any*/),
              (v30/*: any*/),
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
                      (v17/*: any*/),
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
              (v17/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isDocument"
              },
              (v2/*: any*/),
              (v4/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v35/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1f0faa9601298c9825677584e4e4ab36",
    "id": null,
    "metadata": {},
    "name": "SignatureOrderScreenQuery",
    "operationKind": "query",
    "text": "query SignatureOrderScreenQuery(\n  $id: ID!\n) {\n  signatureOrder(id: $id) {\n    id\n    status\n    title\n    timezone\n    maxSignatories\n    createdAt\n    expiresAt\n    closedAt\n    ui {\n      signatoryRedirectUri\n      stylesheet\n      language\n      logo {\n        src\n        href\n      }\n      disableRejection\n      renderPdfAnnotationLayer\n    }\n    webhook {\n      url\n    }\n    signatories {\n      id\n      status\n      statusReason\n      href\n      downloadHref\n      reference\n      role\n      documents {\n        edges {\n          status\n          node {\n            __typename\n            id\n            title\n          }\n        }\n      }\n      evidenceProviders {\n        __typename\n        id\n      }\n      ...DeleteSignatoryButton_signatory\n      ...ChangeSignatoryButton_signatory\n      ...SignActingAsButton_signatory\n    }\n    evidenceProviders {\n      __typename\n      id\n      ... on OidcJWTSignatureEvidenceProvider {\n        id\n        name\n        domain\n        clientID\n        acrValues\n        alwaysRedirect\n      }\n      ... on CriiptoVerifySignatureEvidenceProvider {\n        id\n        name\n        domain\n        clientID\n        acrValues\n        alwaysRedirect\n        message\n        loginHint\n        scope\n        audiences\n        environment\n      }\n      ... on DrawableSignatureEvidenceProvider {\n        id\n        requireName\n        minimumWidth\n        minimumHeight\n      }\n      ... on AllOfSignatureEvidenceProvider {\n        providers {\n          __typename\n          id\n        }\n      }\n    }\n    documents {\n      __typename\n      __isDocument: __typename\n      id\n      title\n      blob\n      originalBlob\n      signatures {\n        __typename\n        signatory {\n          id\n          reference\n          role\n        }\n        ... on JWTSignature {\n          claims {\n            name\n            value\n          }\n          jwt\n          jwks\n        }\n        ... on DrawableSignature {\n          name\n          image\n        }\n        ... on CompositeSignature {\n          signatures {\n            __typename\n            ... on JWTSignature {\n              claims {\n                name\n                value\n              }\n              jwt\n              jwks\n            }\n            ... on DrawableSignature {\n              name\n              image\n            }\n          }\n        }\n      }\n    }\n    ...CancelSignatureOrderButton_signatureOrder\n    ...CleanupSignatureOrderButton_signatureOrder\n    ...AddSignatoryButton_signatureOrder\n    ...DeleteSignatoryButton_signatureOrder\n    ...ChangeSignatoryButton_signatureOrder\n    ...SignActingAsButton_signatureOrder\n    ...CloseSignatureOrderButton_signatureOrder\n    ...ExtendSignatureOrderButton_signatureOrder\n    ...ChangeSignatureOrderButton_signatureOrder\n  }\n}\n\nfragment AddSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignatoryModal_signatureOrder\n}\n\nfragment CancelSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment ChangeSignatoryButton_signatory on Signatory {\n  id\n  status\n  ...SignatoryModal_signatory\n}\n\nfragment ChangeSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignatoryModal_signatureOrder\n}\n\nfragment ChangeSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n  maxSignatories\n  ...ChangeSignatureOrderModal_signatureOrder\n}\n\nfragment ChangeSignatureOrderModal_signatureOrder on SignatureOrder {\n  id\n  status\n  maxSignatories\n}\n\nfragment CleanupSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment CloseSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment DeleteSignatoryButton_signatory on Signatory {\n  id\n  status\n}\n\nfragment DeleteSignatoryButton_signatureOrder on SignatureOrder {\n  id\n}\n\nfragment ExtendSignatureOrderButton_signatureOrder on SignatureOrder {\n  id\n  status\n}\n\nfragment SignActingAsButton_signatory on Signatory {\n  id\n  status\n  documents {\n    edges {\n      status\n    }\n  }\n  ...SignActingAsModal_signatory\n}\n\nfragment SignActingAsButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...SignActingAsModal_signatureOrder\n}\n\nfragment SignActingAsModal_signatory on Signatory {\n  id\n  status\n  documents {\n    edges {\n      status\n    }\n  }\n}\n\nfragment SignActingAsModal_signatureOrder on SignatureOrder {\n  id\n  status\n  evidenceProviders {\n    __typename\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n    }\n    id\n  }\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n\nfragment SignatoryModal_signatory on Signatory {\n  id\n  status\n  reference\n  role\n  evidenceProviders {\n    __typename\n    id\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n      loginHint\n      scope\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  documents {\n    edges {\n      status\n      node {\n        __typename\n        id\n      }\n    }\n  }\n  ui {\n    signatoryRedirectUri\n    stylesheet\n    language\n    logo {\n      src\n      href\n    }\n    disableRejection\n    renderPdfAnnotationLayer\n  }\n}\n\nfragment SignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  evidenceProviders {\n    __typename\n    id\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n      loginHint\n      scope\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n"
  }
};
})();

(node as any).hash = "8913f412d898b608ba165ed1a8cc40f3";

export default node;
