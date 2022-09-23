/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type SignActingAsButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly " $fragmentRefs": FragmentRefs<"SignActingAsModal_signatureOrder">;
    readonly " $refType": "SignActingAsButton_signatureOrder";
};
export type SignActingAsButton_signatureOrder$data = SignActingAsButton_signatureOrder;
export type SignActingAsButton_signatureOrder$key = {
    readonly " $data"?: SignActingAsButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"SignActingAsButton_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignActingAsButton_signatureOrder",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SignActingAsModal_signatureOrder"
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};
(node as any).hash = '805f439faaedff62f127917908f4b366';
export default node;
