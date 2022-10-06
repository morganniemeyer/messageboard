export function renderPosts(post) {
    const sec = document.createElement('section');
    sec.classList.add('post');

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.body;

    const img = document.createElement('img');
    img.src = post.img_url;

    sec.append(h2, p, img);

    return sec;
}
