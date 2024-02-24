let plike;

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
                img.src = post.img; // Key
                //blogPostImg.appendChild(img);

                const blogPostInfo = document.createElement('div');
                blogPostInfo.classList.add('blog_post_info');

                const blogPostDate = document.createElement('div');
                blogPostDate.classList.add('blog_post_date');
                const userEmail = document.createElement('span');
                userEmail.textContent = post.user_id; // Pass this to '/likes api'
                const postDate = document.createElement('span');
                postDate.textContent = post.updated_time; // Key
                blogPostDate.appendChild(userEmail);
                blogPostDate.appendChild(postDate);

                const blogPostTitle = document.createElement('h1');
                blogPostTitle.classList.add('blog_post_title');
                blogPostTitle.textContent = post.name; // Key

                const blogPostContent = document.createElement('p');
                blogPostContent.classList.add('blog_post_content');
                blogPostContent.textContent = post.description; // Key

                const blogPostId = document.createElement('p');
                blogPostId.classList.add('blog_post_id');
                //blogPostId.textContent = post.postid; // Pass this postid to api

                const blogPostlike = document.createElement('div');
                blogPostlike.classList.add('blog_post_like');


                //main logic for performing like operation :

                /***
                 * When user click on like button it will send userid(logged in user's) and postid(of post created by him or others)
                 * and change the button text to  "Dislike". if any user have already liked a comment and if it again click on dislike button than
                 * it will perform a dislike operation and again button text will change to "Like". 
                 */


                const likebtn = document.createElement('button');
                likebtn.classList.add('likebtn');
                likebtn.textContent = 'Like'; // Default text for like button
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
                        plike.textContent = updatedPost.like; // fetching and updating likes counts
                    } catch (error) {
                        console.error('Error updating like:', error);
                        alert('Failed to update like. Please try again later.');
                    }
                });

                blogPostlike.appendChild(likebtn);

                const liketext = document.createElement('div');
                liketext.classList.add('like_text');
                const plike = document.createElement('p');
                plike.textContent = post.likes; // Text for like count
                liketext.appendChild(plike);

                
                blogPostInfo.appendChild(blogPostDate);
                blogPostInfo.appendChild(blogPostTitle);
                blogPostInfo.appendChild(blogPostContent);
                blogPostInfo.appendChild(blogPostId);
                blogPostInfo.appendChild(blogPostlike);
                blogPostInfo.appendChild(liketext);

//comment button
                const blogPostComment = document.createElement('div');

                let form = document.createElement("form");
                form.setAttribute("method", "post");
                form.setAttribute("action" , "comments");
                form.setAttribute("id" , "commmentform");

                
                const textfield = document.createElement("input");
                textfield.type = "text";
                textfield.value = "";
                textfield.placeholder = "Add Comment here... ";
                textfield.id = "commentContent";
                form.appendChild(textfield);

                
                blogPostComment.classList.add('blog_post_comment');
                const commentbtn = document.createElement('button');
                commentbtn.classList.add('commentbtn');
                commentbtn.textContent = 'comment'; 
                form.appendChild(commentbtn);

                blogPostComment.appendChild(form);

                
                commentbtn.addEventListener('click', async () => {
                    const postId = post.postid;
                    const commentfrom = document.getElementById('commmentform');
                    const commentContent = document.getElementById('commentContent').value;
            
                    try {
                        const commentsResponse = await fetch('/comments/:postId', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ postId, commentContent: commentContent })
                        });
                
                        if (commentsResponse.ok) {
                            location.href = "/seepost";
                        } else {
                            console.error('Error sending postId to /comments API');
                        }

                        if (!response.ok) {
                            const errorMessage = await response.json();
                            throw new Error(errorMessage.error);
                        }

                        //form to add comments to post for PostId and on clicking submit it will give alert
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });
                
                blogPostInfo.appendChild(blogPostComment);
                blogPost.appendChild(blogPostImg);
                blogPost.appendChild(blogPostInfo);
                blogContent.appendChild(blogPost);

            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts. Please try again later.');
        });
});