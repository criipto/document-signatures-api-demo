/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderScreenDocument = {
    readonly id: string;
    readonly title: string;
    readonly blob: string;
    readonly " $refType": "SignatureOrderScreenDocument";
};
export type SignatureOrderScreenDocument$data = SignatureOrderScreenDocument;
export type SignatureOrderScreenDocument$key = {
    readonly " $data"?: SignatureOrderScreenDocument$data;
    readonly " $fragmentRefs": FragmentRefs<"SignatureOrderScreenDocument">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignatureOrderScreenDocument",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blob",
      "storageKey": null
    }
  ],
  "type": "Document",
  "abstractKey": "__isDocument"
};
(node as any).hash = '5ad0b59b133aadb87ffe0affea6af2e5';
export default node;
