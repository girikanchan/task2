document.addEventListener("DOMContentLoaded", function() {
    fetch('/post')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        })
        .then(posts => {
            const blogContainer = document.querySelector('.blogContainer');
            const blogContent = blogContainer.querySelector('.blogContent');

            posts.forEach(post => {
                const blogPost = document.createElement('div');
                blogPost.classList.add('blogpost');

                const blogPostImg = document.createElement('div');
                blogPostImg.classList.add('blog_post_img', 'img');
                const img = document.createElement('img');
                img.src = post.img;
                //blogPostImg.appendChild(img);

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
                    } catch (error) {
                        console.error('Error updating like:', error);
                        alert('Failed to update like. Please try again later.');
                    }
                });

                blogPostlike.appendChild(likebtn);

                const liketext = document.createElement('div');
                liketext.classList.add('like_text');
                const plike = document.createElement('p');
                plike.textContent = post.likes;
                liketext.appendChild(plike);

                blogPostInfo.appendChild(blogPostDate);
                blogPostInfo.appendChild(blogPostTitle);
                blogPostInfo.appendChild(blogPostContent);
                blogPostInfo.appendChild(blogPostId);
                blogPostInfo.appendChild(blogPostlike);
                blogPostInfo.appendChild(liketext);

                const blogPostComment = document.createElement('div');
                blogPostComment.classList.add('blog_post_comment');

                const commentForm = document.createElement("form");
                commentForm.setAttribute("method", "post");
                commentForm.setAttribute("action", "comments");
                commentForm.setAttribute("id", "commentForm");

                const textfield = document.createElement("input");
                textfield.type = "text";
                textfield.value = "";
                textfield.placeholder = "Add Comment here... ";
                textfield.id = "commentContent";
                commentForm.appendChild(textfield);

                const commentbtn = document.createElement('button');
                commentbtn.classList.add('commentbtn');
                commentbtn.textContent = 'comment';
                commentForm.appendChild(commentbtn);

                blogPostComment.appendChild(commentForm);

                blogPostInfo.appendChild(blogPostComment);
                blogPost.appendChild(blogPostImg);
                blogPost.appendChild(blogPostInfo);
                blogContent.appendChild(blogPost);

                const PostcommentForm = document.getElementById('commentForm');

                PostcommentForm.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const postId = post.postid;
                    const commentContent = document.getElementById('commentContent').value;

                    try {
                        const commentsResponse = await fetch(`/comments/${postId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ commentContent })
                        });

                        if (commentsResponse.ok) {
                            location.href = "/seepost";
                        } else {
                            console.error('Error sending postId to /comments API');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });

            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts. Please try again later.');
        });
});
