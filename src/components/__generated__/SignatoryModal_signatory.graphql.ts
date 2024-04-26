/**
 * @generated SignedSource<<1888287ab58a1ca3190ab106a22042dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SignatoryModal_signatory$data = {
  readonly documents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
      };
      readonly status: SignatoryDocumentStatus | null;
    }>;
  };
  readonly evidenceProviders: ReadonlyArray<{
    readonly __typename: string;
    readonly acrValues?: ReadonlyArray<string>;
    readonly clientID?: string;
    readonly domain?: string;
    readonly id: string;
    readonly loginHint?: string | null;
    readonly message?: string | null;
    readonly name?: string;
    readonly requireName?: boolean;
    readonly scope?: string | null;
  }>;
  readonly id: string;
  readonly reference: string | null;
  readonly role: string | null;
  readonly status: SignatoryStatus;
  readonly " $fragmentType": "SignatoryModal_signatory";
};
export type SignatoryModal_signatory$key = {
  readonly " $data"?: SignatoryModal_signatory$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignatoryModal_signatory">;
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
  "name": "status",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "domain",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientID",
  "storageKey": null
},
v5 = {
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
  "name": "SignatoryModal_signatory",
  "selections": [
    (v0/*: any*/),
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
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/),
            (v5/*: any*/)
          ],
          "type": "OidcJWTSignatureEvidenceProvider",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/),
            (v5/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "message",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "loginHint",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "scope",
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
      "alias": null,
      "args": null,
      "concreteType": "SignatoryDocumentConnection",
      "kind": "LinkedField",
      "name": "documents",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SignatoryDocumentEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Signatory",
  "abstractKey": null
};
})();

(node as any).hash = "212fbad6d1b48eba7e289282296ca959";

export default node;
