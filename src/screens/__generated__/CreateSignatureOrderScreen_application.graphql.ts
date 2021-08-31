/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CreateSignatureOrderScreen_application = {
    readonly id: string;
    readonly " $refType": "CreateSignatureOrderScreen_application";
};
export type CreateSignatureOrderScreen_application$data = CreateSignatureOrderScreen_application;
export type CreateSignatureOrderScreen_application$key = {
    readonly " $data"?: CreateSignatureOrderScreen_application$data;
    readonly " $fragmentRefs": FragmentRefs<"CreateSignatureOrderScreen_application">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateSignatureOrderScreen_application",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Application",
  "abstractKey": null
};
(node as any).hash = '39e0da9031b8a461cee7af18af82ea5b';
export default node;
