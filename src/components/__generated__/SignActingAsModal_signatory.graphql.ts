/**
 * @generated SignedSource<<6b47bf9eb8acad3ebc171f642aea9e0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SignActingAsModal_signatory$data = {
  readonly documents: {
    readonly edges: ReadonlyArray<{
      readonly status: SignatoryDocumentStatus | null;
    }>;
  };
  readonly id: string;
  readonly status: SignatoryStatus;
  readonly " $fragmentType": "SignActingAsModal_signatory";
};
export type SignActingAsModal_signatory$key = {
  readonly " $data"?: SignActingAsModal_signatory$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignActingAsModal_signatory">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignActingAsModal_signatory",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "SignatoryDocumentConnection",
      "kind": "LinkedField",
      "name": "documents",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SignatoryDocumentEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Signatory",
  "abstractKey": null
};
})();

(node as any).hash = "6a01ff8cabde0c5b8ce61b22d573ad1d";

export default node;
