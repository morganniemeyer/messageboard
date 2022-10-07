/* imports */
import '../auth/user.js';
import { uploadImage, createRow } from '../fetch-utils.js';

/* Elements */
const imgInput = document.getElementById('uploader');
const preview = document.getElementById('preview');
const errDisp = document.getElementById('error');
const postForm = document.getElementById('post-form');

/* state */
let error = '';

/* Event Listeners */

imgInput.addEventListener('change', () => {
    const pic = imgInput.files[0];

    if (pic) {
        preview.src = URL.createObjectURL(pic);
    } else {
        preview.src = '../assets/html.png';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `message/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('message', imagePath, imageFile);

    const post = {
        title: formData.get('title'),
        body: formData.get('body-text'),
        img_url: url,
    };

    const response = await createRow(post);

    error = response.error;

    if (error) {
        errorShow();
    } else {
        location.assign('../');
    }
});

/* functions */

function errorShow() {
    if (error) {
        errDisp.textContent = error.message;
    } else {
        errDisp.textContent = '';
    }
}
