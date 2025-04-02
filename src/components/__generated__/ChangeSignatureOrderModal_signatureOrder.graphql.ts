/**
 * @generated SignedSource<<7de7f2b301b1ad27e214f5323b6ebfc4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "EXPIRED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ChangeSignatureOrderModal_signatureOrder$data = {
  readonly id: string;
  readonly maxSignatories: number;
  readonly status: SignatureOrderStatus;
  readonly " $fragmentType": "ChangeSignatureOrderModal_signatureOrder";
};
export type ChangeSignatureOrderModal_signatureOrder$key = {
  readonly " $data"?: ChangeSignatureOrderModal_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSignatureOrderModal_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSignatureOrderModal_signatureOrder",
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
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};

(node as any).hash = "56a8115b305ef36dbb13bf8a219d714c";

export default node;
