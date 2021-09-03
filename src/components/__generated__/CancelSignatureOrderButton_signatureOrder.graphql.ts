/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type CancelSignatureOrderButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly " $refType": "CancelSignatureOrderButton_signatureOrder";
};
export type CancelSignatureOrderButton_signatureOrder$data = CancelSignatureOrderButton_signatureOrder;
export type CancelSignatureOrderButton_signatureOrder$key = {
    readonly " $data"?: CancelSignatureOrderButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"CancelSignatureOrderButton_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelSignatureOrderButton_signatureOrder",
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
(node as any).hash = 'd8c93334afd6d801a504031314579f0f';
export default node;
