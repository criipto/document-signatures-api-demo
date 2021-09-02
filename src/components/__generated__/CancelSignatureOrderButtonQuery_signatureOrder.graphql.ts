/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type CancelSignatureOrderButtonQuery_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly " $refType": "CancelSignatureOrderButtonQuery_signatureOrder";
};
export type CancelSignatureOrderButtonQuery_signatureOrder$data = CancelSignatureOrderButtonQuery_signatureOrder;
export type CancelSignatureOrderButtonQuery_signatureOrder$key = {
    readonly " $data"?: CancelSignatureOrderButtonQuery_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"CancelSignatureOrderButtonQuery_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelSignatureOrderButtonQuery_signatureOrder",
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
(node as any).hash = 'b09b56ee4e85bfee4574d7fd9aaec494';
export default node;
