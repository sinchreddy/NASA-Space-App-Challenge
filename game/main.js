
let vars = {
    firstSelect: "null", 
    secondSelect: "null", 
    clicks: 0, 
    matches: 0, 
    curCards: [], 
    min: 5, 
    cardImages: ["images/jelly.jpg", "images/octo.jpg", "images/putter.jpeg", "images/seahorse.jpg", "images/shark.jpg", "images/shell.jpeg", "images/star.jpeg", "images/whale.jpg", 
                "images/jelly.jpg", "images/octo.jpg", "images/putter.jpeg", "images/seahorse.jpg", "images/shark.jpg", "images/shell.jpeg", "images/star.jpeg", "images/whale.jpg"]
};

const domSelect = {
    cards: document.querySelectorAll(".card"), 
    timer: document.getElementById("time-left"), 
    matches: document.getElementById("matches"), 
    directions: document.getElementById("directions"), 
    resetButton: document.getElementById("play-again") 
};

shuffleId(vars.cardImages); 
setCards(); 

domSelect.cards.forEach(function(card) { 
    card.addEventListener('click', function clickCard() { 
        if ((vars.curCards.includes(card.firstElementChild.id) === false) && 
                (vars.curCards.length < 2)) { 
            card.classList.toggle('flipped'); 
            vars.clicks = vars.clicks + 1 
            vars.curCards.push(card.firstElementChild.id); 
            if (vars.clicks % 2 === 0) { 
                vars.secondSelect = card.firstElementChild.innerHTML; 
                checkMatch();
            } else {
                vars.firstSelect = card.firstElementChild.innerHTML; 
            };
            if (vars.clicks === 1) {gameTimer()}; 
        };
    });
});

function checkMatch () { 
    if (vars.firstSelect === vars.secondSelect) { 
        vars.matches = vars.matches + 1; 
        domSelect.matches.innerHTML = ("Matches: " + vars.matches); 
    } else {
        setTimeout (function () { 
            vars.curCards.forEach(function(card) { 
                let currentCard = document.getElementById(card);
                currentCard.parentElement.classList.toggle("flipped");
            })
    }, 900);
    };
    vars.firstSelect = "null"; 
    vars.secondSelect = "null";
    setTimeout(function(){vars.curCards = []}, 901); 
};

function shuffleId(array) { 
    let currentId = array.length;
    let randomId;
    while (currentId != 0) { 
        randomId = Math.floor(Math.random() * currentId); 
        currentId--; 
        [array[currentId], array[randomId]] = [ 
        array[randomId], array[currentId]];
    }
    return array;
};

function setCards () {  
    for (let i = 0; i < 16; i++) {
        const img = document.createElement("img"); 
        img.src = vars.cardImages[i]; 
        document.getElementById(i).appendChild(img); 
        };
};

function gameTimer() { 
    let time = vars.min * 60; 
    let myInterval = setInterval(timer, 1000); 
    function timer() {
        let minutes = Math.floor(time / 60); 
        let seconds = time % 60; 
        if (seconds < 10) {seconds = "0" + seconds}; 
        if (time === 0) { 
            clearInterval(myInterval); 
            domSelect.directions.innerHTML = "Time is up, you lost";
            document.querySelector(".score-board").style.backgroundColor = "#ffcdd2";
        };
        if (vars.matches === 8) { 
            clearInterval(myInterval);
            playerWin(domSelect.directions);
        };
        domSelect.timer.innerHTML = ("Time Left: " + minutes + ":" + seconds);
        time--; 
    };
};

function playerWin(element) { 
    element.innerHTML = "Congratulations, you won!";
    element.style.textTransform = "uppercase";
    element.classList.add("wiggle"); 
};

domSelect.resetButton.addEventListener("click", function() { 
    location.reload();
});