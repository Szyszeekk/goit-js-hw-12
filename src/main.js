import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const moreBtn = document.querySelector('.more-btn');
let page = 1;
let perPage = 40;

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

document
  .querySelector('.search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();
    const search = document.querySelector('#search').value;
    imageResult.appendChild(loader);
    imageList.innerHTML = '';
    moreBtn.style.display = 'none';

    try {
      const pics = await fetchPics(search, 1, perPage);
      loader.remove();
      if (pics.hits.length > 0) {
        renderPics(pics.hits);
        page += 1;
        moreBtn.style.display = 'block';
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
  const search = document.querySelector('#search').value;
  imageResult.appendChild(loader);
  moreBtn.style.display = 'none';
  try {
    const pics = await fetchPics(search, page, perPage);
    renderPics(pics.hits);
    page += 1;
    loader.remove();
    moreBtn.style.display = 'block';
  } catch (error) {
    console.log(error);
    loader.remove();
    moreBtn.style.display = 'block';
  }
});
