/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DocumentStorageMode = "Temporary" | "%future added value";
export type CreateSignatureOrderInput = {
    applicationId: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateSignatureOrderOutput",
    "kind": "LinkedField",
    "name": "createSignatureOrder",
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateSignatureOrderScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateSignatureOrderScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "33a5119de46a1f7c49b84f57b63280b3",
    "id": null,
    "metadata": {},
    "name": "CreateSignatureOrderScreenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSignatureOrderScreenMutation(\n  $input: CreateSignatureOrderInput!\n) {\n  createSignatureOrder(input: $input) {\n    signatureOrder {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e3da875326b93d740ae960978a4fca30';
export default node;
