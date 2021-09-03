/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SignatoryStatus = "ERROR" | "OPEN" | "SIGNED" | "%future added value";
export type AddSignatoryInput = {
    signatureOrderId: string;
};
export type AddSignatoryButtonMutationVariables = {
    input: AddSignatoryInput;
};
export type AddSignatoryButtonMutationResponse = {
    readonly addSignatory: {
        readonly signatureOrder: {
            readonly signatories: ReadonlyArray<{
                readonly id: string;
                readonly status: SignatoryStatus;
                readonly token: string;
            }>;
        };
    } | null;
};
export type AddSignatoryButtonMutation = {
    readonly response: AddSignatoryButtonMutationResponse;
    readonly variables: AddSignatoryButtonMutationVariables;
};



/*
mutation AddSignatoryButtonMutation(
  $input: AddSignatoryInput!
) {
  addSignatory(input: $input) {
    signatureOrder {
      signatories {
        id
        status
        token
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
  "concreteType": "Signatory",
  "kind": "LinkedField",
  "name": "signatories",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
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
    "name": "AddSignatoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddSignatoryOutput",
        "kind": "LinkedField",
        "name": "addSignatory",
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
    "name": "AddSignatoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddSignatoryOutput",
        "kind": "LinkedField",
        "name": "addSignatory",
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
              (v3/*: any*/),
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
    "cacheID": "3b239b1a5ce2dac5e66334380f7c02c2",
    "id": null,
    "metadata": {},
    "name": "AddSignatoryButtonMutation",
    "operationKind": "mutation",
    "text": "mutation AddSignatoryButtonMutation(\n  $input: AddSignatoryInput!\n) {\n  addSignatory(input: $input) {\n    signatureOrder {\n      signatories {\n        id\n        status\n        token\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6104bf36ffa4cf9d6dc4e11ae58118da';
export default node;
