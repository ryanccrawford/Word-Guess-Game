// Choose a theme for your game! In the demo, we picked an 80s theme: 80s questions, 80s sound and an 80s aesthetic.You can choose any subject for your theme, though, so be creative!
// Use key events to listen for the letters that your players will type.
// Display the following on the page:
// Press any key to get started!
// Wins: (# of times user guessed the word correctly).
// If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _.
// As the user guesses the correct letters, reveal them: m a d o _ _ a.
// Number of Guesses Remaining: (# of guesses remaining for the user).
// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
// After the user wins / loses the game should automatically choose another word and make the user play it.


var wordCollection = ['delightful', 'survive', 'gleaming', 'existence', 'charming', 'blossom', 'juice', 'riddle', 'cracker', 'consider', 'fling', 'premium', 'material', 'collect', 'hypnotize', 'calculator', 'popcorn', 'discover', 'sabotage', 'announce', 'economic', 'conspire', 'preserve', 'knowledge', 'scandalous', 'punishment', 'breakfast', 'interesting', 'goldfish', 'amused', 'railway', 'addition'];
var path = 'assets/images/';
var levels = [1,2,3,4];
var levelBackgrounds = ['level_', 'star_game.jpg', 'game_over.jpg', 'empty_sign.png'];
var validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const STARTING_LIVES = 8;
var letterTile = '<img class="slider closed" src="' + path + '/signs/letter_title.png" >';

var WordGame = {
    lastKeyPressed: function () {
        return getLastKey();
    },
    currentWord: [],
    howManyLettersLeft: function () { },
    guessesLeft: STARTING_LIVES,
    incorrectLettersGuessed: [],
    correctLettersGuessed: [],
    showLetters: function (positions){
        for(var i = 0; i < positions.length; i++){
            var letter = positions[i][1];
            var index = positions[i][0];
            var titleId = "letter_"+index;
            var newImage = path + "letters/letter_" + letter.toUpperCase() +".png";
            var imgTile = document.createElement("img");
            imgTile.setAttribute('id', 'shownletter_' + i );
           
            imgTile.setAttribute('class', 'slider' );
            imgTile.setAttribute('src', newImage );
            var el = document.getElementById(titleId);
            el.parentNode.replaceChild(imgTile, el);
        }
    },
    guessLetter: function (letter) {
        var positions = [];

        this.currentWord.forEach(function (l, index) {
            if (l === letter) {
                positions.push([index , letter]);
            }
        });
        if (positions.length) {
            return positions;
        }

        return 0;
    },
    getNewWord: function () {
        if (!this.currentWord) {
            this.previousWords.push(this.currentWord.toString());
        }
        if (!this.isWordsLeft()) {
            //game is over
            stop();
        }
        var newWord = this.words[Math.floor(Math.random() * this.words.length) - 1];
        this.currentWord = newWord.split('');
        this.words[this.words.indexOf(newWord)] = '';
        this.guessesLeft = STARTING_LIVES;
        this.howManyLettersLeft = this.currentWord.length;
        this.incorrectLettersGuessed = 0;
        this.correctLettersGuessed = 0;
        return this.currentWord;
    },
    isWordsLeft: function () {
        return this.words.length ? true : false;
    },
    previousWords: [],
    words: wordCollection,
    length: function () {
        return this.currentWord.length;
    }
}

var SystemInfo = {
    startMessage: 'Press any key to get started',
    images: levelBackgrounds,
    imagePath: path
};
var Player = {
    name: 'Player One',
    wins: 0
};

var word_game = WordGame;

function startgame() {
    
    var letters = word_game.getNewWord();



    document.getElementById('game').innerHTML = "";
    var game_area = "<div id='letterGroup'>";
    var ll = letters.length;
    for (let i = 0; i < ll; i++) {
        
        var imgTile = document.createElement("img");
        imgTile.setAttribute('id', 'letter_' + i );
       
        imgTile.setAttribute('class', 'slider closed' );
        imgTile.setAttribute('src', path + '/signs/letter_title.png' );

        game_area += '<span class="letter-tile">'+imgTile.outerHTML+'</span>';
    }
    game_area += "</div>";
    document.getElementById('title').innerText = "Using the keyboard, select any letter from a - z";
    document.getElementById('game').innerHTML = game_area;
    // for(let i = 0; i < ll; i++){
    //     var select = 'letter_'+i;
      
    // }
    var titles = document.querySelectorAll('#letterGroup .slider');
    var docElemStyle = document.documentElement.style;
    var transitionProp = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
    startTileDrop();

   function startTileDrop() {
        for ( let i=0; i < ll; i++ ) {
          var tile = titles[i];
          tile.style[ transitionProp + 'Delay' ] = ( i * 150) + 'ms';
          tile.classList.toggle('closed');
        }
    }
      


    document.addEventListener('keyup', function (event) {

        var keypressed = event.key.toLowerCase();
        var iskeyValid = false;
        for (var i = 0; i < validKeys.length; ++i) {

            if (validKeys[i] === keypressed) {
                iskeyValid = true;
                console.log('you pressed ' + keypressed)
                break;
            } else {

                continue;
            }

        }
            letterPositions = word_game.guessLetter(keypressed);
        if (letterPositions) {
            word_game.showLetters(letterPositions);
           // word_game.correctLettersGuessed.push(keypressed);

            console.log('correct letter guessed');
        } else {
            word_game.incorrectLettersGuessed.push(keypressed);
            if(!(--word_game.guessesLeft !== 0)){
                //TODO GAME OVER
            }
            
            console.log('incorrect letter guessed');
        }

    });






}

document.getElementById('start').addEventListener('click', startgame);