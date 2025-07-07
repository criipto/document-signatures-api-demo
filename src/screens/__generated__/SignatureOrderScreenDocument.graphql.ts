/**
 * @generated SignedSource<<5f56bc29a1069e9d8dd41ed21677a280>>
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
    readonly claims?: ReadonlyArray<{
      readonly name: string;
      readonly value: string;
    }>;
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
      readonly claims: ReadonlyArray<{
        readonly name: string;
        readonly value: string;
      }>;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "JWTClaim",
      "kind": "LinkedField",
      "name": "claims",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
v4 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
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
        (v3/*: any*/),
        (v4/*: any*/),
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
                (v3/*: any*/),
                (v4/*: any*/)
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

(node as any).hash = "fb6fd8eeb016ea1b09ea232841c1a254";

export default node;
