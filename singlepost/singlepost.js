/* imports */
import '../auth/user.js';
import { getPost, createComment, getUser } from '../fetch-utils.js';
import { bigRenderPost } from '../renders.js';

/* dom */
const errB = document.getElementById('error-life');
const holder = document.getElementById('big-posty');
const commentTime = document.getElementById('commentadd');
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
    const comment = response.data;

    if (error) {
        errorTime();
    } else {
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
