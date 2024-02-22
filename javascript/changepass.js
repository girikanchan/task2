document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('updatePasword');

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        const userid = document.getElementById('userid').value;
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('newpass').value;
        const confirmNewPassword = document.getElementById('confirmpass').value;

        try {
            const response = await fetch('/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userid: userid,oldPassword: oldPassword, newPassword: newPassword ,confirmNewPassword:confirmNewPassword})
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
            }

            // Registration successful
            alert('Password Updated Successfully');
            window.location.href = '/login';
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
