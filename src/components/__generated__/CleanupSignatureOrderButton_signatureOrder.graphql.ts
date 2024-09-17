/**
 * @generated SignedSource<<bf0142c394028c889b6f9fa89b682336>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CleanupSignatureOrderButton_signatureOrder$data = {
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentType": "CleanupSignatureOrderButton_signatureOrder";
};
export type CleanupSignatureOrderButton_signatureOrder$key = {
  readonly " $data"?: CleanupSignatureOrderButton_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"CleanupSignatureOrderButton_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CleanupSignatureOrderButton_signatureOrder",
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

(node as any).hash = "727b1a99ff5b3811a094885d3a8e2c75";

export default node;
