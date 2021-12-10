/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SignatoryStatus = "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type DeleteSignatoryInput = {
    signatureOrderId: string;
    signatoryId: string;
};
export type DeleteSignatoryButtonMutationVariables = {
    input: DeleteSignatoryInput;
};
export type DeleteSignatoryButtonMutationResponse = {
    readonly deleteSignatory: {
        readonly signatureOrder: {
            readonly signatories: ReadonlyArray<{
                readonly id: string;
                readonly status: SignatoryStatus;
                readonly href: string;
                readonly reference: string | null;
            }>;
            readonly " $fragmentRefs": FragmentRefs<"AddSignatoryButton_signatureOrder">;
        };
    } | null;
};
export type DeleteSignatoryButtonMutation = {
    readonly response: DeleteSignatoryButtonMutationResponse;
    readonly variables: DeleteSignatoryButtonMutationVariables;
};



/*
mutation DeleteSignatoryButtonMutation(
  $input: DeleteSignatoryInput!
) {
  deleteSignatory(input: $input) {
    signatureOrder {
      ...AddSignatoryButton_signatureOrder
      signatories {
        id
        status
        href
        reference
      }
      id
    }
  }
}

fragment AddSignatoryButton_signatureOrder on SignatureOrder {
  id
  status
  ...AddSignatoryModal_signatureOrder
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
    "name": "DeleteSignatoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteSignatoryOutput",
        "kind": "LinkedField",
        "name": "deleteSignatory",
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
                "name": "AddSignatoryButton_signatureOrder"
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
    "name": "DeleteSignatoryButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteSignatoryOutput",
        "kind": "LinkedField",
        "name": "deleteSignatory",
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
    "cacheID": "7fbcd5fe8ad9fd4676b371acce2d0321",
    "id": null,
    "metadata": {},
    "name": "DeleteSignatoryButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteSignatoryButtonMutation(\n  $input: DeleteSignatoryInput!\n) {\n  deleteSignatory(input: $input) {\n    signatureOrder {\n      ...AddSignatoryButton_signatureOrder\n      signatories {\n        id\n        status\n        href\n        reference\n      }\n      id\n    }\n  }\n}\n\nfragment AddSignatoryButton_signatureOrder on SignatureOrder {\n  id\n  status\n  ...AddSignatoryModal_signatureOrder\n}\n\nfragment AddSignatoryModal_signatureOrder on SignatureOrder {\n  id\n  status\n  documents {\n    __typename\n    id\n  }\n  ...SignatoryDocumentInput_signatureOrder\n}\n\nfragment SignatoryDocumentInput_signatureOrder on SignatureOrder {\n  documents {\n    __typename\n    id\n    title\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dddc6a5c868815bed1dc3b4e87ddfb86';
export default node;
