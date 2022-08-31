/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderScreenDocument = {
    readonly id: string;
    readonly title: string;
    readonly blob: string | null;
    readonly signatures: ReadonlyArray<{
        readonly __typename: string;
        readonly signatory: {
            readonly id: string;
            readonly reference: string | null;
        } | null;
    }> | null;
    readonly " $refType": "SignatureOrderScreenDocument";
};
export type SignatureOrderScreenDocument$data = SignatureOrderScreenDocument;
export type SignatureOrderScreenDocument$key = {
    readonly " $data"?: SignatureOrderScreenDocument$data;
    readonly " $fragmentRefs": FragmentRefs<"SignatureOrderScreenDocument">;
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
  "name": "SignatureOrderScreenDocument",
  "selections": [
    (v0/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "signatures",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Signatory",
          "kind": "LinkedField",
          "name": "signatory",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reference",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Document",
  "abstractKey": "__isDocument"
};
})();
(node as any).hash = 'fe7bbc15789a8b378951ddc6c00992af';
export default node;
