/**
 * @generated SignedSource<<4e7030941a1947dc839de70aae432df4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AddSignatoryButton_signatureOrder$data = {
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentSpreads": FragmentRefs<"SignatoryModal_signatureOrder">;
  readonly " $fragmentType": "AddSignatoryButton_signatureOrder";
};
export type AddSignatoryButton_signatureOrder$key = {
  readonly " $data"?: AddSignatoryButton_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddSignatoryButton_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddSignatoryButton_signatureOrder",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SignatoryModal_signatureOrder"
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};

(node as any).hash = "25328d7872422b644074a351698101cb";

export default node;
