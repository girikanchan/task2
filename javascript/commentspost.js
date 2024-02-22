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


document.addEventListener("DOMContentLoaded", function() {
    fetch('/comments')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        })
        .then(posts => {
            
            });
        })
        .catch(error => {
            console.error('Error fetching Comments:', error);
            alert('Failed to fetch Comments. Please try again later.');
        });
