/**
 * @generated SignedSource<<412c9728d670d8b922a8f67c59bd7d47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SignatureOrdersScreenSignatureOrder$data = {
  readonly id: string;
  readonly status: SignatureOrderStatus;
  readonly title: string | null;
  readonly " $fragmentType": "SignatureOrdersScreenSignatureOrder";
};
export type SignatureOrdersScreenSignatureOrder$key = {
  readonly " $data"?: SignatureOrdersScreenSignatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignatureOrdersScreenSignatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignatureOrdersScreenSignatureOrder",
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
      "name": "title",
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

(node as any).hash = "ed894dc28b05390dc671fc6bb72e2385";

export default node;
