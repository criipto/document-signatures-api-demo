import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import relay from "vite-plugin-relay";

if ((process.env.DETECT_PREVIEW || process.env.VITE_DETECT_PREVIEW) && process.env.REVIEW_ID) {
  process.env.VITE_GRAPHQL_URI = `https://signatures-api-preview-${process.env.REVIEW_ID.replace('deploy-preview-', '')}.azurewebsites.net/v1/graphql` ;
  process.env.VITE_SIGNATURE_FRONTEND_URI = `https://${process.env.REVIEW_ID}--signatures-frontend-test.netlify.app`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    relay
  ],
  define: {
    global: {}
  },
  build: {
    chunkSizeWarningLimit: 1010
  },
  base: '/'
});