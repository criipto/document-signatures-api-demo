import {getCredentials} from './authentication';

async function fetchGraphQL(text : string, variables : any) {
    if (!import.meta.env.VITE_GRAPHQL_URI) throw new Error('VITE_GRAPHQL_URI not configured');
  
    const response = await fetch(import.meta.env.VITE_GRAPHQL_URI!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${getCredentials()}`,
        'Criipto-Sdk': 'signatures-api-demo'
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    });
  
    // Get the response as JSON
    return await response.json();
  }
  
  export default fetchGraphQL;