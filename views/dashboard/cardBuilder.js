
export function renderCard({index, title, imgUrl, _id}) { 
    return  `
    <div class="volume-card" id="${_id}">
    <img src="${imgUrl}" alt="Volume 1">
    <div class="volume-banner">VOLUME ${index}</div>
    <div class="volume-info">
    <h3>NO://OVERFLOW ${title.toUpperCase()}</h3>
    </div>
    </div>   
   `; 
}
