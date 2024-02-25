async function fetchComments(postId) {
    try {
        const response = await fetch(`/seecomments/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const comments = await response.json();
        renderComments(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

function renderComments(comments) {
    const viewCommentsDiv = document.querySelector('.viewcomments');
    viewCommentsDiv.innerHTML = ''; // Clear existing comments

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
