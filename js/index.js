var listening = false;

var sound_urls = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 
'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 
'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 
'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

var buttons = document.getElementsByClassName('simon-button');
var sequence = [];
var player_sequence = [];
var level = 0;
var is_strict = false;
var is_listening = false;

/* due to how getElementsByClassName works, buttons are:
  1
2   3
  4  */

function generate_sequence() {
  while (sequence.length < 20) {
    sequence.push(Math.floor(Math.random()*4 + 1));
  }
}

function start_game () {
  generate_sequence();
  start_level();
}

function start_level () {
  play_sequence();
  is_listening = true;
}

function play_sequence() {
  for (var i = 0; i < level + 1; i++) {
    console.log('played seq value : ' + sequence[i]);
    //window.setTimeout(function (i) {animate_button(sequence[i]);}, 0)(i);
    (function(i) {
      setTimeout(function() {
        animate_button(sequence[i]);
        console.log(Date.now());
      }, 1000);
    })(i);
  }
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   
   if (is_listening) {
    if (key === 38) { //check the codes
      button_press(1);
    } else if (key === 39) {
      button_press(3);
    } else if (key === 40) {
      button_press(4);
    } else if (key === 37) {
      button_press(2);
    }
   }
};

function button_press(b_index) {
  animate_button(b_index);
  
  player_sequence.push(b_index);
  
  console.log('player seq= ' + player_sequence);
  console.log('ai seq= ' + sequence);
  
  if (player_sequence[player_sequence.length - 1] !==
    sequence[player_sequence.length - 1]) {
    console.log('wrong! you answered ' + player_sequence[player_sequence.length - 1] + 'but it should be ' + sequence[player_sequence.length - 1]);
    wrong_response();
  } else if (player_sequence.length === level + 1 && player_sequence[level] ===
  sequence[level]) {
    console.log('next_level, past level = ' + level);
    setTimeout(next_level, 0);
  }
}

function wrong_response() {
  //change display property of notification messages
  if (is_strict) {
    restart_game();
  } else {
    restart_level();
  }
}

function animate_button(index) {
  var ind = index - 1;
  console.log('animated index: ' + ind);
  var sound = new Audio(sound_urls[ind]);
  sound.play();
  $(buttons[ind]).delay(1000).fadeOut(200);
  $(buttons[ind]).delay(1000).fadeIn(200);
}

function toggle_listening() {
  is_listening = !is_listening;
}

function restart_level () {
  player_sequence = [];
  start_level();
}

function next_level () {
  player_sequence = [];
  level += 1;
  start_level();
  //add upper limit
}

function restart_game () {
  player_sequence = [];
  start_game();
}

window.onload = function() {
  start_game();
};