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
  player_sequence = [];
}

function play_sequence() {
  for (var i = 0; i < level + 1; i++) {
    play_sound(sequence[i]);
    animate_button(sequence[i]);
  }
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
  console.log('keyup detected ' + key);
  console.log(is_listening);
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
  play_sound(b_index - 1);
  animate_button(b_index - 1);
  player_sequence.push(b_index);
  if (player_sequence[player_sequence.length - 1] !=
    sequence[player_sequence.length - 1]) {
    wrong_response();
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
  console.log('hello');
  $(buttons[index]).fadeOut(100);
  $(buttons[index]).fadeIn(100);
}



function play_sound(index) {
  var sound = new Audio(sound_urls[index]);
  sound.play();
}


window.onload = function() {
  is_listening = true;
};