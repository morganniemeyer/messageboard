/* imports */
import '../auth/user.js';
import { uploadImage } from '../fetch-utils.js';

/* Elements */
const imgInput = document.getElementById('uploader');
const preview = document.getElementById('preview');
const errDisp = document.getElementById('error');

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

/* functions */

function errorShow() {
    if (error) {
        errDisp.textContent = error.message;
    } else {
        errDisp.textContent = '';
    }
}
