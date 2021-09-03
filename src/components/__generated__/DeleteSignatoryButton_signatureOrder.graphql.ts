/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type DeleteSignatoryButton_signatureOrder = {
    readonly id: string;
    readonly " $refType": "DeleteSignatoryButton_signatureOrder";
};
export type DeleteSignatoryButton_signatureOrder$data = DeleteSignatoryButton_signatureOrder;
export type DeleteSignatoryButton_signatureOrder$key = {
    readonly " $data"?: DeleteSignatoryButton_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"DeleteSignatoryButton_signatureOrder">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteSignatoryButton_signatureOrder",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};
(node as any).hash = 'ec27e5af1347ea4313bd1f1270d17f1a';
export default node;
