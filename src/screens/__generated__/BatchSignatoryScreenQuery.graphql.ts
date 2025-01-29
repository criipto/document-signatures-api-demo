/**
 * @generated SignedSource<<526c1d97de26a412ea34757890e1ccbe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Language = "DA_DK" | "EN_US" | "NB_NO" | "SV_SE" | "%future added value";
export type SignatoryStatus = "DELETED" | "ERROR" | "OPEN" | "REJECTED" | "SIGNED" | "%future added value";
export type BatchSignatoryScreenQuery$variables = {
  id: string;
};
export type BatchSignatoryScreenQuery$data = {
  readonly batchSignatory: {
    readonly href: string;
    readonly items: ReadonlyArray<{
      readonly signatory: {
        readonly id: string;
        readonly reference: string | null;
        readonly status: SignatoryStatus;
      };
      readonly signatureOrder: {
        readonly id: string;
        readonly title: string | null;
      };
    }>;
    readonly ui: {
      readonly disableRejection: boolean;
      readonly language: Language;
      readonly logo: {
        readonly href: string | null;
        readonly src: string;
      } | null;
      readonly renderPdfAnnotationLayer: boolean;
      readonly signatoryRedirectUri: string | null;
      readonly stylesheet: string | null;
    };
  } | null;
};
export type BatchSignatoryScreenQuery = {
  response: BatchSignatoryScreenQuery$data;
  variables: BatchSignatoryScreenQuery$variables;
};

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
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "BatchSignatoryItem",
  "kind": "LinkedField",
  "name": "items",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Signatory",
      "kind": "LinkedField",
      "name": "signatory",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "reference",
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
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SignatureOrder",
      "kind": "LinkedField",
      "name": "signatureOrder",
      "plural": false,
      "selections": [
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
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "SignatureOrderUI",
  "kind": "LinkedField",
  "name": "ui",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "signatoryRedirectUri",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stylesheet",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "language",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SignatureOrderUILogo",
      "kind": "LinkedField",
      "name": "logo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        },
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "disableRejection",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "renderPdfAnnotationLayer",
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
    "name": "BatchSignatoryScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BatchSignatory",
        "kind": "LinkedField",
        "name": "batchSignatory",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
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
    "name": "BatchSignatoryScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BatchSignatory",
        "kind": "LinkedField",
        "name": "batchSignatory",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ada5cddc2d55556b9dc004008472bc5f",
    "id": null,
    "metadata": {},
    "name": "BatchSignatoryScreenQuery",
    "operationKind": "query",
    "text": "query BatchSignatoryScreenQuery(\n  $id: ID!\n) {\n  batchSignatory(id: $id) {\n    href\n    items {\n      signatory {\n        id\n        reference\n        status\n      }\n      signatureOrder {\n        id\n        title\n      }\n    }\n    ui {\n      signatoryRedirectUri\n      stylesheet\n      language\n      logo {\n        src\n        href\n      }\n      disableRejection\n      renderPdfAnnotationLayer\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1afdaa040c54f9777b4c03a8cb0bfd7d";

export default node;
