/**
 * @generated SignedSource<<a9166429f6b8137a830916c0e6bffc3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignatureOrderScreenDocument$data = {
  readonly __typename: string;
  readonly blob: string | null;
  readonly id: string;
  readonly signatures: ReadonlyArray<{
    readonly __typename: string;
    readonly signatory: {
      readonly id: string;
      readonly reference: string | null;
      readonly role: string | null;
    } | null;
  }> | null;
  readonly title: string;
  readonly " $fragmentType": "SignatureOrderScreenDocument";
};
export type SignatureOrderScreenDocument$key = {
  readonly " $data"?: SignatureOrderScreenDocument$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignatureOrderScreenDocument">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
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
    (v1/*: any*/),
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Signatory",
          "kind": "LinkedField",
          "name": "signatory",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reference",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "role",
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

(node as any).hash = "c57d157cb8767655d642cae4044aef5d";

export default node;
