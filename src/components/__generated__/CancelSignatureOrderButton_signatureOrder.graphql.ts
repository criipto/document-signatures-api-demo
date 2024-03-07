/**
 * @generated SignedSource<<12b24cd97dc5b79da98b00dac59cea63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CancelSignatureOrderButton_signatureOrder$data = {
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentType": "CancelSignatureOrderButton_signatureOrder";
};
export type CancelSignatureOrderButton_signatureOrder$key = {
  readonly " $data"?: CancelSignatureOrderButton_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"CancelSignatureOrderButton_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelSignatureOrderButton_signatureOrder",
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
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};

(node as any).hash = "d8c93334afd6d801a504031314579f0f";

export default node;
