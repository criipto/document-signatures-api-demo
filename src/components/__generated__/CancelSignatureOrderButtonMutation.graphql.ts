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
            readonly id: string;
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
      id
      status
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CancelSignatureOrderButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CancelSignatureOrderButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "18d0c6a68aa25083cc46055c563c5690",
    "id": null,
    "metadata": {},
    "name": "CancelSignatureOrderButtonMutation",
    "operationKind": "mutation",
    "text": "mutation CancelSignatureOrderButtonMutation(\n  $input: CancelSignatureOrderInput!\n) {\n  cancelSignatureOrder(input: $input) {\n    signatureOrder {\n      id\n      status\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0824e673e82dc5045b20324da62e93e0';
export default node;
