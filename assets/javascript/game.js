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



var wordCollection = ['kingdom', 'arrow', 'stone', 'riddle', 'cracker', 'gold', 'subjects', 'queen', 'king', 'discovery', 'sabotage', 'dungeon', 'gold', 'victory', 'sword', 'castle', 'horses', 'knight', 'princess', 'royalty', 'moat', 'wars'];
var path = 'assets/images/';
var levels = [1, 2, 3, 4];
var levelBackgrounds = ['level_', 'star_game.jpg', 'game_over.jpg', 'empty_sign.png'];
var validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const STARTING_LIVES = 4;
var letterTile = '<img class="slider closed" src="' + path + '/signs/letter_title.png" >';

// String Messages this way it makes it easier to change the text
const HOW_TO_PLAY_MESSAGE = 'Using the keyboard, select any letter from a - z';
const YES = "Yes";
const NO = "No";
const NO_KEY = "No Key Pressed";

var WordGame = function () {
    return {
        lastKeyPressed: function () {
            return this.lastkey ? this.lastkey : NO_KEY;
        },
        currentWord: [],
        lastkey: "",
        howManyLettersLeft: function () {
            var count = 0;
            this.currentWord.forEach(function (letter) {
                if (letter != ' ') {
                    count++;
                }
            });

            return count;

        },
        guessesLeft: 0,
        incorrectLettersGuessed: [],
        correctLettersGuessed: [],
        showLetters: function (positions) {
            for (var i = 0; i < positions.length; i++) {
                var letter = positions[i][1];
                var index = positions[i][0];
                var tileId = "letter_" + index;
                //get the blank tile and replace with the correct letter
                var blankTile = document.getElementById(tileId);
                blankTile.textContent = letter;
            }
        },
        guessLetter: function (letter) { // this function checks to see if the letter picked was right
            var positions = [];
            this.lastKeyPressed = letter;
            var indx = '';
            var word = this.currentWord;
            for (var i = 0; i < word.length; i++) {

                if (word[i] === letter) {
                    //every letter found clears from current word array so we don't double pick the same letter again
                    this.currentWord[i] = ' ';
                    //then push that position into this so it can be removed visually
                    positions.push([i, letter]);
                }

            }


            if (positions.length) {
                return positions;
            }
            return 0;
        },
        getNewWord: function () {
            // checks for current word. If true stores it for latter access
            if (!this.currentWord) {
                this.previousWords.push(this.currentWord.toString());
            }
            //randomly chooses a word from the word list
            do {
                var newWord = this.words[Math.floor(Math.random() * this.words.length) - 1];
            } while (newWord == '')
             //var newWord = this.words[0];
            //splits word up into an array of letters
            this.currentWord = newWord.split('');
            //removes the word from the list so we dont use it agian
            this.words[this.words.indexOf(newWord)] = '';
            //all new words which are new levels, add guesses 
            this.guessesLeft += STARTING_LIVES;
            // array of incorrect guesses for current word
            this.incorrectLettersGuessed = [];
            // array of correct letters guessed
            this.correctLettersGuessed = [];

            //create new wooden tiles for the new word and display them

            var newdivGroup = document.createElement('div');
            newdivGroup.setAttribute('id', 'letterGroup');
            newdivGroup.setAttribute('class', 'col');

            var ll = this.currentWord.length;
            for (var i = 0; i < ll; i++) {

                // var imgTile = document.createElement("img");
                // imgTile.setAttribute('id', 'letter_' + i);
                // imgTile.setAttribute('src', path + 'signs/letter_title.png');
                // var newSpanEle = document.createElement('span');
                // newSpanEle.setAttribute('class', 'letter-tile swing-in');
                // newSpanEle.appendChild(imgTile);
                // newdivGroup.appendChild(newSpanEle);
                
           
                         
                var tilePlaceHolder = document.createElement('span');
                tilePlaceHolder.setAttribute('class', 'tile tile-letter');
                tilePlaceHolder.setAttribute('id', 'letter_' + i);
                tilePlaceHolder.innerText = "_";
                newdivGroup.appendChild(tilePlaceHolder);


            }

            this.sysGetScreenEle('game').innerHTML = newdivGroup.outerHTML;
        },
        isWordsLeft: function () { // check to see if there any words left to play
            var counter = 0;
            for (var i = 0; i < this.words.length; i++) {
                if (this.words[i].length > 0) {
                    counter++;
                }
            }
            return counter ? true : false;
        },
        previousWords: [],
        words: wordCollection,
        length: function () {
            return this.currentWord.length;
        },
        sysGetScreenEle: function (element) { // this object function is used to get and set text/graphics on the users screen
            // this function is intended to be used privately by this object

            //check to see if the name of an alement or the actual
            //element was passed
            if (typeof (element) === 'string') {
                return document.getElementById(element);
            } else if (typeof (element) === 'object') {
                return element;
            }


        },
        sysAlertIconImage: function (iconPath) {
            alertIconImage.setAttribute('src', iconPath ? iconPath : 'assets/images/icons/scroll.png');
        },
        PrintScore: function (score) {
            this.sysGetScreenEle('wins').innerText = score;
        },
        PrintGuessesLeft: function (guesses) {
            this.sysGetScreenEle('guessesleft').innerText = guesses;
        },
        Printlevel: function (level) {
            this.sysGetScreenEle('level').innerText = level;
        },
        PlayerAlertShow: function (message, icon, title = 'System Message') {

            this.sysGetScreenEle('alertMessage').innerText = message;
            this.sysGetScreenEle('alertTitle').innerText = title;
            var iconImgePath = '';
            switch (icon) {
                case 'scroll':
                    iconImgePath = 'assets/images/icons/scroll.png';
                    break;
                case 'magnify':
                    iconImgePath = 'assets/images/icons/magnify.png';
                    break;
                case 'key':
                    iconImgePath = 'assets/images/icons/key.png';
                    break;
                default:
                    iconImgePath = 'assets/images/icons/scroll.png';
                    break;
            }
            this.sysAlertIconImage(iconImgePath);
            this.sysGetScreenEle('alertbox').style.display = "block";
        },
        PlayerAlertHide: function () {
            this.sysGetScreenEle('alertMessage').innerText = '';
            this.sysGetScreenEle('alertTitle').innerText = '';
            this.sysGetScreenEle('alertbox').style.display = "none";
        },
        RefreshScreen: function () {
            this.PrintScore(this.won);
            this.PrintGuessesLeft(this.guessesLeft);
            this.Printlevel(this.level);
            this.PlayerAlertHide();


        },
        GameOver: function () {
            // TODO Create a better game over
            this.PlayerAlertShow("Game Over!", 'scroll', "No More Guesses Left");
        },
        name: 'Player One',
        won: 0,
        level: 1,
        subCounter:0,
        isWordComplete: function () {
            return this.howManyLettersLeft == 0 ? true : false;
        },
        clearScreen: function () {
            this.PlayerAlertHide();
            this.sysGetScreenEle('title').style.color = 'white';
            this.sysGetScreenEle('game').style.display = "block";

        },
        LoadStartScreen: function () {
            this.sysGetScreenEle('startingup').style.display = "none";
            this.sysGetScreenEle('game_window').style.display = "block";
            this.sysGetScreenEle('game').style.display = "block";
            this.sysGetScreenEle('game').innerText = "";

        },
        yesLetter: function (letter) {
            //TODO DISPLAY WHEN LETTER WAS FOUND
            //this.animate(letter);
            return true;
        },
        noLetter: function (letter) {
            //TODO DISPLAY WHEN LETTER WAS NOT FOUND
            // this.animate(letter);
            return true;
        }
    };
};

//Creat a n istance of the game object
var word_game = new WordGame();
// hide loader
document.getElementById('loader').style.display = "none";
// Starup Screen button event listener, fires the startgame() function
document.getElementById('start').addEventListener('click', startgame);


function startgame() {
    //clear scores, get everything ready to play
    initialize();
    word_game.sysGetScreenEle('title').innerText = HOW_TO_PLAY_MESSAGE;
    document.getElementById('lettersUI').addEventListener("click", toggleLetters);
    word_game.RefreshScreen();
        listenForKey();
        
    
}
function toggleLetters(event){
    event.preventDefault();
    var lettersU =  document.getElementById('lettersUsed');
    var boxarea = document.getElementsByClassName('letters-col')[0];
    if(lettersU.style.display == 'none'){
        lettersU.style.display = 'block';
        boxarea.style.backgroundColor = "#ffffff80";
        boxarea.style.boxShadow  = "inset 0px 0px 11px 3px #030303ab";

    }else{
         lettersU.style.display = "none";
         boxarea.style.backgroundColor = "#ffffff00";
         boxarea.style.boxShadow  = "none";
    }
   
}


function listenForKey() {
   
    document.addEventListener('keyup', function (event) {

        var keypressed = event.key.toLowerCase();
        var iskeyValid = false;
        //see if letter is in word
        
        for (var i = 0; i < validKeys.length; ++i) {

            if (validKeys[i] === keypressed) {
                iskeyValid = true;

            }
        }
        if (iskeyValid) {
            letterPositions = word_game.guessLetter(keypressed);
             //add and display letter user is guessing
                var letterchild = document.createElement("span");
                var lettersused = document.getElementById('lettersUsed');
                letterchild.innerText = keypressed.toLocaleUpperCase();
                // if letter is correct color it green
                // if incorrect color it red
                if (letterPositions) {
                    letterchild.setAttribute('class', 'fill-yes used');
                    word_game.score++
                    word_game.showLetters(letterPositions);
                } else {
                    letterchild.setAttribute('class', 'fill-no used');
                    word_game.incorrectLettersGuessed.push(keypressed);
                    word_game.guessesLeft--;
                }
                lettersused.appendChild(letterchild);
            word_game.RefreshScreen();
            
            //Checking to see if used up all guesses
            if (word_game.guessesLeft == 0) {
                //TODO GAME OVER
                // word_game.GameOver();
                word_game.GameOver();
            }
            
            if (word_game.isWordComplete()) {
                // 2 words guess brings you to the next level
                word_game.won++;
                if (word_game.subCounter == 2) {
                    word_game.subCounter = 0;
                    word_game.level++;
                    var filename = "assets/images/levels/level_" + word_game.level + ".jpg";
                    document.getElementById('game_window').style.backgroundImage = filename;
                } else {
                    word_game.subCounter++
                }
                if (!word_game.isWordsLeft()) {
                    //TODO YOU BEAT THE GAME
                    stop();
                }
               
            }

        }
    });
   
}


function initialize() {
    word_game.LoadStartScreen();
    word_game.clearScreen();
    word_game.getNewWord();
}