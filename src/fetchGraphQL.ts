async function fetchGraphQL(text : string, variables : any) {
    if (!process.env.REACT_APP_GRAPHQL_URI) throw new Error('REACT_APP_GRAPHQL_URI not configured');
  
    const response = await fetch(process.env.REACT_APP_GRAPHQL_URI!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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