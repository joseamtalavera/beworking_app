/* Create a new user in the database and verify the user's token
  This function is asynchronous because it uses the fetch() API to make an HTTP request to the server
  Meaning it returns a Promise and allows the use of the await keyword to pause the execution of the function
  until the Promise is resolved or rejected.
  The createUser() takes one argument, tokenId, which is the token that Google sends back to the client upon
  successful authentication. */
  export const createUser = async (tokenId) => {

    try {
      const response = await fetch('/api/token-signin', 
      {

      /* The fetch() API is used to make an HTTP request to the server, to the /api/users endpoint 
      to create a new user.
      The method is POST and the Content-Type header is set to application/json. It use to indicate
      the type of data that is being sent in the request body.
      Here we are telling the server that we are sending JSON-encondede data in the body of the request.
      The server will parse this information into the correct format  */
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId })
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      // Thisi an asynchronous operation that returns a Promise that resolves to a JSON object
      // which could be any kind of JavaScript object. The await keyword pauses the execution of the function
      // until the Promise is resolved or rejected, and the resolved value is assigned to the data variable.
      const data = await response.json();
      console.log('User created: ',data);
      return data;
    }catch (error) {
      console.error('Error creating user:', error);
      throw new Error(error); // re-throw the error so it can be caught and handled in the component.
    }
  };