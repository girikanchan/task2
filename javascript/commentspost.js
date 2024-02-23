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
    const commentForm = document.getElementById('commentpost');

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const formData = new FormData(commentForm); 
        const commentContent = formData.get('name');
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
                commentcontent: commentContent
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    });
});
