/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DocumentStorageMode = "Temporary" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type CreateSignatureOrderInput = {
    title?: string | null;
    disableVerifyEvidenceProvider?: boolean | null;
    documents: Array<DocumentInput>;
    evidenceProviders?: Array<EvidenceProviderInput> | null;
};
export type DocumentInput = {
    pdf: PadesDocumentInput;
};
export type PadesDocumentInput = {
    title: string;
    blob: string;
    storageMode: DocumentStorageMode;
};
export type EvidenceProviderInput = {
    oidc: OidcEvidenceProviderInput;
};
export type OidcEvidenceProviderInput = {
    name: string;
    domain: string;
    clientID: string;
    audience: string;
};
export type CreateSignatureOrderScreenMutationVariables = {
    input: CreateSignatureOrderInput;
};
export type CreateSignatureOrderScreenMutationResponse = {
    readonly createSignatureOrder: {
        readonly signatureOrder: {
            readonly id: string;
        };
        readonly application: {
            readonly signatureOrders: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly id: string;
                        readonly status: SignatureOrderStatus;
                    };
                }>;
            };
        };
    } | null;
};
export type CreateSignatureOrderScreenMutation = {
    readonly response: CreateSignatureOrderScreenMutationResponse;
    readonly variables: CreateSignatureOrderScreenMutationVariables;
};



/*
mutation CreateSignatureOrderScreenMutation(
  $input: CreateSignatureOrderInput!
) {
  createSignatureOrder(input: $input) {
    signatureOrder {
      id
    }
    application {
      signatureOrders(status: OPEN) {
        edges {
          node {
            id
            status
          }
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
    "cacheID": "de491606c62f5f2ebf2547c44ec7cda4",
    "id": null,
    "metadata": {},
    "name": "CreateSignatureOrderScreenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSignatureOrderScreenMutation(\n  $input: CreateSignatureOrderInput!\n) {\n  createSignatureOrder(input: $input) {\n    signatureOrder {\n      id\n    }\n    application {\n      signatureOrders(status: OPEN) {\n        edges {\n          node {\n            id\n            status\n          }\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '653606ac4c787446f41daa1ec3500880';
export default node;
