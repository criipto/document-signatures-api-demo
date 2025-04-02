/**
 * @generated SignedSource<<edcef2f6b9bc03869869c3715a229144>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ChangeSignatureOrderButton_signatureOrder$data = {
  readonly id: string;
  readonly maxSignatories: number;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSignatureOrderModal_signatureOrder">;
  readonly " $fragmentType": "ChangeSignatureOrderButton_signatureOrder";
};
export type ChangeSignatureOrderButton_signatureOrder$key = {
  readonly " $data"?: ChangeSignatureOrderButton_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSignatureOrderButton_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSignatureOrderButton_signatureOrder",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "maxSignatories",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeSignatureOrderModal_signatureOrder"
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};

(node as any).hash = "aab5da6a626cbd26ab2812122ab15395";

export default node;
