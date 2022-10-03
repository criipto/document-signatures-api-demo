/// <reference types="react-scripts" />

declare module 'babel-plugin-relay/macro' {
	export { graphql as default } from 'react-relay'
}

declare module "*.pdf" {
  const content: any;
  export default content;
}