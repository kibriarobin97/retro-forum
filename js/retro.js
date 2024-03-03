const loadData = async (searchText = 'comedy') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const post = data.posts;
    displayPost(post);
}

const displayPost = (data) => {
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = '';

    data.forEach(post => {

        let statusBadge = '';
        if (post.isActive) {
            statusBadge = `<img src="images/Status.png" alt=""></img>`;
        }
        else {
            statusBadge = `<img src="images/Status (1).png" alt="">`;
        }

        const div = document.createElement('div');
        div.classList = `bg-[#797DFC1A] p-5 rounded-xl flex gap-3 my-3`;
        div.innerHTML = `
        <div class="flex">
            <div class="w-20 h-20 bg-white">
            <img src="${post.image}" alt="">
            </div>
            <div class="">
                ${statusBadge}
            </div>
        </div>
        <div>
            <div class="space-y-2">
                <div class="flex gap-4">
                    <p class="font-semibold"><span>#</span>${post.category}</p>
                    <p class="font-semibold">Author: ${post.author.name}</p>
                </div>
                <h3 id="post-title" class="text-xl font-bold">${post.title}</h3>
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
                        <p id="post-view">${post.view_count}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img src="images/Group 18.png" alt="">
                        <p><span>${post.posted_time}</span> min</p>
                    </div>
                </div>
                <div class="">
                    <button onclick="cardButton()"><img src="images/Group 40106.png" alt=""></button>
                </div>
            </div>
        </div>
        `;
        postContainer.appendChild(div);
    });
    loadingSpinner(false);
}


loadData();

const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPost(data);
    cardButton(data);
}

const displayLatestPost = (latestPost) => {
    const cardContainer = document.getElementById('card-container');

    latestPost.forEach(latPost => {
        // console.log(post)

        let postedDate = '';
        if (latPost.author?.posted_date) {
            postedDate = `${latPost.author?.posted_date}`;
        }
        else {
            postedDate = 'No Publish Date';
        }

        let desig = '';
        if (latPost.author?.designation) {
            desig = `${latPost.author?.designation}`
        }
        else {
            desig = 'Unknown';
        }

        const div = document.createElement('div');
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = `
            <figure class="p-3 rounded-md"><img class="rounded-md" src="${latPost.cover_image}"
            alt="" /></figure>
            <div class="card-body">
                <div class="flex items-center gap-2">
                    <img class="w-6 h-6" src="images/calendar.png" alt="">
                    <p>${postedDate}</p>
                </div>
                <h2 class="font-extrabold">${latPost.title}</h2>
                <p class="text-[#12132D99]">${latPost.description}</p>
                <div class="flex items-center gap-3">
                    <div class="bg-red-400 w-12 h-12 rounded-full">
                        <img class="rounded-full" src="${latPost.profile_image}" alt="">
                    </div>
                    <div>
                        <h4 class="font-bold">${latPost.author.name}</h4>
                        <p class="text-[#12132D99]">${desig}</p>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });

}

loadLatestPost();

const handleSearch = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadingSpinner(true);
    loadData(searchText);
}

const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

    let titleCount = document.getElementById('title-count')
    titleCount=0;
const cardButton = () => {
    titleCount=titleCount+1;
    const postTitle = document.getElementById('post-title')
    const postTitleText = postTitle.innerText;

    const postView = document.getElementById('post-view');
    const postViewText = postView.innerText;

    const markReadTitle = document.getElementById('mark-read-container-title');
    const div = document.createElement('div')
    div.classList = `flex justify-between items-center gap-5 p-5`;
    div.innerHTML = `
        <h3 class="font-semibold">${postTitleText}</h3>
        <div id="mark-read-container-view" class="flex items-center gap-2">
            <img src="images/Vector (1).png" alt="">
            <p>${postViewText}</p>
        </div>
    `;
    markReadTitle.appendChild(div);
}