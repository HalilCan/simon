var listening = false;

var sound_urls = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 
'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 
'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 
'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

var buttons = document.getElementsByClassName('simon-button');

/* due to how getElementsByClassName works, buttons are:
  1
2   3
  4  */

function generate_sequence() {
  var seq = [];
  while (seq.length < 20) {
    seq.push(Math.floor(Math.random()*4 + 1));
  }
  return seq;
}

function start_game () {
  var sequence = generate_sequence();
  start_level(0, sequence);
}

function start_level (level, sequence) {
  play_sequence(level, sequence);
  var is_strict = check_strict();
  start_listening (is_strict, level, sequence);
}

function play_sequence(level, sequence) {
  for (var i = 0; i < level + 1; i++) {
    play_sound(sequence[i]);
    animate_button(sequence[i]);
  }
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   if (listening) {
    if (key == 38) { //check the codes
      button_press(1);
    } else if (key == 39) { 
      button_press(3);
    } else if (key == 40) {
      button_press(4);
    } else if (key == 41) { 
      button_press(2);
    }
   }
}

function button_press(b_index) {

}


function play_sound(index) {
  var sound = new Audio(sound_urls[index]);
  sound.play();
}


/*window.onload = function() {
  console.log(generate_sequence());
}*/