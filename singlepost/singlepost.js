/* imports */
import '../auth/user.js';
import { getPost } from '../fetch-utils.js';
import { bigRenderPost } from '../renders.js';

/* dom */
const errB = document.getElementById('error-life');
const holder = document.getElementById('big-posty');

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

/* functions*/
function errorTime() {
    if (error) {
        errB.textContent = error.message;
    } else {
        errB.textContent = null;
    }
}
