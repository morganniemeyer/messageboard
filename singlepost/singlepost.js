/* imports */
import '../auth/user.js';
import { getPost, createComment, getUser, getComments } from '../fetch-utils.js';
import { bigRenderPost } from '../renders.js';

/* dom */
const errB = document.getElementById('error-life');
const holder = document.getElementById('big-posty');
const commentTime = document.getElementById('commentadd');
const holdComments = document.getElementById('comment-holder');
/* state */
let error = null;
let post = null;

/* events */

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        errorTime();
    }
    if (!post) {
        location.assign('../');
    } else {
        holder.innerHTML = '';
        const postEl = bigRenderPost(post);
        holder.append(postEl);
        showComments();
    }
});

commentTime.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(commentTime);
    const user = getUser();

    const commentUpload = {
        comment: formData.get('commenttxt'),
        post_id: post.id,
        user_id: user.id,
    };

    const response = await createComment(commentUpload);
    error = response.error;

    if (error) {
        errorTime();
    } else {
        await showCommentsAgain();
        commentTime.reset();
    }
});

/* functions*/
function errorTime() {
    if (error) {
        errB.textContent = error.message;
    } else {
        errB.textContent = null;
    }
}

function showComments() {
    holdComments.innerHTML = '';

    for (const comment of post.comments) {
        const li = document.createElement('li');
        li.textContent = comment.comment;
        li.classList.add('comment');

        holdComments.append(li);
    }
}
async function showCommentsAgain() {
    holdComments.innerHTML = '';
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const data = await getComments(id);

    const comments = data.data;

    for (const comment of comments) {
        const li = document.createElement('li');
        li.textContent = comment.comment;
        li.classList.add('comment');
        holdComments.append(li);
    }
}
