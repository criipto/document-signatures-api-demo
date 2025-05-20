/**
 * @generated SignedSource<<6449d435cd8600b874f2563fa056790a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Language = "DA_DK" | "EN_US" | "NB_NO" | "SV_SE" | "%future added value";
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type ChangeSignatoryInput = {
  documents?: ReadonlyArray<SignatoryDocumentInput> | null;
  evidenceProviders?: ReadonlyArray<SignatoryEvidenceProviderInput> | null;
  evidenceValidation?: ReadonlyArray<SignatoryEvidenceValidationInput> | null;
  reference?: string | null;
  role?: string | null;
  signatoryId: string;
  signatureAppearance?: SignatureAppearanceInput | null;
  ui?: SignatoryUIInput | null;
};
export type SignatoryDocumentInput = {
  id: string;
  pdfSealPosition?: PdfSealPosition | null;
  preapproved?: boolean | null;
};
export type PdfSealPosition = {
  page: number;
  x: number;
  y: number;
};
export type SignatoryEvidenceProviderInput = {
  allOf?: AllOfEvidenceProviderInput | null;
  criiptoVerify?: CriiptoVerifyProviderInput | null;
  drawable?: DrawableEvidenceProviderInput | null;
  id: string;
  noop?: NoopEvidenceProviderInput | null;
  oidc?: OidcEvidenceProviderInput | null;
};
export type AllOfEvidenceProviderInput = {
  providers: ReadonlyArray<SingleEvidenceProviderInput>;
};
export type SingleEvidenceProviderInput = {
  criiptoVerify?: CriiptoVerifyProviderInput | null;
  drawable?: DrawableEvidenceProviderInput | null;
  noop?: NoopEvidenceProviderInput | null;
  oidc?: OidcEvidenceProviderInput | null;
};
export type CriiptoVerifyProviderInput = {
  acrValues?: ReadonlyArray<string> | null;
  alwaysRedirect?: boolean | null;
  audiences?: ReadonlyArray<string> | null;
  loginHint?: string | null;
  message?: string | null;
  scope?: string | null;
  uniqueEvidenceKey?: string | null;
};
export type DrawableEvidenceProviderInput = {
  minimumHeight?: number | null;
  minimumWidth?: number | null;
  requireName?: boolean | null;
};
export type NoopEvidenceProviderInput = {
  name: string;
};
export type OidcEvidenceProviderInput = {
  acrValues?: ReadonlyArray<string> | null;
  alwaysRedirect?: boolean | null;
  audience: string;
  clientID: string;
  domain: string;
  name: string;
  uniqueEvidenceKey?: string | null;
};
export type SignatoryEvidenceValidationInput = {
  boolean?: boolean | null;
  key: string;
  value?: string | null;
};
export type SignatureAppearanceInput = {
  displayName?: ReadonlyArray<SignatureAppearanceTemplateInput> | null;
  footer?: ReadonlyArray<SignatureAppearanceTemplateInput> | null;
  headerLeft?: ReadonlyArray<SignatureAppearanceTemplateInput> | null;
  identifierFromEvidence: ReadonlyArray<string>;
};
export type SignatureAppearanceTemplateInput = {
  replacements?: ReadonlyArray<SignatureAppearanceTemplateReplacementInput> | null;
  template: string;
};
export type SignatureAppearanceTemplateReplacementInput = {
  fromEvidence: ReadonlyArray<string>;
  placeholder: string;
};
export type SignatoryUIInput = {
  disableRejection?: boolean | null;
  language?: Language | null;
  logo?: SignatureOrderUILogoInput | null;
  renderPdfAnnotationLayer?: boolean | null;
  signatoryRedirectUri?: string | null;
  stylesheet?: string | null;
};
export type SignatureOrderUILogoInput = {
  href?: string | null;
  src: string;
};
export type SignatoryModalChangeMutation$variables = {
  input: ChangeSignatoryInput;
};
export type SignatoryModalChangeMutation$data = {
  readonly changeSignatory: {
    readonly signatory: {
      readonly " $fragmentSpreads": FragmentRefs<"SignatoryModal_signatory">;
    };
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
        readonly status: SignatoryStatus;
        readonly statusReason: string | null;
        readonly " $fragmentSpreads": FragmentRefs<"SignatoryModal_signatory">;
      }>;
      readonly " $fragmentSpreads": FragmentRefs<"SignatoryModal_signatureOrder">;
    };
  } | null;
};
export type SignatoryModalChangeMutation = {
  response: SignatoryModalChangeMutation$data;
  variables: SignatoryModalChangeMutation$variables;
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
  "args": null,
  "kind": "FragmentSpread",
  "name": "SignatoryModal_signatory"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "domain",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientID",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "acrValues",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "evidenceProviders",
  "plural": true,
  "selections": [
    (v11/*: any*/),
    (v3/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/)
      ],
      "type": "OidcJWTSignatureEvidenceProvider",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
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
v17 = {
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
        (v6/*: any*/)
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
v18 = [
  (v11/*: any*/),
  (v3/*: any*/),
  (v10/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignatoryModalChangeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeSignatoryOutput",
        "kind": "LinkedField",
        "name": "changeSignatory",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Signatory",
            "kind": "LinkedField",
            "name": "signatory",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
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
                "name": "SignatoryModal_signatureOrder"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Signatory",
                "kind": "LinkedField",
                "name": "signatories",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
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
                  {
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
                  },
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignatoryModalChangeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeSignatoryOutput",
        "kind": "LinkedField",
        "name": "changeSignatory",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Signatory",
            "kind": "LinkedField",
            "name": "signatory",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
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
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v17/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SignatureOrder",
            "kind": "LinkedField",
            "name": "signatureOrder",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "documents",
                "plural": true,
                "selections": (v18/*: any*/),
                "storageKey": null
              },
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Signatory",
                "kind": "LinkedField",
                "name": "signatories",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": (v18/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v17/*: any*/)
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
    "cacheID": "c657a985433948eb36ab8922b23dc2f6",
    "id": null,
    "metadata": {},
    "name": "SignatoryModalChangeMutation",
    "operationKind": "mutation",
    "text": "mutation SignatoryModalChangeMutation(\n  $input: ChangeSignatoryInput!\n) {\n  changeSignatory(input: $input) {\n    signatory {\n      ...SignatoryModal_signatory\n      id\n    }\n    signatureOrder {\n      ...SignatoryModal_signatureOrder\n      signatories {\n        id\n        status\n        statusReason\n        href\n        downloadHref\n        reference\n        role\n        documents {\n          edges {\n            status\n            node {\n              __typename\n              id\n              title\n            }\n          }\n        }\n        evidenceProviders {\n          __typename\n          id\n        }\n        ...SignatoryModal_signatory\n      }\n      id\n    }\n  }\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n\nfragment SignatoryModal_signatory on Signatory {\n  id\n  status\n  reference\n  role\n  evidenceProviders {\n    __typename\n    id\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n      loginHint\n      scope\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  documents {\n    edges {\n      status\n      node {\n        __typename\n        id\n      }\n    }\n  }\n  ui {\n    signatoryRedirectUri\n    stylesheet\n    language\n    logo {\n      src\n      href\n    }\n    disableRejection\n    renderPdfAnnotationLayer\n  }\n}\n\nfragment SignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  evidenceProviders {\n    __typename\n    id\n    ... on OidcJWTSignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n    }\n    ... on CriiptoVerifySignatureEvidenceProvider {\n      id\n      name\n      domain\n      clientID\n      acrValues\n      message\n      loginHint\n      scope\n    }\n    ... on DrawableSignatureEvidenceProvider {\n      id\n      requireName\n    }\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n"
  }
};
})();

(node as any).hash = "938197a7d2ffb8742423ae0660603868";

export default node;
