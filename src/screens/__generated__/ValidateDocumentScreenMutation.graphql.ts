/**
 * @generated SignedSource<<919e1e29d3fc002833e2456828556d21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ValidateDocumentInput = {
  pdf?: string | null;
  xml?: string | null;
};
export type ValidateDocumentScreenMutation$variables = {
  input: ValidateDocumentInput;
};
export type ValidateDocumentScreenMutation$data = {
  readonly validateDocument: {
    readonly errors: ReadonlyArray<string> | null;
    readonly fixable: boolean | null;
    readonly previouslySigned: boolean | null;
    readonly valid: boolean;
  } | null;
};
export type ValidateDocumentScreenMutation = {
  response: ValidateDocumentScreenMutation$data;
  variables: ValidateDocumentScreenMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ValidateDocumentOutput",
    "kind": "LinkedField",
    "name": "validateDocument",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "valid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "errors",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fixable",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "previouslySigned",
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
    "name": "ValidateDocumentScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ValidateDocumentScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bcdc3d06ff7320da44542f0834bcf37b",
    "id": null,
    "metadata": {},
    "name": "ValidateDocumentScreenMutation",
    "operationKind": "mutation",
    "text": "mutation ValidateDocumentScreenMutation(\n  $input: ValidateDocumentInput!\n) {\n  validateDocument(input: $input) {\n    valid\n    errors\n    fixable\n    previouslySigned\n  }\n}\n"
  }
};
})();

(node as any).hash = "6a586c684aa65453a5bd7253ba5d465d";

export default node;
