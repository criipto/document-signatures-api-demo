/**
 * @generated SignedSource<<d1c9bda3f7e5ab00eb408aa582be78a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type ExtendSignatureOrderInput = {
  additionalExpirationInDays: number;
  signatureOrderId: string;
};
export type ExtendSignatureOrderButtonMutation$variables = {
  input: ExtendSignatureOrderInput;
};
export type ExtendSignatureOrderButtonMutation$data = {
  readonly extendSignatureOrder: {
    readonly signatureOrder: {
      readonly expiresAt: any;
      readonly status: SignatureOrderStatus;
    };
  } | null;
};
export type ExtendSignatureOrderButtonMutation = {
  response: ExtendSignatureOrderButtonMutation$data;
  variables: ExtendSignatureOrderButtonMutation$variables;
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
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expiresAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExtendSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ExtendSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "extendSignatureOrder",
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
              (v3/*: any*/)
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
    "name": "ExtendSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ExtendSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "extendSignatureOrder",
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
    ]
  },
  "params": {
    "cacheID": "9f98caf17ec00050bec53d1580d8e8e5",
    "id": null,
    "metadata": {},
    "name": "ExtendSignatureOrderButtonMutation",
    "operationKind": "mutation",
    "text": "mutation ExtendSignatureOrderButtonMutation(\n  $input: ExtendSignatureOrderInput!\n) {\n  extendSignatureOrder(input: $input) {\n    signatureOrder {\n      status\n      expiresAt\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "28010655775eaf5ca090c969f6e4dcab";

export default node;
