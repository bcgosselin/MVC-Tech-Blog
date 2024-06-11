// Add event listener to the login form submission
document.querySelector('.login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Retrieve the values of the username and password fields from the form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both username and password fields have values
  if (username && password) {
      // Make a POST request to the server to authenticate the user
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }), // Send username and password as JSON data
          headers: { 'Content-Type': 'application/json' }, // Set request header to indicate JSON content
        });
    
        // Check if the response is successful
        if (response.ok) {
          // Redirect the user to the homepage upon successful login
          document.location.replace('/');
        } else {
          // Display an alert if login fails
          alert('Failed to log in. Please check your credentials and try again.');
        }
      }
});