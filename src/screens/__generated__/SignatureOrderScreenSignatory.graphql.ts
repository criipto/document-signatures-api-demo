/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryStatus = "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatureOrderScreenSignatory = {
    readonly id: string;
    readonly status: SignatoryStatus;
    readonly statusReason: string | null;
    readonly href: string;
    readonly reference: string | null;
    readonly " $refType": "SignatureOrderScreenSignatory";
};
export type SignatureOrderScreenSignatory$data = SignatureOrderScreenSignatory;
export type SignatureOrderScreenSignatory$key = {
    readonly " $data"?: SignatureOrderScreenSignatory$data;
    readonly " $fragmentRefs": FragmentRefs<"SignatureOrderScreenSignatory">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignatureOrderScreenSignatory",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "statusReason",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "type": "Signatory",
  "abstractKey": null
};
(node as any).hash = 'ac8eec4f5b7849da508a1c7efe445c79';
export default node;
