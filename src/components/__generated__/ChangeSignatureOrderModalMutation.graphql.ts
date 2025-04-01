/**
 * @generated SignedSource<<aa22ad59b042310404244f1b6dcdfbc8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeSignatureOrderInput = {
  maxSignatories?: number | null;
  signatureOrderId: string;
};
export type ChangeSignatureOrderModalMutation$variables = {
  input: ChangeSignatureOrderInput;
};
export type ChangeSignatureOrderModalMutation$data = {
  readonly changeSignatureOrder: {
    readonly signatureOrder: {
      readonly " $fragmentSpreads": FragmentRefs<"ChangeSignatureOrderModal_signatureOrder">;
    };
  } | null;
};
export type ChangeSignatureOrderModalMutation = {
  response: ChangeSignatureOrderModalMutation$data;
  variables: ChangeSignatureOrderModalMutation$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeSignatureOrderModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "changeSignatureOrder",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChangeSignatureOrderModal_signatureOrder"
              }
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
    "name": "ChangeSignatureOrderModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeSignatureOrderOutput",
        "kind": "LinkedField",
        "name": "changeSignatureOrder",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "maxSignatories",
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
    "cacheID": "ee221cc2a1fcdb318fd4613ebf403853",
    "id": null,
    "metadata": {},
    "name": "ChangeSignatureOrderModalMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeSignatureOrderModalMutation(\n  $input: ChangeSignatureOrderInput!\n) {\n  changeSignatureOrder(input: $input) {\n    signatureOrder {\n      ...ChangeSignatureOrderModal_signatureOrder\n      id\n    }\n  }\n}\n\nfragment ChangeSignatureOrderModal_signatureOrder on SignatureOrder {\n  id\n  status\n  maxSignatories\n}\n"
  }
};
})();

(node as any).hash = "28b91759f11dae08698cf697f7a917d3";

export default node;
