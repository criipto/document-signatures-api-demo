/**
 * @generated SignedSource<<6e46cce87b1bd256d31fc89252b45b4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Language = "DA_DK" | "EN_US" | "NB_NO" | "SV_SE" | "%future added value";
export type CreateBatchSignatoryInput = {
  items: ReadonlyArray<BatchSignatoryItemInput>;
  ui?: SignatoryUIInput | null;
};
export type BatchSignatoryItemInput = {
  signatoryId: string;
  signatureOrderId: string;
};
export type SignatoryUIInput = {
  disableRejection?: boolean | null;
  language?: Language | null;
  logo?: SignatureOrderUILogoInput | null;
  renderPdfAnnotationLayer?: boolean | null;
  signatoryRedirectUri?: string | null;
  stylesheet?: string | null;
};
export type SignatureOrderUILogoInput = {
  href?: string | null;
  src: string;
};
export type CreateBatchSignatoryScreenMutation$variables = {
  input: CreateBatchSignatoryInput;
};
export type CreateBatchSignatoryScreenMutation$data = {
  readonly createBatchSignatory: {
    readonly batchSignatory: {
      readonly id: string;
    };
  } | null;
};
export type CreateBatchSignatoryScreenMutation = {
  response: CreateBatchSignatoryScreenMutation$data;
  variables: CreateBatchSignatoryScreenMutation$variables;
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
    "concreteType": "CreateBatchSignatoryOutput",
    "kind": "LinkedField",
    "name": "createBatchSignatory",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "BatchSignatory",
        "kind": "LinkedField",
        "name": "batchSignatory",
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
    "name": "CreateBatchSignatoryScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateBatchSignatoryScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "55ef519921bd3fe93378caa51fb9e4a5",
    "id": null,
    "metadata": {},
    "name": "CreateBatchSignatoryScreenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateBatchSignatoryScreenMutation(\n  $input: CreateBatchSignatoryInput!\n) {\n  createBatchSignatory(input: $input) {\n    batchSignatory {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c8c72bb8f2dcabd7ef7346340791eabb";

export default node;
