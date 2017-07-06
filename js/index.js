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

var curr_lvl = document.getElementById('current-level');
var casual_button = document.getElementById('casual-strict-button');
var seq_len_disp = document.getElementById('seq-length');
var restart_level_button = document.getElementById('restart-button');

var modes = ['Casual', 'Strict'];

/* due to how getElementsByClassName works, buttons are:
  1
2   3
  4  */

casual_button.onclick = function () {
  toggle_game_mode();
};

restart_level_button.onclick = function () {
  restart_level();
};

function toggle_game_mode() {
  console.log('togg');
  is_strict = !is_strict;
  if (is_strict) {
    casual_button.innerHTML = ('Strict');
  } else {
    casual_button.innerHTML = ('Casual');
  }
}

//Generate the current game's entire 20-character
//sequence to be played incrementally each level
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
  render_seq_len();
  render_cur_lvl();
  play_sequence();
}


//Play the current level's sequence, cycle through the generated seq. and
//pass the button indexes to animate_button. Used a timeOut with *i modifier
//to animate in correct order with equal delays.
var anim_index = 0;
function play_sequence() {
  not_listening();
  for (var i = 0; i < level + 1; i++) {
    anim_index = sequence[i];
    /*window.setTimeout(animate_comp_button, 1000);
    */(function(i) {
      setTimeout(function() {
        animate_button(sequence[i]);
      }, 600 * i);
    })(i);
  }
  is_listening = false;
  setTimeout(make_listening, 600*(level + 1));
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

//When one of the arrow keys are pressed and the player is allowed to input keys
//(is_listening), compare the key's value according to the chart above to
//the value of the current element in the generated sequence up to curr [level]
function button_press(b_index) {
  animate_button(b_index);
  
  player_sequence.push(b_index);
  
  if (player_sequence[player_sequence.length - 1] !==
    sequence[player_sequence.length - 1]) {
    wrong_response();
  } else if (player_sequence.length === level + 1 && player_sequence[level] ===
  sequence[level]) {
    not_listening();
    setTimeout(next_level, 1000);
  }
  render_seq_len();
}

function render_seq_len () {
  seq_len_disp.innerHTML = (player_sequence.length);
}

function render_cur_lvl () {
  curr_lvl.innerHTML = ('Level ' + (level + 1));
}

function wrong_response() {
  not_listening();
  alert('Simon says No!');
  //change display property of notification messages
  if (is_strict) {
    restart_game();
  } else {
    restart_level();
  }
}

function animate_button(index) {
  var ind = index - 1;
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
  if (level < 19) {
    player_sequence = [];
    level += 1;
    start_level();
  }
  else {
    alert('Simon says you win!');
    restart_game();
  }
}

function restart_game () {
  player_sequence = [];
  level = 0;
  start_game();
}

window.onload = function() {
  start_game();
};