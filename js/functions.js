function Game(apiKey) {

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=nature&media=photos&per_page=12&page=1&format=json&nojsoncallback=1`;
    let images = [[], []];

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < 12; i++) {
            images[0][i] = data.photos.photo[i];
            images[1][i] = data.photos.photo[i];
        }
        imageGeneration(images);
    })

    //Från Prototype
    this.match('.card')

}

function imageGeneration(images) {

    let allCards = document.querySelectorAll('.card');
    // Lägger till IMG element tagg till .card klassen.
    for (let i = 0; i < 24; i++) {
        let img = document.createElement('img');
        allCards[i].appendChild(img);
        img.classList.add('hide')
    }

    let allImg = document.querySelectorAll('img');

    // Loopa igenom 2ggr och sedan spotta ut 24 bilder pga vi hämtar 12st och sparar ner de i en array
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 12; j++) {
            let id = images[i][j].id;
            let secret = images[i][j].secret;
            let server = images[i][j].server;
            let size = 'q';

            let result = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;

            allImg[j].src = result;
            allImg[j + 12].src = result;
        }
    }


}

// Prototypes
Game.prototype.match = function (className) {
    const card = document.querySelectorAll(className);
    card.forEach(c => {
        c.addEventListener('click', (e) => {
            e.target.classList.toggle('hide')
            console.log(e.target)
        })
    });
}

//Vi skickar ut Game functions till Main.js
export { Game };