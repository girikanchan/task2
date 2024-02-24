/*
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm'); 

    searchForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const searchInput = document.getElementById('searchInput').value; 

        try {
            const response = await fetch(`/searchprofile?username=${searchInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
            }

            const searchResults = await response.json();

            console.log(searchResults);

            alert('Search profiles successful');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});

*/

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const searchInput = document.getElementById('searchInput').value;

        try {
            const response = await fetch(`/searchprofile?username=${searchInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
            }

            const searchResults = await response.json();

            document.getElementById('searchResults').innerHTML = '';

            if (searchResults.length > 0) {
                const resultList = document.createElement('ul');
                searchResults.forEach(result => {
                    const listItem = document.createElement('li');
                    listItem.textContent = result.email;
                    resultList.appendChild(listItem);
                });
                document.getElementById('searchResults').appendChild(resultList);
            } else {
                document.getElementById('searchResults').textContent = 'No results found';
            }

            alert('Search profiles successful');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});