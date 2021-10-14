/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SignatoryStatus = "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type SignatureOrderStatus = "CANCELLED" | "CLOSED" | "OPEN" | "%future added value";
export type SignatureWorkflowScreenQueryVariables = {
    id: string;
};
export type SignatureWorkflowScreenQueryResponse = {
    readonly signatureWorkflow: {
        readonly id: string;
        readonly signatureOrder: {
            readonly id: string;
            readonly status: SignatureOrderStatus;
            readonly title: string | null;
        };
        readonly participants: ReadonlyArray<{
            readonly id: string;
            readonly reference: string;
            readonly href: string;
            readonly signatory: {
                readonly status: SignatoryStatus;
            } | null;
        }>;
    } | null;
};
export type SignatureWorkflowScreenQuery = {
    readonly response: SignatureWorkflowScreenQueryResponse;
    readonly variables: SignatureWorkflowScreenQueryVariables;
};



/*
query SignatureWorkflowScreenQuery(
  $id: ID!
) {
  signatureWorkflow(id: $id) {
    id
    signatureOrder {
      id
      status
      title
    }
    participants {
      id
      reference
      href
      signatory {
        status
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignatureWorkflowScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignatureWorkflow",
        "kind": "LinkedField",
        "name": "signatureWorkflow",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkflowParticipant",
            "kind": "LinkedField",
            "name": "participants",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Signatory",
                "kind": "LinkedField",
                "name": "signatory",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignatureWorkflowScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignatureWorkflow",
        "kind": "LinkedField",
        "name": "signatureWorkflow",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkflowParticipant",
            "kind": "LinkedField",
            "name": "participants",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Signatory",
                "kind": "LinkedField",
                "name": "signatory",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d27dd18483ab487ad42e514114c01853",
    "id": null,
    "metadata": {},
    "name": "SignatureWorkflowScreenQuery",
    "operationKind": "query",
    "text": "query SignatureWorkflowScreenQuery(\n  $id: ID!\n) {\n  signatureWorkflow(id: $id) {\n    id\n    signatureOrder {\n      id\n      status\n      title\n    }\n    participants {\n      id\n      reference\n      href\n      signatory {\n        status\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '87d4b6d77b5c2715da292fa56e437817';
export default node;
