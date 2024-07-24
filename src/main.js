// Opisany w dokumentacji
import iziToast from 'izitoast';
// Opcjonalny import stylów
import 'izitoast/dist/css/iziToast.min.css';
// Opisany w dokumentacji
import SimpleLightbox from 'simplelightbox';
// Opcjonalny import stylów
import 'simplelightbox/dist/simple-lightbox.min.css';

document.querySelector('.search-form').addEventListener('submit', event => {
  event.preventDefault();

  const search = document.querySelector('#search').value;
  const options = {
    key: '45031413-5a86df50e03b9d2dcce76b542',
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const imageResult = document.querySelector('#image-result');
  const loader = document.createElement('span');
  loader.classList.add('loader');

  const imageList = document.querySelector('.image-list');
  imageList.innerHTML = '';
  imageResult.appendChild(loader);

  fetch(
    `https://pixabay.com/api/?key=${options.key}&q=${encodeURIComponent(
      options.q
    )}&image_type=${options.image_type}&orientation=${
      options.orientation
    }&safesearch=${options.safesearch}`
  )
    .then(response => response.json())
    .then(data => {
      loader.remove();
      if (data.hits.length > 0) {
        data.hits.forEach(hit => {
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
            </div>
            `;
          imageList.appendChild(li);
        });

        const lightbox = new SimpleLightbox('.image-list a');
        lightbox.refresh();
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
    })
    .catch(error => {
      loader.remove();
      iziToast.error({
        title: 'Error',
        message: 'Something is wrong with code again :(',
      });
    });
});
