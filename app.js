/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getPosts } from './fetch-utils.js';
import { renderPosts } from './renders.js';

/* Get DOM Elements */
const board = document.getElementById('message-box');
const err = document.getElementById('errorbox');
/* State */
let error = null;
let messages = [];
/* Events */

window.addEventListener('load', async () => {
    const response = await getPosts();
    error = response.error;
    messages = response.data;

    if (error) {
        errorRead();
    } else {
        displayPosts();
    }
});

/* Display Functions */
function errorRead() {
    if (error) {
        err.textContent = error.message;
    } else {
        err.textContent = null;
    }
}

function displayPosts() {
    board.innerHTML = '';

    for (const post of messages) {
        const messEl = renderPosts(post);
        board.append(messEl);
    }
}
