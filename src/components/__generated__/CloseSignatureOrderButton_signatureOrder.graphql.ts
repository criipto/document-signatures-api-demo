/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type CloseSignatureOrderButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly " $refType": "CloseSignatureOrderButton_signatureOrder";
};
export type CloseSignatureOrderButton_signatureOrder$data = CloseSignatureOrderButton_signatureOrder;
export type CloseSignatureOrderButton_signatureOrder$key = {
    readonly " $data"?: CloseSignatureOrderButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"CloseSignatureOrderButton_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CloseSignatureOrderButton_signatureOrder",
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
  "type": "SignatureOrder",
  "abstractKey": null
};
(node as any).hash = '5e149f83314771c60ad70914904c6b49';
export default node;
