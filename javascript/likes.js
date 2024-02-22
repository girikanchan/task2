document.addEventListener("DOMContentLoaded", function() {
    fetch('/post')
        .then(response => response.json())
        .then(posts => {
            const blogContainer = document.querySelector('.blogContainer');
            const blogContent = blogContainer.querySelector('.blogContent');

            posts.forEach(post => {
                const blogPost = document.createElement('div');
                blogPost.classList.add('blogpost');

                const blogPostImg = document.createElement('div');
                blogPostImg.classList.add('blog_post_img', 'img');
                const img = document.createElement('img');
                img.src = post.img; //key
                blogPostImg.appendChild(img);

                const blogPostInfo = document.createElement('div');
                blogPostInfo.classList.add('blog_post_info');

                const blogPostDate = document.createElement('div');
                blogPostDate.classList.add('blog_post_date');
                const userEmail = document.createElement('span');
                userEmail.textContent = post.user_id; // key
                const postDate = document.createElement('span');
                postDate.textContent = post.updated_time; // key
                blogPostDate.appendChild(userEmail);
                blogPostDate.appendChild(postDate);

                const blogPostTitle = document.createElement('h1');
                blogPostTitle.classList.add('blog_post_title');
                blogPostTitle.textContent = post.name; // key

                const blogPostContent = document.createElement('p');
                blogPostContent.classList.add('blog_post_content');
                blogPostContent.textContent = post.description; //  key

                const blogPostlike = document.createElement('div');
                blogPostlike.classList.add('blog_post_like');
                const likebtn = document.createElement('button');
                likebtn.classList.add('likebtn');
                likebtn.textContent = 'Like'; // Text for like button
                likebtn.addEventListener('click', () => {
                    //it should go to api link "/like". 
                    if (likebtn.textContent === 'Like') {
                        likebtn.textContent = 'Unlike';
                        post.like++;
                        plike.textContent = post.likes;
                    } else {
                        likebtn.textContent = 'Like';
                        post.like--;
                        plike.textContent = post.likes;
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
                blogPostInfo.appendChild(blogPostlike);
                blogPostInfo.appendChild(liketext);

                blogPost.appendChild(blogPostImg);
                blogPost.appendChild(blogPostInfo);

                blogContent.appendChild(blogPost);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});