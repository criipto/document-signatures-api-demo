/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type CloseSignatureOrderButton_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly openSignatory: {
        readonly id: string;
    } | null;
    readonly " $refType": "CloseSignatureOrderButton_signatureOrder";
};
export type CloseSignatureOrderButton_signatureOrder$data = CloseSignatureOrderButton_signatureOrder;
export type CloseSignatureOrderButton_signatureOrder$key = {
    readonly " $data"?: CloseSignatureOrderButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"CloseSignatureOrderButton_signatureOrder">;
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
  "name": "CloseSignatureOrderButton_signatureOrder",
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
(node as any).hash = '5a61addfc68f3e33c04cdb11adca1368';
export default node;
