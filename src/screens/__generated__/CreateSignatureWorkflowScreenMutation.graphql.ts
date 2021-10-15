/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateSignatureWorkflowInput = {
    signatureOrderId: string;
    participants: Array<WorkflowParticipantInput>;
};
export type WorkflowParticipantInput = {
    reference: string;
};
export type CreateSignatureWorkflowScreenMutationVariables = {
    input: CreateSignatureWorkflowInput;
};
export type CreateSignatureWorkflowScreenMutationResponse = {
    readonly createSignatureWorkflow: {
        readonly signatureWorkflow: {
            readonly id: string;
        };
    } | null;
};
export type CreateSignatureWorkflowScreenMutation = {
    readonly response: CreateSignatureWorkflowScreenMutationResponse;
    readonly variables: CreateSignatureWorkflowScreenMutationVariables;
};



/*
mutation CreateSignatureWorkflowScreenMutation(
  $input: CreateSignatureWorkflowInput!
) {
  createSignatureWorkflow(input: $input) {
    signatureWorkflow {
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
    "concreteType": "CreateSignatureWorkflowOutput",
    "kind": "LinkedField",
    "name": "createSignatureWorkflow",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SignatureWorkflow",
        "kind": "LinkedField",
        "name": "signatureWorkflow",
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
    "name": "CreateSignatureWorkflowScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateSignatureWorkflowScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5a0525d31f7c99c1aacaca6248b77b17",
    "id": null,
    "metadata": {},
    "name": "CreateSignatureWorkflowScreenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSignatureWorkflowScreenMutation(\n  $input: CreateSignatureWorkflowInput!\n) {\n  createSignatureWorkflow(input: $input) {\n    signatureWorkflow {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c04a9bf7eb40a4c55247698bce66f5f0';
export default node;
