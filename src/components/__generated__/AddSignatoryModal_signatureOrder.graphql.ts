/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type AddSignatoryModal_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly openSignatory: {
        readonly id: string;
    } | null;
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
},
v1 = [
  (v0/*: any*/)
];
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
      "concreteType": "Signatory",
      "kind": "LinkedField",
      "name": "openSignatory",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "documents",
      "plural": true,
      "selections": (v1/*: any*/),
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
(node as any).hash = '6015cfa43694da9b7a0fb1d293c66dfd';
export default node;
