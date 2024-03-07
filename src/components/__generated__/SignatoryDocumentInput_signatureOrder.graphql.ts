/**
 * @generated SignedSource<<6edf049c3ffcab54fac59981d76b01b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignatoryDocumentInput_signatureOrder$data = {
  readonly documents: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  }>;
  readonly " $fragmentType": "SignatoryDocumentInput_signatureOrder";
};
export type SignatoryDocumentInput_signatureOrder$key = {
  readonly " $data"?: SignatoryDocumentInput_signatureOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignatoryDocumentInput_signatureOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignatoryDocumentInput_signatureOrder",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "documents",
      "plural": true,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SignatureOrder",
  "abstractKey": null
};

(node as any).hash = "b08870306f6b936fd4154cd3dcbee8ee";

export default node;
