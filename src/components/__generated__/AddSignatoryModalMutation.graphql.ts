/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryStatus = "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type AddSignatoryInput = {
    signatureOrderId: string;
    reference?: string | null;
    documents?: Array<SignatoryDocumentInput> | null;
    evidenceValidation?: Array<SignatoryEvidenceValidationInput> | null;
};
export type SignatoryDocumentInput = {
    id: string;
    preapproved?: boolean | null;
};
export type SignatoryEvidenceValidationInput = {
    key: string;
    value: string;
};
export type AddSignatoryModalMutationVariables = {
    input: AddSignatoryInput;
};
export type AddSignatoryModalMutationResponse = {
    readonly addSignatory: {
        readonly signatureOrder: {
            readonly signatories: ReadonlyArray<{
                readonly id: string;
                readonly status: SignatoryStatus;
                readonly statusReason: string | null;
                readonly href: string;
                readonly reference: string | null;
            }>;
            readonly " $fragmentRefs": FragmentRefs<"AddSignatoryModal_signatureOrder">;
        };
    } | null;
};
export type AddSignatoryModalMutation = {
    readonly response: AddSignatoryModalMutationResponse;
    readonly variables: AddSignatoryModalMutationVariables;
};



/*
mutation AddSignatoryModalMutation(
  $input: AddSignatoryInput!
) {
  addSignatory(input: $input) {
    signatureOrder {
      ...AddSignatoryModal_signatureOrder
      signatories {
        id
        status
        statusReason
        href
        reference
      }
      id
    }
  }
}

fragment AddSignatoryModal_signatureOrder on SignatureOrder {
  id
  status
  documents {
    __typename
    id
  }
  ...SignatoryDocumentInput_signatureOrder
}

fragment SignatoryDocumentInput_signatureOrder on SignatureOrder {
  documents {
    __typename
    id
    title
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Signatory",
  "kind": "LinkedField",
  "name": "signatories",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "statusReason",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddSignatoryModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddSignatoryOutput",
        "kind": "LinkedField",
        "name": "addSignatory",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SignatureOrder",
            "kind": "LinkedField",
            "name": "signatureOrder",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AddSignatoryModal_signatureOrder"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddSignatoryModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddSignatoryOutput",
        "kind": "LinkedField",
        "name": "addSignatory",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SignatureOrder",
            "kind": "LinkedField",
            "name": "signatureOrder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "35051b3204b5aec2e338a5cde53e5782",
    "id": null,
    "metadata": {},
    "name": "AddSignatoryModalMutation",
    "operationKind": "mutation",
    "text": "mutation AddSignatoryModalMutation(\n  $input: AddSignatoryInput!\n) {\n  addSignatory(input: $input) {\n    signatureOrder {\n      ...AddSignatoryModal_signatureOrder\n      signatories {\n        id\n        status\n        statusReason\n        href\n        reference\n      }\n      id\n    }\n  }\n}\n\nfragment AddSignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n"
  }
};
})();
(node as any).hash = '950edddf177c374a68f2bed8f1865684';
export default node;
