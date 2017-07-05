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
}

var anim_index = 0;
function play_sequence() {
  for (var i = 0; i < level + 1; i++) {
    console.log('played seq value : ' + sequence[i]);
    anim_index = sequence[i];
    /*window.setTimeout(animate_comp_button, 1000);
    */(function(i) {
      setTimeout(function() {
        animate_button(sequence[i]);
        console.log(Date.now());
      }, 1000 * i);
    })(i);
  }
  setTimeout(make_listening, 2000);
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   
   if (is_listening === true) {
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
    setTimeout(next_level, 1000);
  }
}

function wrong_response() {
  not_listening();
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
  $(buttons[ind]).fadeOut(200);
  $(buttons[ind]).fadeIn(200);
}

function animate_comp_button() {
  var ind = anim_index - 1;
  console.log('animated index: ' + ind);
  var sound = new Audio(sound_urls[ind]);
  sound.play();
  $(buttons[ind]).fadeOut(200);
  $(buttons[ind]).fadeIn(200);
}

function make_listening() {
  is_listening = true;
}

function not_listening() {
  is_listening = false;
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