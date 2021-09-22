/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryStatus = "ERROR" | "OPEN" | "SIGNED" | "%future added value";
export type SignatureOrderScreenSignatory = {
    readonly id: string;
    readonly status: SignatoryStatus;
    readonly href: string;
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
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Signatory",
  "abstractKey": null
};
(node as any).hash = 'ecf2e1fa3abe0086a4727cb1af317cea';
export default node;
