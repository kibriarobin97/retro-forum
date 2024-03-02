const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const post = data.posts;
    displayPost(post);
}

const displayPost = (data) => {
    const postContainer = document.getElementById('post-container')
    data.forEach(post => {
        const div = document.createElement('div');
        div.classList = `bg-[#797DFC1A] p-5 rounded-xl flex gap-3 my-3`;
        div.innerHTML = `
        <div class="flex">
            <div class="w-20 h-20 bg-white">
            <img src="${post.image}" alt="">
            </div>
            <div class=""><img src="images/Status.png" alt=""></div>
        </div>
        <div>
            <div class="space-y-2">
                <div class="flex gap-4">
                    <p class="font-semibold"><span>#</span>${post.category}</p>
                    <p class="font-semibold">Author: ${post.author.name}</p>
                </div>
                <h3 class="text-xl font-bold">${post.title}</h3>
                <p class="text-[#12132D99]">${post.description}</p>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex gap-5 items-center my-5">
                    <div class="flex items-center gap-2">
                        <img src="images/Vector (2).png" alt="">
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img src="images/Vector (1).png" alt="">
                        <p>${post.view_count}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img src="images/Group 18.png" alt="">
                        <p><span>${post.posted_time}</span> min</p>
                    </div>
                </div>
                <div>
                    <button><img src="images/Group 40106.png" alt=""></button>
                </div>
            </div>
        </div>
        `;
        postContainer.appendChild(div);
    });
}

loadData()