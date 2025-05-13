/**
 * @generated SignedSource<<df6b02c3bc7ae2d75fbd1f05387c4760>>
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
  readonly originalBlob: string | null;
  readonly signatures: ReadonlyArray<{
    readonly __typename: string;
    readonly image?: string;
    readonly jwks?: string;
    readonly jwt?: string;
    readonly name?: string | null;
    readonly signatory: {
      readonly id: string;
      readonly reference: string | null;
      readonly role: string | null;
    } | null;
    readonly signatures?: ReadonlyArray<{
      readonly __typename: "DrawableSignature";
      readonly image: string;
      readonly name: string | null;
    } | {
      readonly __typename: "JWTSignature";
      readonly jwks: string;
      readonly jwt: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }>;
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
},
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jwt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jwks",
      "storageKey": null
    }
  ],
  "type": "JWTSignature",
  "abstractKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    }
  ],
  "type": "DrawableSignature",
  "abstractKey": null
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
      "kind": "ScalarField",
      "name": "originalBlob",
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
        },
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "signatures",
              "plural": true,
              "selections": [
                (v0/*: any*/),
                (v2/*: any*/),
                (v3/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "type": "CompositeSignature",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Document",
  "abstractKey": "__isDocument"
};
})();

(node as any).hash = "a9d57025d7520a1e993674bb59646d55";

export default node;
