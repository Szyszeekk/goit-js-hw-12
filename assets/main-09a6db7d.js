import{S as v,i as p,a as b}from"./vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const i=document.querySelector(".more-btn");let c=1,d=40,m="";const u=document.querySelector("#image-result"),n=document.createElement("span");n.classList.add("loader");const y=document.querySelector(".image-list"),w=new v(".image-list a");async function f(s,t,r){const a=new URLSearchParams({key:"45031413-5a86df50e03b9d2dcce76b542",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:t});return(await b.get(`https://pixabay.com/api/?${a}`)).data}function g(s){s.forEach(t=>{const r=document.createElement("li"),a=document.createElement("a");a.href=t.largeImageURL,a.classList.add("image-link");const e=document.createElement("img");e.src=t.webformatURL,e.alt=t.tags,a.appendChild(e),r.appendChild(a),r.innerHTML+=`<div class="properties">
      <div class="property"><span class="property-name">Likes</span> <span class="property-value">${t.likes}</span></div>
      <div class="property"><span class="property-name">Views</span> <span class="property-value">${t.views}</span></div>
      <div class="property"><span class="property-name">Comments</span> <span class="property-value">${t.comments}</span></div>
      <div class="property"><span class="property-name">Downloads</span> <span class="property-value">${t.downloads}</span></div>
    </div>`,y.appendChild(r)}),w.refresh()}function h(s){s.length<d?(i.style.display="none",p.show({message:"We're sorry, but you've reached the end of search results",backgroundColor:"lightblue",position:"topRight"})):i.style.display="block"}function L(){const s=document.querySelector(".image-list li");if(s){const t=s.getBoundingClientRect().height;window.scrollBy({top:t*2,left:0,behavior:"smooth"})}}document.querySelector(".search-form").addEventListener("submit",async s=>{s.preventDefault();const t=document.querySelector("#search").value;m=t,c=1,y.innerHTML="",u.appendChild(n),i.style.display="none";try{const r=await f(t,c,d);n.remove(),r.hits.length>0?(g(r.hits),c+=1,h(r.hits)):p.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",messageColor:"#fff",iconColor:"#fff",position:"topRight"})}catch{n.remove(),p.error({title:"Error",message:"Something is wrong with the code again :("})}});i.addEventListener("click",async()=>{u.appendChild(n),i.style.display="none";try{const s=await f(m,c,d);g(s.hits),c+=1,n.remove(),h(s.hits),L()}catch(s){console.log(s),n.remove(),i.style.display="block"}});
//# sourceMappingURL=main-09a6db7d.js.map
