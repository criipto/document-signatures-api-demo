/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ValidateDocumentInput = {
    pdf?: string | null;
    xml?: string | null;
};
export type ValidateDocumentScreenMutationVariables = {
    input: ValidateDocumentInput;
};
export type ValidateDocumentScreenMutationResponse = {
    readonly validateDocument: {
        readonly errors: ReadonlyArray<string>;
        readonly fixable: boolean;
    } | null;
};
export type ValidateDocumentScreenMutation = {
    readonly response: ValidateDocumentScreenMutationResponse;
    readonly variables: ValidateDocumentScreenMutationVariables;
};



/*
mutation ValidateDocumentScreenMutation(
  $input: ValidateDocumentInput!
) {
  validateDocument(input: $input) {
    errors
    fixable
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
    "concreteType": "ValidateDocumentOutput",
    "kind": "LinkedField",
    "name": "validateDocument",
    "plural": false,
    "selections": [
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
    "cacheID": "8d070d8684a0f1de5e569fdca6c8258d",
    "id": null,
    "metadata": {},
    "name": "ValidateDocumentScreenMutation",
    "operationKind": "mutation",
    "text": "mutation ValidateDocumentScreenMutation(\n  $input: ValidateDocumentInput!\n) {\n  validateDocument(input: $input) {\n    errors\n    fixable\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ba72dceebce1edd2f77b97d8360b5b3e';
export default node;
