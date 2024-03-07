/**
 * @generated SignedSource<<7b31634ad41c6d6b6986fcfcf01c2cfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteSignatoryButton_signatureOrder$data = {
  readonly id: string;
  readonly " $fragmentType": "DeleteSignatoryButton_signatureOrder";
};
export type DeleteSignatoryButton_signatureOrder$key = {
  readonly " $data"?: DeleteSignatoryButton_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteSignatoryButton_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteSignatoryButton_signatureOrder",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};

(node as any).hash = "ec27e5af1347ea4313bd1f1270d17f1a";

export default node;
