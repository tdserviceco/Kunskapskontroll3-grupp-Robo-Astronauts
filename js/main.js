const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=61a0027b6159658475368cfa3414d739&tags=animal&media=photos&per_page=12&page=1&format=json&nojsoncallback=1';

let images;

fetch(url).then(function(response){
    return response.json();
}).then(function(data){
    images = data.photos.photo;
})

function MemoryCard(){

};



