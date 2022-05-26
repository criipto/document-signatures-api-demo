/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type ChangeSignatoryButton_signatory = {
    readonly id: string;
    readonly status: SignatoryStatus;
    readonly " $fragmentRefs": FragmentRefs<"SignatoryModal_signatory">;
    readonly " $refType": "ChangeSignatoryButton_signatory";
};
export type ChangeSignatoryButton_signatory$data = ChangeSignatoryButton_signatory;
export type ChangeSignatoryButton_signatory$key = {
    readonly " $data"?: ChangeSignatoryButton_signatory$data;
    readonly " $fragmentRefs": FragmentRefs<"ChangeSignatoryButton_signatory">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSignatoryButton_signatory",
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
      "name": "SignatoryModal_signatory"
    }
  ],
  "type": "Signatory",
  "abstractKey": null
};
(node as any).hash = '2aed0b34651d3f475d051a4eccf6c770';
export default node;
