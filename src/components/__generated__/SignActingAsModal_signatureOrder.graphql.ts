/**
 * @generated SignedSource<<159ac7669772719d51279b08c1ce1383>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SignActingAsModal_signatureOrder$data = {
  readonly evidenceProviders: ReadonlyArray<{
    readonly __typename: "CriiptoVerifySignatureEvidenceProvider";
    readonly id: string;
  } | {
    readonly __typename: "DrawableSignatureEvidenceProvider";
    readonly id: string;
    readonly requireName: boolean;
  } | {
    readonly __typename: "OidcJWTSignatureEvidenceProvider";
    readonly id: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentType": "SignActingAsModal_signatureOrder";
};
export type SignActingAsModal_signatureOrder$key = {
  readonly " $data"?: SignActingAsModal_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignActingAsModal_signatureOrder">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignActingAsModal_signatureOrder",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "evidenceProviders",
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
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "requireName",
              "storageKey": null
            }
          ],
          "type": "DrawableSignatureEvidenceProvider",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "OidcJWTSignatureEvidenceProvider",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "CriiptoVerifySignatureEvidenceProvider",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};
})();

(node as any).hash = "959671c261a2cb24eae0d5c43dbc105b";

export default node;
