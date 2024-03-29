/**
 * @generated SignedSource<<bca2b7147b444d2719c8dbb0d753b4ec>>
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
    "cacheID": "52a4523395fd843f9c7391fbb90b57c8",
    "id": null,
    "metadata": {},
    "name": "ValidateDocumentScreenMutation",
    "operationKind": "mutation",
    "text": "mutation ValidateDocumentScreenMutation(\n  $input: ValidateDocumentInput!\n) {\n  validateDocument(input: $input) {\n    valid\n    errors\n    fixable\n  }\n}\n"
  }
};
})();

(node as any).hash = "3bca2d3e29cb29bfb6109f0dd2032393";

export default node;
