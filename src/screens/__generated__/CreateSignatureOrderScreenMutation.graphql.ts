/**
 * @generated SignedSource<<99fa23f7eb92b922017ab71e26852d88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DocumentIDLocation = "BOTTOM" | "LEFT" | "RIGHT" | "TOP" | "%future added value";
export type DocumentStorageMode = "Temporary" | "%future added value";
export type EvidenceValidationStage = "SIGN" | "VIEW" | "%future added value";
export type Language = "DA_DK" | "EN_US" | "NB_NO" | "SV_SE" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type CreateSignatureOrderInput = {
  disableVerifyEvidenceProvider?: boolean | null;
  documents: ReadonlyArray<DocumentInput>;
  evidenceProviders?: ReadonlyArray<EvidenceProviderInput> | null;
  evidenceValidationStages?: ReadonlyArray<EvidenceValidationStage> | null;
  expiresInDays?: number | null;
  fixDocumentFormattingErrors?: boolean | null;
  maxSignatories?: number | null;
  signatories?: ReadonlyArray<CreateSignatureOrderSignatoryInput> | null;
  signatureAppearance?: SignatureAppearanceInput | null;
  timezone?: string | null;
  title?: string | null;
  ui?: CreateSignatureOrderUIInput | null;
  webhook?: CreateSignatureOrderWebhookInput | null;
};
export type DocumentInput = {
  pdf?: PadesDocumentInput | null;
  removePreviousSignatures?: boolean | null;
  xml?: XadesDocumentInput | null;
};
export type PadesDocumentInput = {
  blob: string;
  displayDocumentID?: DocumentIDLocation | null;
  form?: PadesDocumentFormInput | null;
  reference?: string | null;
  storageMode: DocumentStorageMode;
  title: string;
};
export type PadesDocumentFormInput = {
  enabled: boolean;
};
export type XadesDocumentInput = {
  blob: string;
  reference?: string | null;
  storageMode: DocumentStorageMode;
  title: string;
};
export type EvidenceProviderInput = {
  allOf?: AllOfEvidenceProviderInput | null;
  criiptoVerify?: CriiptoVerifyProviderInput | null;
  drawable?: DrawableEvidenceProviderInput | null;
  enabledByDefault?: boolean | null;
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
  loginHint?: string | null;
  message?: string | null;
  scope?: string | null;
  uniqueEvidenceKey?: string | null;
};
export type DrawableEvidenceProviderInput = {
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
export type CreateSignatureOrderSignatoryInput = {
  documents?: ReadonlyArray<SignatoryDocumentInput> | null;
  evidenceProviders?: ReadonlyArray<SignatoryEvidenceProviderInput> | null;
  evidenceValidation?: ReadonlyArray<SignatoryEvidenceValidationInput> | null;
  reference?: string | null;
  role?: string | null;
  signatureAppearance?: SignatureAppearanceInput | null;
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
export type SignatoryEvidenceValidationInput = {
  boolean?: boolean | null;
  key: string;
  value?: string | null;
};
export type SignatureAppearanceInput = {
  displayName?: ReadonlyArray<SignatureAppearanceTemplateInput> | null;
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
export type CreateSignatureOrderUIInput = {
  disableRejection?: boolean | null;
  language?: Language | null;
  logo?: SignatureOrderUILogoInput | null;
  signatoryRedirectUri?: string | null;
  stylesheet?: string | null;
};
export type SignatureOrderUILogoInput = {
  href?: string | null;
  src: string;
};
export type CreateSignatureOrderWebhookInput = {
  url: string;
  validateConnectivity?: boolean | null;
};
export type CreateSignatureOrderScreenMutation$variables = {
  input: CreateSignatureOrderInput;
};
export type CreateSignatureOrderScreenMutation$data = {
  readonly createSignatureOrder: {
    readonly application: {
      readonly signatureOrders: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly id: string;
            readonly status: SignatureOrderStatus;
            readonly title: string | null;
          };
        }>;
      };
    };
    readonly signatureOrder: {
      readonly id: string;
    };
  } | null;
};
export type CreateSignatureOrderScreenMutation = {
  response: CreateSignatureOrderScreenMutation$data;
  variables: CreateSignatureOrderScreenMutation$variables;
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
  "concreteType": "SignatureOrder",
  "kind": "LinkedField",
  "name": "signatureOrder",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "status",
      "value": "OPEN"
    }
  ],
  "concreteType": "SignatureOrderConnection",
  "kind": "LinkedField",
  "name": "signatureOrders",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SignatureOrderEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SignatureOrder",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "status",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "signatureOrders(status:\"OPEN\")"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateSignatureOrderScreenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "createSignatureOrder",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Application",
            "kind": "LinkedField",
            "name": "application",
            "plural": false,
            "selections": [
              (v4/*: any*/)
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
    "name": "CreateSignatureOrderScreenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "createSignatureOrder",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Application",
            "kind": "LinkedField",
            "name": "application",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3b4d963d9bbfd83610f5fb8202058070",
    "id": null,
    "metadata": {},
    "name": "CreateSignatureOrderScreenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSignatureOrderScreenMutation(\n  $input: CreateSignatureOrderInput!\n) {\n  createSignatureOrder(input: $input) {\n    signatureOrder {\n      id\n    }\n    application {\n      signatureOrders(status: OPEN) {\n        edges {\n          node {\n            id\n            title\n            status\n          }\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "653606ac4c787446f41daa1ec3500880";

export default node;
