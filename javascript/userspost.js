document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('/post');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();

        const blogContainer = document.querySelector('.blogContainer');
        const blogContent = blogContainer.querySelector('.blogContent');

        posts.forEach(post => {
            const blogPost = document.createElement('div');
            blogPost.classList.add('blogpost');

            const blogPostImg = document.createElement('div');
            blogPostImg.classList.add('blog_post_img', 'img');
            const img = document.createElement('img');
            img.src = post.img;
            blogPostImg.appendChild(img);

            const blogPostInfo = document.createElement('div');
            blogPostInfo.classList.add('blog_post_info');

            const blogPostDate = document.createElement('div');
            blogPostDate.classList.add('blog_post_date');
            const userEmail = document.createElement('span');
            userEmail.textContent = post.user_id;
            const postDate = document.createElement('span');
            postDate.textContent = post.updated_time;
            blogPostDate.appendChild(userEmail);
            blogPostDate.appendChild(postDate);

            const blogPostTitle = document.createElement('h1');
            blogPostTitle.classList.add('blog_post_title');
            blogPostTitle.textContent = post.name;

            const blogPostContent = document.createElement('p');
            blogPostContent.classList.add('blog_post_content');
            blogPostContent.textContent = post.description;

            const blogPostId = document.createElement('p');
            blogPostId.classList.add('blog_post_id');

            const blogPostlike = document.createElement('div');
            blogPostlike.classList.add('blog_post_like');

            const likebtn = document.createElement('button');
            likebtn.classList.add('likebtn');
            likebtn.textContent = 'Like';

            const plike = document.createElement('p');
            plike.textContent = post.likes;

            const liketext = document.createElement('div');
            liketext.classList.add('like_text');
            liketext.appendChild(plike);

            likebtn.addEventListener('click', async () => {
                try {
                    const response = await fetch('/like', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ postId: post.postid, userId: post.user_id })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update like');
                    }

                    const updatedPost = await response.json();

                    if (updatedPost.liked) {
                        likebtn.textContent = 'Dislike';
                        likebtn.disabled = true;
                    } else {
                        likebtn.textContent = 'Like';
                        likebtn.disabled = false;
                    }
                    plike.textContent = updatedPost.like;
                    location.reload();
                } catch (error) {
                    console.error('Error updating like:', error);
                    alert('Failed to update like. Please try again later.');
                }
            });

            blogPostlike.appendChild(likebtn);

            blogPostInfo.appendChild(blogPostDate);
            blogPostInfo.appendChild(blogPostTitle);
            blogPostInfo.appendChild(blogPostContent);
            blogPostInfo.appendChild(blogPostId);
            blogPostInfo.appendChild(blogPostlike);
            blogPostInfo.appendChild(liketext);

            blogPost.appendChild(blogPostImg);
            blogPost.appendChild(blogPostInfo);

            const SeePostComment = document.createElement('div');
            SeePostComment.classList.add('see_post_comment');

            const seeCommentBtn = document.createElement('button');
            seeCommentBtn.textContent = 'See Comment';
            seeCommentBtn.classList.add('see-comment-btn');

            seeCommentBtn.addEventListener('click', () => {
                const postId = post.postid;
                const commentsUrl = `/seecomments/${postId}`;

                // Open a new window
                const newWindow = window.open('', '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');

                fetch(commentsUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch comments');
                        }
                        return response.json();
                    })
                    .then(comments => {
                        
                        const tableHTML = generateCommentsTable(comments);

                        
                        newWindow.document.write(tableHTML);
                    })
                    .catch(error => {
                        console.error('Error fetching comments:', error);
                        newWindow.document.write('Failed to fetch comments. Please try again later.');
                    });
            });

            SeePostComment.appendChild(seeCommentBtn);
            const commentcount = document.createElement('p');
            commentcount.textContent = post.commentCount;

            const countcomtext = document.createElement('div');
            countcomtext.classList.add('like_text');
            countcomtext.appendChild(commentcount);
            SeePostComment.appendChild(countcomtext);

            blogPostInfo.appendChild(SeePostComment);

            const blogPostComment = document.createElement('div');
            blogPostComment.classList.add('blog_post_comment');

            const addCommentBtn = document.createElement('button');
            addCommentBtn.textContent = 'Add Comment';
            addCommentBtn.classList.add('add-comment-btn');

            addCommentBtn.addEventListener('click', () => {
                const commentForm = document.createElement('form');
                commentForm.setAttribute('method', 'post');
                commentForm.classList.add('comment-form');
                commentForm.id = 'commentForm';

                const textfield = document.createElement('input');
                textfield.type = 'text';
                textfield.name = 'commentcontent';
                textfield.id = 'commentContent';
                textfield.placeholder = 'Add Comment here...';
                textfield.classList.add('comment-input');
                commentForm.appendChild(textfield);

                const submitBtn = document.createElement('button');
                submitBtn.type = 'submit';
                submitBtn.textContent = 'Post Comment';
                submitBtn.classList.add('comment-submit-btn');
                commentForm.appendChild(submitBtn);

                blogPostComment.appendChild(commentForm);

                commentForm.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const postId = post.postid;
                    const commentcontent = textfield.value;

                    try {
                        const commentsResponse = await fetch(`/comments/${postId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ commentcontent: commentcontent })
                        });

                        if (commentsResponse.ok) {
                            location.reload();
                        } else {
                            console.error('Error sending postId to /comments API');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });
            });

            blogPostInfo.appendChild(addCommentBtn);
            blogPost.appendChild(blogPostComment);
            blogContent.appendChild(blogPost);
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        alert('Failed to fetch posts. Please try again later.');
    }
});

function generateCommentsTable(comments) {
    let tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Comment ID</th><th>Comment Content</th><th>User ID</th><th>Post ID</th><th>Comment Date</th></tr>';

    comments.forEach(comment => {
        tableHTML += `<tr><td>${comment.Commentid}</td><td>${comment.commentcontent}</td><td>${comment.userid}</td><td>${comment.postid}</td><td>${comment.commentdate}</td></tr>`;
    });

    tableHTML += '</table>';

    return tableHTML;
}
