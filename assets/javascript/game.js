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
var levelBackgrounds = ['level_', 'star_game.jpg', 'game_over.jpg', 'empty_sign.png'];
var validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const STARTING_LIVES = 8;
var WordGame =  {
                 lastKeyPressed: function () {
                                  return getLastKey();
                                 },
                currentWord: [],
                howManyLettersLeft: function () { },
                guessesLeft: STARTING_LIVES,
                incorrectLettersGuessed: [],
                correctLettersGuessed: [],
                guessLetter: function (letter) {
                                                 var positions = [];

                                                this.currentWord.forEach(function (l, index) {
                                                        if (l === letter) {
                                                            positions.push([letter, index]);
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
                var newWord = this.words[Math.floor(Math.random() * this.words.length)-1];
                this.currentWord = newWord.split('');
                this.words[this.words.indexOf(newWord)] = '';
                this.guessesLeft = STARTING_LIVES;
                this.howManyLettersLeft = this.currentWord.length;
                this.incorrectLettersGuessed = 0;
                this.correctLettersGuessed = 0;
                return this.currentWord;
            },
            isWordsLeft: function () {
                return this.words.length ? true : false
            },
            previousWords: [],
            words: wordCollection,
            length: function () {
                return this.currentWord.length
            }
        }

var SystemInfo = {
        startMessage: 'Press any key to get started',
        images: levelBackgrounds,
        imagePath: path
}
var Player = {
            name: 'Player One',
            wins: 0
            }
        


function startgame() {
    var word_game = WordGame;
    var letters = word_game.getNewWord();
  

   
    document.getElementById('game').innerHTML = "";
    var game_area = "<div id='letterGroup'>";
    var ll = letters.length;
    for (var i = 0; i < ll; i++){
        game_area += '<span class="letter-tile" id="letter_' + i + '"></span>';
    }
    game_area += "</div>";
    document.getElementById('title').innerText = "Using the keyboard, select any letter from a - z";
    document.getElementById('game').innerHTML = game_area;
    document.addEventListener('keyup', function (event) {

        var keypressed = event.key.toLowerCase();
        var iskeyValid = false;
        for (var i = 0; i < validKeys.length; ++i){

            if (validKeys[i] === keypressed) {
                iskeyValid = true;
                console.log('you pressed ' + keypressed)
                break;
            } else {
                
                continue;
            }

        }
            
        if (word_game.guessLetter(keypressed)) {
            console.log('correct letter guessed')
        } else {
            console.log('incorrect letter guessed')
        };

        })
        
      


    

}

document.getElementById('start').addEventListener('click', startgame);