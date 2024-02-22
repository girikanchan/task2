document.addEventListener('DOMContentLoaded', function () {
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', async function () {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }
        alert('Logout successful');
        // Redirect to the login page after successful logout
        window.location.href = '/login';
    } catch (error) {
        console.error('Error during logout:', error.message);
        alert('Logout failed. Please try again.');
    }
});
});