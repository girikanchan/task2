document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('addpost');

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Check if the element with ID 'name' exists
        const nameElement = document.getElementById('name');
        if (!nameElement) {
            console.error("Element with ID 'name' not found");
            return; // Exit early to avoid further errors
        }
        const name = nameElement.value;

        // Check if the element with ID 'description' exists
        const descriptionElement = document.getElementById('description');
        if (!descriptionElement) {
            console.error("Element with ID 'description' not found");
            return; // Exit early to avoid further errors
        }
        const description = descriptionElement.value;

        // Check if the element with ID 'img' exists
        const imgElement = document.getElementById('img');
        if (!imgElement) {
            console.error("Element with ID 'img' not found");
            return; // Exit early to avoid further errors
        }
        const img = imgElement.value;

        try {
            const response = await fetch('/addpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, description: description, img: img })
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
            }

            // Registration successful
            alert('Post Created successful');
            // Redirect to login form
            window.location.href = '/profile';
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
