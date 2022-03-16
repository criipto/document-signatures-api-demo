/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
export type AddSignatoryModal_signatureOrder = {
    readonly id: string;
    readonly status: SignatureOrderStatus;
    readonly documents: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly evidenceProviders: ReadonlyArray<{
        readonly __typename: "OidcJWTSignatureEvidenceProvider";
        readonly id: string;
        readonly name: string;
        readonly domain: string;
        readonly clientID: string;
        readonly acrValues: ReadonlyArray<string>;
    } | {
        readonly __typename: "DrawableSignatureEvidenceProvider";
        readonly id: string;
        readonly requireName: boolean;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }>;
    readonly " $fragmentRefs": FragmentRefs<"SignatoryDocumentInput_signatureOrder">;
    readonly " $refType": "AddSignatoryModal_signatureOrder";
};
export type AddSignatoryModal_signatureOrder$data = AddSignatoryModal_signatureOrder;
export type AddSignatoryModal_signatureOrder$key = {
    readonly " $data"?: AddSignatoryModal_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"AddSignatoryModal_signatureOrder">;
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
  "name": "AddSignatoryModal_signatureOrder",
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
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
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
              "name": "domain",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "clientID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "acrValues",
              "storageKey": null
            }
          ],
          "type": "OidcJWTSignatureEvidenceProvider",
          "abstractKey": null
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
(node as any).hash = 'a2358b88520b135b69b82472c8ea5b45';
export default node;
