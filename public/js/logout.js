// Add event listener to the logout button click
document.getElementById('logout').addEventListener('click', async (event) => {
  event.preventDefault();

  // Make a POST request to the server to log out the user
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // Set request header to indicate JSON content
  });

  // Check if the response is successful
  if (response.ok) {
    // Redirect the user to the homepage upon successful logout
    document.location.replace('/');
  } else {
    // Display an alert if logout fails
    alert('Failed to log out. Please try again.');
  }
});

  