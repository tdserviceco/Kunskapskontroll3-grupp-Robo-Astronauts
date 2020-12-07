function Game(apiKey) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=nature&media=photos&per_page=12&page=1&format=json&nojsoncallback=1`;
  let images = [[], []];

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < 12; i++) {
        images[0][i] = data.photos.photo[i];
        images[1][i] = data.photos.photo[i];
      }
      imageGeneration(images);
    });

  //Från Prototype
  this.match(".card");
}

function imageGeneration(images) {
  // återställer score vid laddning av kort
  document.querySelector(".score-board").textContent = 0 + " Clicks";

  let allCards = document.querySelectorAll(".card");
  // Lägger till IMG element tagg till .card klassen.
  for (let i = 0; i < 24; i++) {
    let img = document.createElement("img");
    allCards[i].appendChild(img);
    img.classList.add("hide");
  }

  let allImg = document.querySelectorAll("img");

  // Loopa igenom 2ggr och sedan spotta ut 24 bilder pga vi hämtar 12st och sparar ner de i en array
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 12; j++) {
      let id = images[i][j].id;
      let secret = images[i][j].secret;
      let server = images[i][j].server;
      let size = "q";

      let result = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;

      allImg[j].src = result;
      allImg[j + 12].src = result;
    }
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

let matches = 0;
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
