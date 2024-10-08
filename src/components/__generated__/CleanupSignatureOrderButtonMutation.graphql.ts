/**
 * @generated SignedSource<<9a9e4977a2bdf64cbc57f093d8339baa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type CleanupSignatureOrderInput = {
  signatureOrderId: string;
};
export type CleanupSignatureOrderButtonMutation$variables = {
  input: CleanupSignatureOrderInput;
};
export type CleanupSignatureOrderButtonMutation$data = {
  readonly cleanupSignatureOrder: {
    readonly signatureOrder: {
      readonly status: SignatureOrderStatus;
    };
  } | null;
};
export type CleanupSignatureOrderButtonMutation = {
  response: CleanupSignatureOrderButtonMutation$data;
  variables: CleanupSignatureOrderButtonMutation$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CleanupSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CleanupSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "cleanupSignatureOrder",
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
              (v2/*: any*/)
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
    "name": "CleanupSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CleanupSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "cleanupSignatureOrder",
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
    "cacheID": "2fd748956176ab80de8a186a08586e3d",
    "id": null,
    "metadata": {},
    "name": "CleanupSignatureOrderButtonMutation",
    "operationKind": "mutation",
    "text": "mutation CleanupSignatureOrderButtonMutation(\n  $input: CleanupSignatureOrderInput!\n) {\n  cleanupSignatureOrder(input: $input) {\n    signatureOrder {\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4936290dd7492f63221b44737e31715a";

export default node;
