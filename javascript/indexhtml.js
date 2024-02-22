document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('loginform');

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const userid = document.getElementById('userid').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userid: userid, password: password })
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
            }

            // Registration successful
            alert('Login successful');
            //redirecting it  to the user profile page of the application
            window.location.href = '/profile';
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
