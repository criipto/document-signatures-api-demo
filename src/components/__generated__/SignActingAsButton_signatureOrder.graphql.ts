/**
 * @generated SignedSource<<501760fda8f1e9d4fd01d3b94488d9b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SignActingAsButton_signatureOrder$data = {
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentSpreads": FragmentRefs<"SignActingAsModal_signatureOrder">;
  readonly " $fragmentType": "SignActingAsButton_signatureOrder";
};
export type SignActingAsButton_signatureOrder$key = {
  readonly " $data"?: SignActingAsButton_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignActingAsButton_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignActingAsButton_signatureOrder",
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
      "name": "SignActingAsModal_signatureOrder"
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};

(node as any).hash = "805f439faaedff62f127917908f4b366";

export default node;
