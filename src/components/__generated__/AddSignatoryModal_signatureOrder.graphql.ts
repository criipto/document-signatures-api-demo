/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type AddSignatoryModal_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly documents: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"SignatoryDocumentInput_signatureOrder">;
    readonly " $refType": "AddSignatoryModal_signatureOrder";
};
export type AddSignatoryModal_signatureOrder$data = AddSignatoryModal_signatureOrder;
export type AddSignatoryModal_signatureOrder$key = {
    readonly " $data"?: AddSignatoryModal_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"AddSignatoryModal_signatureOrder">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddSignatoryModal_signatureOrder",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "documents",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SignatoryDocumentInput_signatureOrder"
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};
})();
(node as any).hash = '1a3bc774c5271ebe663cfc7c75b9679b';
export default node;
