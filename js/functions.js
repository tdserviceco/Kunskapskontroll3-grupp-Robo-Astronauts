let matches = 0;

function Game(apiKey) {
    let images = [[], []];
    getData(apiKey).then(data => {
        for (let i = 0; i < 12; i++) {
            images[0][i] = data.photos.photo[i];
            images[1][i] = data.photos.photo[i];
        }
        imageGeneration(images);
    })

    //Från Prototype
    this.match('.card')
}

async function getData(apiKey) {
    let randomPage = Math.floor(Math.random() * 100);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&is_commons=true&in_gallery=true&content_type=1&safe_search=1&text=dogs&tags=dogs&media=photos&per_page=12&page=${randomPage}&format=json&nojsoncallback=1`;
    let response = await fetch(url);
    return response.json()
}

function imageGeneration(images) {
    let allCards = document.querySelectorAll('.card');
    // Lägger till IMG element tagg till .card klassen.

    for (let i = 0; i < 24; i++) {
        let img = document.createElement('img');
        allCards[i].appendChild(img);
        img.classList.add('hide')
    }

    let result;
    let convertNodeListToArray = [];
    // Loopa igenom 2ggr och sedan spotta ut 24 bilder pga vi hämtar 12st och sparar ner de i en array
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 12; j++) {
            let id = images[i][j].id;
            let secret = images[i][j].secret;
            let server = images[i][j].server;
            let size = 'q';
            result = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
            convertNodeListToArray.push(result);
        }

    }
    shuffle(convertNodeListToArray)
}


/**
 * Blandar array index i olika ordning.
 * @param shuffle(a) från https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * 
 */

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return displayImage(a);
}


function displayImage(images) {
    let img = document.querySelectorAll('.card img');
    // console.log(images)
    for (let i = 0; i < images.length; i++) {
        img[i].src = images[i];
    }
}

// Kollar om img.src matchar varandra
function isItMatching(cards) {
    let firstCard = cards[0].target.src;
    let secondCard = cards[1].target.src;

    return firstCard === secondCard ? true : false;
}

// Ändrar scoreboard för varje klickning
function scoreCounter(counter) {
    document.querySelector(".score-board").textContent = counter + " Clicks";
}

// För var index, hitta div och toggle dess childnode (img).
function flipBackCards(card) {
    card.forEach((c) => {
        c.target.classList.toggle("hide");
    });
}

// gör så att matchande kort inte går att klicka på
function disableMatch(card) {
    card.forEach((c) => {
        c.target.classList.toggle("disabled");
    });
}


// Om matching är True, öka matches, annars vänd tillbaka korten efter 1.5 sekunder. När matches når 12, alerta och ladda om
function gamePlay(img, clicks) {
    if (isItMatching(img)) {
        matches++;
        disableMatch(img);
    } else {
        setTimeout(() => flipBackCards(img), 1500);
    }
    if (matches === 12) {
        alert(
            `You needed ${clicks} clicks. The lower, the better. \n Game reloading in 3 seconds!`
        );
        setTimeout(() => location.reload(), 3000);
    }
}

// Prototypes
Game.prototype.match = function (className) {
    const card = document.querySelectorAll(className);
    let clicks = 0;
    let cards = [];

    card.forEach((c) => {
        // Lägger till img src & div id till array vid varje klickning, när array innehåller två, skicka vidare och rensa array
        c.addEventListener("click", (e) => {
            e.target.classList.toggle("hide");
            if (e.target.src != undefined) {
                cards.push(e);
            }

            if (cards.length === 2) {
                gamePlay(cards, clicks);
                cards = [];
                clicks++;
                scoreCounter(clicks);
            }
        });
    });
};

//Vi skickar ut Game functions till Main.js
export { Game };
