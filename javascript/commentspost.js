const showCommentContainers = document.querySelectorAll(".show_replies");

showCommentContainers.forEach((btn) => btn.addEventListener("click",(e) => {
    console.log("showing nested comments");
    let parentContainer = e.target.closest('.comment_container');
    let commentId = parentContainer.id;
    if(commentId){
        let childrenCommentContainer = parentContainer.querySelectorAll(`[dataset = ${commentId}]`);
        childrenCommentContainer.forEach((child) => child.classList.toggle("opened"));
    }
}));


document.addEventListener('DOMContentLoaded', function () {
    const commmentpost = document.getElementById('commmentpost');

    commmentpost.addEventListener('submit', async function (event) {
        event.preventDefault();

        const commentcontent = document.getElementById('commentcontent').value;
        
        try {
            const response = await fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentcontent: commentcontent })
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
            }

            // Registration successful
            alert('Post commented successful');
            // Redirect to login form
            window.location.href = '/comment';
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
