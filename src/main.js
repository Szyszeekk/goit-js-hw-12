import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const moreBtn = document.querySelector('.more-btn');
let page = 1;
let perPage = 40;
let currentSearch = '';

const imageResult = document.querySelector('#image-result');
const loader = document.createElement('span');
loader.classList.add('loader');

const imageList = document.querySelector('.image-list');
const lightbox = new SimpleLightbox('.image-list a');

async function fetchPics(search, page, perPage) {
  const params = new URLSearchParams({
    key: '45031413-5a86df50e03b9d2dcce76b542',
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  return response.data;
}

function renderPics(pics) {
  pics.forEach(hit => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = hit.largeImageURL;
    link.classList.add('image-link');
    const img = document.createElement('img');
    img.src = hit.webformatURL;
    img.alt = hit.tags;
    link.appendChild(img);
    li.appendChild(link);
    li.innerHTML += `<div class="properties">
      <div class="property"><span class="property-name">Likes</span> <span class="property-value">${hit.likes}</span></div>
      <div class="property"><span class="property-name">Views</span> <span class="property-value">${hit.views}</span></div>
      <div class="property"><span class="property-name">Comments</span> <span class="property-value">${hit.comments}</span></div>
      <div class="property"><span class="property-name">Downloads</span> <span class="property-value">${hit.downloads}</span></div>
    </div>`;
    imageList.appendChild(li);
  });

  lightbox.refresh();
}

function checkIfMorePics(pics) {
  if (pics.length < perPage) {
    moreBtn.style.display = 'none';
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results",
      backgroundColor: 'lightblue',
      position: 'topRight',
    });
  } else {
    moreBtn.style.display = 'block';
  }
}

function smoothScroll() {
  const firstImageItem = document.querySelector('.image-list li');
  if (firstImageItem) {
    const itemHeight = firstImageItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });
  }
}

document
  .querySelector('.search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();
    const search = document.querySelector('#search').value;
    currentSearch = search;
    page = 1;
    imageList.innerHTML = '';
    imageResult.appendChild(loader);
    moreBtn.style.display = 'none';

    try {
      const pics = await fetchPics(search, page, perPage);
      loader.remove();
      if (pics.hits.length > 0) {
        renderPics(pics.hits);
        page += 1;
        checkIfMorePics(pics.hits);
      } else {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#EF4040',
          messageColor: '#fff',
          iconColor: '#fff',
          position: 'topRight',
        });
      }
    } catch (error) {
      loader.remove();
      iziToast.error({
        title: 'Error',
        message: 'Something is wrong with the code again :(',
      });
    }
  });

moreBtn.addEventListener('click', async () => {
  imageResult.appendChild(loader);
  moreBtn.style.display = 'none';
  try {
    const pics = await fetchPics(currentSearch, page, perPage);
    renderPics(pics.hits);
    page += 1;
    loader.remove();
    checkIfMorePics(pics.hits);
    smoothScroll();
  } catch (error) {
    console.log(error);
    loader.remove();
    moreBtn.style.display = 'block';
  }
});
