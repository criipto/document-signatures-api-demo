/**
 * @generated SignedSource<<8d53977fbb1cc2fcfddbefd8bd32aca9>>
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
export type SignActingAsButton_signatory$data = {
  readonly documents: {
    readonly edges: ReadonlyArray<{
      readonly status: SignatoryDocumentStatus | null;
    }>;
  };
  readonly id: string;
  readonly status: SignatoryStatus;
  readonly " $fragmentSpreads": FragmentRefs<"SignActingAsModal_signatory">;
  readonly " $fragmentType": "SignActingAsButton_signatory";
};
export type SignActingAsButton_signatory$key = {
  readonly " $data"?: SignActingAsButton_signatory$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignActingAsButton_signatory">;
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
  "name": "SignActingAsButton_signatory",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SignActingAsModal_signatory"
    }
  ],
  "type": "Signatory",
  "abstractKey": null
};
})();

(node as any).hash = "5ae36315ab25b0872546e811b3fdc8bf";

export default node;
