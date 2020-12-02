function fetchData(){
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=61a0027b6159658475368cfa3414d739&text=nature&media=photos&per_page=12&page=1&format=json&nojsoncallback=1';


let images = [[],[]];

fetch(url).then(function(response){
    return response.json();
}).then(function(data){
    for(let i=0; i<12; i++){
        images[0][i] = data.photos.photo[i];
        images[1][i] = data.photos.photo[i];
    }
    console.log(data)
    imageGeneration(images);
})
}

function imageGeneration(images){
    console.log(images)
    let allCards = document.querySelectorAll('.card');


    for(let i=0; i<24; i++){
        let img = document.createElement('img');
        allCards[i].appendChild(img);
    }

    let allImg = document.querySelectorAll('img');


    for(let i=0; i<2; i++){
        for(let j=0; j<12; j++){
            let id = images[i][j].id;
            let secret = images[i][j].secret;
            let server = images[i][j].server;
            let size = 'q';

            let result = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;

            allImg[j].src = result;
            allImg[j+12].src = result;
        }
    }

}

fetchData();

export {imageGeneration};