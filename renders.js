export function renderPosts(post) {
    const sec = document.createElement('section');
    sec.classList.add('post');

    const a = document.createElement('a');
    a.href = `/singlepost/?id=${post.id}`;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.body;

    const img = document.createElement('img');
    img.src = post.img_url;

    a.append(h2, p, img);
    sec.append(a);

    return sec;
}
