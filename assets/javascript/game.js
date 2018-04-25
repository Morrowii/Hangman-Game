// Under Construction: 1. Restrict guesses to letters. 2. Prevent repeat guesses. 3. Stop game after last word. 4. Style the page. 5. Annotate code. 6. Clean up code.

var round = 0;
var wins = 0;
var lives = 6;
var playArea = "";
var guesses = "";
var winsElement = document.getElementById("wins");
var livesElement = document.getElementById("lives");
var playAreaElement = document.getElementById("playArea");
var guessesElement = document.getElementById("guesses");
var guess;
var newGame = true;

var hangman = {

    wordList : ["castle", "magic", "dungeon", "dragon", "kingdom", "shield", "knight", "sword", "staff", "battle", "wizard"],
    wordSplit : [],          
    temp : [],                             
    match : 0,
    
    newRound : function() {
        lives = 6;                                                  // Resets lives at the start of each round.
        livesElement.textContent = lives.toString();                // Passes lives to the html document.
        guesses = "";                                               // Resets guesses at the start of each round.
        guessesElement.textContent = guesses;                       // Passes guesses to the html document.
        hangman.temp = [];                                          // Resets correct guesses at the start of each round.
        hangman.wordSplit = hangman.wordList[round].split("");      // Selects and splits a new word into an array its letters.
        playArea = "";                                              // Resets the play area at the start of each round.
        for (i = 0; i < hangman.wordSplit.length; i++) {            // Generates blanks for each letter of the selected word.
            playArea += " _ ";
        }
        playAreaElement.textContent = playArea;                     // Passes playArea to the html document.
    },

    updateRound : function() {
        hangman.match = 0;                                          // Resets the number of matches for the current guess.
        playArea = "";                                              // Resets playArea.
        for (i = 0; i < hangman.wordSplit.length; i++) {            // Records letters if they match the guess or blanks if they don't.
            if (guess === hangman.wordSplit[i]) {
                hangman.temp[i] = hangman.wordSplit[i];
                hangman.match += 1;
            }
            else if (guess !== hangman.wordSplit[i] && hangman.temp[i] !== hangman.wordSplit[i]) {
                hangman.temp[i] = "_";
            }
        }
        for (i = 0; i < hangman.temp.length; i++) {                 // Joins the array of remaining blanks and correctly guessed letters and passes it to playArea.
            playArea += (" " + hangman.temp[i] + " ");
        }
        playAreaElement.textContent = playArea;                     // Passes playArea to the html document.
        
        if (hangman.match === 0) {                                  // Subtracts a life if the guess had no matches.
            lives -= 1;
            livesElement.textContent = lives.toString();            // Passes lives to the html document.
        }
        guesses += " " + guess + " ";                               // Adds the current guess to a list of guesses.
        guessesElement.textContent = guesses;                       // Passes guesses to the html document.
    },

    checkWinLose : function() {
        if (playArea.replace(/\s+/g, '') === hangman.wordList[round]) {
            wins += 1;                                              // Adds a win if the guessed word matches the current word.
            winsElement.textContent = wins.toString();              // Passes wins to the html document.
            round += 1;                                             // Advances the round by 1.
            hangman.newRound();                                     // Automatically starts the next round when the current round ends.
        }
        else if (lives === 0) {
            round += 1;                                             // ""
            hangman.newRound();                                     // ""
        }
    },

}

document.onkeyup = function() {                                     // Calls functions on key up.
    if (newGame === true) {                                         // First key up starts the game.
        hangman.newRound();
        newGame = false;
    }
    else if (newGame === false) {                                   // Subsequent key ups play the game.
        guess = event.key;
        hangman.updateRound();
        hangman.checkWinLose();
    }
}