/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type AddSignatoryButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly openSignatory: {
        readonly id: string;
    } | null;
    readonly " $refType": "AddSignatoryButton_signatureOrder";
};
export type AddSignatoryButton_signatureOrder$data = AddSignatoryButton_signatureOrder;
export type AddSignatoryButton_signatureOrder$key = {
    readonly " $data"?: AddSignatoryButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"AddSignatoryButton_signatureOrder">;
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
  "name": "AddSignatoryButton_signatureOrder",
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
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};
})();
(node as any).hash = 'f916f68288afa7e3db5edac9b8c3cac1';
export default node;
