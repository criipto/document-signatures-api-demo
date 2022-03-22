/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type ChangeSignatoryButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly " $fragmentRefs": FragmentRefs<"SignatoryModal_signatureOrder">;
    readonly " $refType": "ChangeSignatoryButton_signatureOrder";
};
export type ChangeSignatoryButton_signatureOrder$data = ChangeSignatoryButton_signatureOrder;
export type ChangeSignatoryButton_signatureOrder$key = {
    readonly " $data"?: ChangeSignatoryButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"ChangeSignatoryButton_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSignatoryButton_signatureOrder",
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
      "name": "SignatoryModal_signatureOrder"
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};
(node as any).hash = '93276a4030d8bafaeffef1679c0945ef';
export default node;
