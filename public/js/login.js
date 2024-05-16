const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                // If response is not OK, log the error message
                const errorMessage = await response.text();
                console.error('Failed to log in:', errorMessage);
                alert('Failed to log in');
            }
        } catch (error) {
            // Log any network or fetch-related errors
            console.error('Error during login:', error);
            alert('Failed to log in. Please try again later.');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

  