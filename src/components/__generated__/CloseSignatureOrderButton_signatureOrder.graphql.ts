/**
 * @generated SignedSource<<c44da71fd4a487ba2242fc53f9e8048a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CloseSignatureOrderButton_signatureOrder$data = {
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentType": "CloseSignatureOrderButton_signatureOrder";
};
export type CloseSignatureOrderButton_signatureOrder$key = {
  readonly " $data"?: CloseSignatureOrderButton_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"CloseSignatureOrderButton_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CloseSignatureOrderButton_signatureOrder",
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

(node as any).hash = "5e149f83314771c60ad70914904c6b49";

export default node;
