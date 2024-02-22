document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const userid = document.getElementById('userid').value;
        const password = document.getElementById('password').value;
        const cpassword = document.getElementById('cpassword').value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userid: userid, password: password, cpassword: cpassword })
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
            }

            // Registration successful
            alert('Registration successful');
            // Redirect to login form
            window.location.href = '/login';
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
