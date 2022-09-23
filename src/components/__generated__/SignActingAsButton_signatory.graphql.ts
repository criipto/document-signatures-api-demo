/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryDocumentStatus = "APPROVED" | "OPENED" | "PREAPPROVED" | "REJECTED" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignActingAsButton_signatory = {
    readonly id: string;
    readonly status: SignatoryStatus;
    readonly documents: {
        readonly edges: ReadonlyArray<{
            readonly status: SignatoryDocumentStatus | null;
        }>;
    };
    readonly " $fragmentRefs": FragmentRefs<"SignActingAsModal_signatory">;
    readonly " $refType": "SignActingAsButton_signatory";
};
export type SignActingAsButton_signatory$data = SignActingAsButton_signatory;
export type SignActingAsButton_signatory$key = {
    readonly " $data"?: SignActingAsButton_signatory$data;
    readonly " $fragmentRefs": FragmentRefs<"SignActingAsButton_signatory">;
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
(node as any).hash = '5ae36315ab25b0872546e811b3fdc8bf';
export default node;
