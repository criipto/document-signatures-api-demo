/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryDocumentInput_signatureOrder = {
    readonly documents: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
    }>;
    readonly " $refType": "SignatoryDocumentInput_signatureOrder";
};
export type SignatoryDocumentInput_signatureOrder$data = SignatoryDocumentInput_signatureOrder;
export type SignatoryDocumentInput_signatureOrder$key = {
    readonly " $data"?: SignatoryDocumentInput_signatureOrder$data;
    readonly " $fragmentRefs": FragmentRefs<"SignatoryDocumentInput_signatureOrder">;
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
(node as any).hash = 'b08870306f6b936fd4154cd3dcbee8ee';
export default node;
