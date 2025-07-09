window.onload = function(){
  //assign all event handlers here
  const playGamebtn = document.querySelector('.play-game-btn');
  playGamebtn.event = playGame;
}
 //wrap the whole script inside this anymous function to avoid global variable conflicts with other script files.
  words = ['next', 'sneeze', 'breath', 'guard', 'nebulous', 'fascinated', 'join', 'dad', 'nutritious', 'cautious', 'society', 'pink', 'plate', 'rotten', 'own', 'weigh', 'hellish', 'numerous', 'part', 'wild', 'thunder', 'pen', 'grin', 'pause', 'tranquil', 'quiet', 'flash', 'deafening', 'share', 'expert', 'squash', 'mend', 'automatic', 'team', 'science'];
    let currentWord = getRandom(); // get a random word

    function checkResponse() {
      //get the user's guess and check if it exists in the given word
      //word = getRandom();
      let userGuess = document.querySelector('.user-guess');
      //word = word.toLowerCase();
      userGuess = userGuess.value.toLowerCase();
      console.log(userGuess);

      if(currentWord.includes(userGuess)){
        // replace the bar with the letter in the exact position in the given word.
        console.log(userGuess);
        //get the bars
        const bars = document.querySelector('.blank-word');
        let barsText = bars.innerText;
        //get the first index of the guessed letter in word
        let firstOccurance = currentWord.indexOf(userGuess);
        console.log(firstOccurance);
        let barsArray = barsText.split(" ");
        barsArray.splice(firstOccurance, 1, userGuess);
        // barsArray[firstOccurance] = userGuess;

        bars.innerHTML = barsArray.join(" ");
        console.log(currentWord);

      }else{
        //display the next picture of hangman

      }
      
    }

    function newGame(){
      //generates a new random word and update the bars.
      //reset the hangman gif to the initial state
      //clears the text area
      if(confirm("Are you sure you wanna play a new game?")){
        const innitialGIF = document.querySelector('.hang-man');
        innitialGIF.src = "hangman-pictures/Screenshot 2025-07-04 at 11.49.45 PM.png";
        currentWord = getRandom(); //get a new random word
        playGame();
      }
    }
    function getRandom(){
      //generates a random word
      maxNum = words.length - 1;
      index = Math.floor(Math.random() * maxNum);
      return words[index];
    }

    function playGame(){
      //picks a random word
      //generates the bars
      //wordAtIndex = getRandom();
      numBars = currentWord.length;

      let bars = document.querySelector('.blank-word');
      barString = '';
      for(let i=1; i<=numBars; i++){
        barString += ' -'
      }
      bars.innerHTML = barString;


    }