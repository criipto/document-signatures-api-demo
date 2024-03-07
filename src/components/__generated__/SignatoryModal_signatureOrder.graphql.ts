/**
 * @generated SignedSource<<2b1f28431a1e95b499f02de5bf53e273>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SignatoryModal_signatureOrder$data = {
  readonly documents: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly evidenceProviders: ReadonlyArray<{
    readonly __typename: string;
    readonly acrValues?: ReadonlyArray<string>;
    readonly clientID?: string;
    readonly domain?: string;
    readonly id: string;
    readonly message?: string | null;
    readonly name?: string;
    readonly requireName?: boolean;
  }>;
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentSpreads": FragmentRefs<"SignatoryDocumentInput_signatureOrder">;
  readonly " $fragmentType": "SignatoryModal_signatureOrder";
};
export type SignatoryModal_signatureOrder$key = {
  readonly " $data"?: SignatoryModal_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignatoryModal_signatureOrder">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "domain",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "acrValues",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignatoryModal_signatureOrder",
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
      "name": "documents",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
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
        (v0/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/)
          ],
          "type": "OidcJWTSignatureEvidenceProvider",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "message",
              "storageKey": null
            }
          ],
          "type": "CriiptoVerifySignatureEvidenceProvider",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SignatoryDocumentInput_signatureOrder"
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};
})();

(node as any).hash = "0d178f57b242cb27b57f1a7447927649";

export default node;
