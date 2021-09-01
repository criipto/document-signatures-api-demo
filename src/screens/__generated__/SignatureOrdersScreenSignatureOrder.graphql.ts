/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type SignatureOrdersScreenSignatureOrder = {
    readonly id: string;
    readonly title: string | null;
    readonly status: SignatureOrderStatus;
    readonly " $refType": "SignatureOrdersScreenSignatureOrder";
};
export type SignatureOrdersScreenSignatureOrder$data = SignatureOrdersScreenSignatureOrder;
export type SignatureOrdersScreenSignatureOrder$key = {
    readonly " $data"?: SignatureOrdersScreenSignatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"SignatureOrdersScreenSignatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignatureOrdersScreenSignatureOrder",
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
      "name": "title",
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
(node as any).hash = 'ed894dc28b05390dc671fc6bb72e2385';
export default node;
