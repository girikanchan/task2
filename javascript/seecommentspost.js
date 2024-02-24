async function fetchComments() {
try {
    const postId = '';
    const response = await fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
    });

    const comments = await response.json();
    renderComments(comments);
} catch (error) {
    console.error('Error fetching comments:', error);
}
}

// Render comments in the HTML
function renderComments(comments) {
const viewCommentsDiv = document.querySelector('.viewcomments');

comments.forEach(comment => {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment_container');
    
    const commentCard = document.createElement('div');
    commentCard.classList.add('comment_card');
    
    const commentTitle = document.createElement('h3');
    commentTitle.classList.add('comment_title');
    commentTitle.textContent = comment.comment_title;
    
    const commentContent = document.createElement('p');
    commentContent.textContent = comment.comment_content;
    
    const commentFooter = document.createElement('div');
    commentFooter.classList.add('comment_footer');
    
    const showReplies = document.createElement('div');
    showReplies.classList.add('show_replies');
    showReplies.textContent = 'Reply ' + comment.reply_count;
    
    commentFooter.appendChild(showReplies);
    commentCard.appendChild(commentTitle);
    commentCard.appendChild(commentContent);
    commentCard.appendChild(commentFooter);
    commentContainer.appendChild(commentCard);
    
    viewCommentsDiv.appendChild(commentContainer);
});
}
window.onload = fetchComments;

