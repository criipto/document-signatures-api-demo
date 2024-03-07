/**
 * @generated SignedSource<<beba5add1a95884a5252937cbef40ffc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DeleteSignatoryButton_signatory$data = {
  readonly id: string;
  readonly status: SignatoryStatus;
  readonly " $fragmentType": "DeleteSignatoryButton_signatory";
};
export type DeleteSignatoryButton_signatory$key = {
  readonly " $data"?: DeleteSignatoryButton_signatory$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteSignatoryButton_signatory">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteSignatoryButton_signatory",
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
  "type": "Signatory",
  "abstractKey": null
};

(node as any).hash = "c60a1c5a8520e6f75011e319b50977d5";

export default node;
