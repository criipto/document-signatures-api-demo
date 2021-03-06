/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type AddSignatoryButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly " $fragmentRefs": FragmentRefs<"SignatoryModal_signatureOrder">;
    readonly " $refType": "AddSignatoryButton_signatureOrder";
};
export type AddSignatoryButton_signatureOrder$data = AddSignatoryButton_signatureOrder;
export type AddSignatoryButton_signatureOrder$key = {
    readonly " $data"?: AddSignatoryButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"AddSignatoryButton_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddSignatoryButton_signatureOrder",
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
(node as any).hash = '25328d7872422b644074a351698101cb';
export default node;
