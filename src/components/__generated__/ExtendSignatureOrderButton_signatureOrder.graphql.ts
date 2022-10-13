/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type ExtendSignatureOrderButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly " $refType": "ExtendSignatureOrderButton_signatureOrder";
};
export type ExtendSignatureOrderButton_signatureOrder$data = ExtendSignatureOrderButton_signatureOrder;
export type ExtendSignatureOrderButton_signatureOrder$key = {
    readonly " $data"?: ExtendSignatureOrderButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"ExtendSignatureOrderButton_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExtendSignatureOrderButton_signatureOrder",
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
(node as any).hash = '7b9073516a7cc46e0937b1d9fde2f36d';
export default node;
