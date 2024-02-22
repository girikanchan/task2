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