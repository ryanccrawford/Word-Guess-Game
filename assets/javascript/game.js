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
    howManyLettersLeft: function () {
        var count = 0;
        this.currentWord.forEach( function(letter){
            if(letter != ' '){
                count++;
            }
        });

        return count;

     },
    guessesLeft: STARTING_LIVES,
    incorrectLettersGuessed: [],
    correctLettersGuessed: [],
    showLetters: function (positions){
        for(var i = 0; i < positions.length; i++){
            var letter = positions[i][1];
            var index = positions[i][0];
            var tileId = "letter_"+index;
            var newImage = path + "letters/letter_" + letter.toUpperCase() +".png";
            var imgTile = document.createElement("img");
            imgTile.setAttribute('id', 'shownletter_' + i );
           
            imgTile.setAttribute('class', 'slider' );
            imgTile.setAttribute('src', newImage );
            var el = document.getElementById(tileId);
            el.parentNode.replaceChild(imgTile, el);
        }
    },
    guessLetter: function (letter) {
        var positions = [];
        
        var indx = '';
        
        this.currentWord.forEach(function (l, index) {
            if (l === letter) {
                indx = index;
                this.currentWord[indx] = ' ';
                        
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
        this.incorrectLettersGuessed = [];
        this.correctLettersGuessed = [];
        return this.currentWord;
    },
    isWordsLeft: function () {
        return this.words.length ? true : false;
    },
    previousWords: [],
    words: wordCollection,
    length: function () {
        return this.currentWord.length;
    },
    sysGetScreenEle: function(element){// this object function is used to get and set text/graphics on the users screen
        // this function is intended to be used privately by this object

        //check to see if the name of an alement or the actual
        //element was passed
        if(typeof(element) === 'string'){
            return document.getElementById(element);
        }else if(typeof(element) === 'object'){
            return element;
        }
         

    },
    sysAlertIconImage: function (iconPath){
        alertIconImage.setAttribute('src',iconPath?iconPath:'assets\images\icons\scroll.png');
    },
    PrintScore:function(score){
        this.sysGetScreenEle('wins').innerText = score;
    },
    PrintGuessesLeft:function(guesses){
        this.sysGetScreenEle('guessesleft').innerText = guesses;
    },
    Printlevel:function(level){
        this.sysGetScreenEle('level').innerText = level;
    },
    PlayerAlertShow: function(message, icon, title ='System Message'){
        
        this.sysGetScreenEle('alertMessage').innerText = message;
        this.sysGetScreenEle('alertTitle').innerText = title;
        var iconImgePath = '';
        switch (icon){
            case 'scroll':
            iconImgePath = 'assets/mages/icons/scroll.png';
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
    PlayerAlertHide: function(){
        this.sysGetScreenEle('alertMessage').innerText = '';
        this.sysGetScreenEle('alertTitle').innerText = '';
        var iconImgePath = '';
        this.sysGetScreenEle('alertbox').style.display = "none";
    },
    RefreshScreen: function(){
        this.PrintScore(Player.score);
        this.PrintGuessesLeft(Player.lives);
        this.Printlevel(Player.level);
        this.PlayerAlertHide();


    },
    GameOver: function(){
        //TODO GAME OVER
    }
    

}

var SystemInfo = {
    startMessage: 'Press any key to get started',
    images: levelBackgrounds,
    imagePath: path
};
var Player = {
    name: 'Player One',
    score: 0,
    lives: 0,
    level: 0,

};

var word_game = WordGame;
var player = Player;
var systemInfo = SystemInfo;


function startgame() {
    
    var letters = word_game.getNewWord();
    document.getElementById('startingup').style.display = "none";
    document.getElementById('game_window').style.display = "block";
    document.getElementById('game').style.display = "block";
    document.getElementById('game').innerText = "";
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
    document.getElementById('title').style.color = 'white';
    document.getElementById('game').innerHTML = game_area;
    
    var titles = document.querySelectorAll('#letterGroup .slider');
    var docElemStyle = document.documentElement.style;
    var transitionProp = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';

    document.getElementById('game').style.display = "block";
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
        if(iskeyValid){
                  
            letterPositions = word_game.guessLetter(keypressed);
                if (letterPositions) {
                    word_game.showLetters(letterPositions);
                    player.score++;
                    console.log('correct letter guessed');
                } else {
                    word_game.incorrectLettersGuessed.push(keypressed);
                    word_game.guessesLeft--;
                    Player.lives = word_game.guessesLeft;
                    console.log('incorrect letter guessed');
                }

                word_game.RefreshScreen();

                if(Player.lives == 0){
                    //TODO GAME OVER
                    // word_game.GameOver();
                }
                if(word_game.howManyLettersLeft() == 0){
                     //TODO GAME OVER
                    // word_game.GameOver();
                }
                
            

        }
    });






}

document.getElementById('loader').style.display = "none";


document.getElementById('start').addEventListener('click', startgame);