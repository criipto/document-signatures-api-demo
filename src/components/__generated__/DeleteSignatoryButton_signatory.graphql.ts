/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type DeleteSignatoryButton_signatory = {
    readonly id: string;
    readonly status: SignatoryStatus;
    readonly " $refType": "DeleteSignatoryButton_signatory";
};
export type DeleteSignatoryButton_signatory$data = DeleteSignatoryButton_signatory;
export type DeleteSignatoryButton_signatory$key = {
    readonly " $data"?: DeleteSignatoryButton_signatory$data;
    readonly " $fragmentRefs": FragmentRefs<"DeleteSignatoryButton_signatory">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteSignatoryButton_signatory",
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
  "type": "Signatory",
  "abstractKey": null
};
(node as any).hash = 'c60a1c5a8520e6f75011e319b50977d5';
export default node;
