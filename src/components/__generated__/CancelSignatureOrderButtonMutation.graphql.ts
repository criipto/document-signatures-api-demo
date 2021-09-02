/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type CancelSignatureOrderInput = {
    signatureOrderId: string;
};
export type CancelSignatureOrderButtonMutationVariables = {
    input: CancelSignatureOrderInput;
};
export type CancelSignatureOrderButtonMutationResponse = {
    readonly cancelSignatureOrder: {
        readonly signatureOrder: {
            readonly status: SignatureOrderStatus;
        };
    } | null;
};
export type CancelSignatureOrderButtonMutation = {
    readonly response: CancelSignatureOrderButtonMutationResponse;
    readonly variables: CancelSignatureOrderButtonMutationVariables;
};



/*
mutation CancelSignatureOrderButtonMutation(
  $input: CancelSignatureOrderInput!
) {
  cancelSignatureOrder(input: $input) {
    signatureOrder {
      status
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
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CancelSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CancelSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "cancelSignatureOrder",
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
    "name": "CancelSignatureOrderButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CancelSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "cancelSignatureOrder",
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
    "cacheID": "17809f12209ecf1bb4c443c874d0c1bb",
    "id": null,
    "metadata": {},
    "name": "CancelSignatureOrderButtonMutation",
    "operationKind": "mutation",
    "text": "mutation CancelSignatureOrderButtonMutation(\n  $input: CancelSignatureOrderInput!\n) {\n  cancelSignatureOrder(input: $input) {\n    signatureOrder {\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7d1313da23d305f7cb7c493228d5d91b';
export default node;
