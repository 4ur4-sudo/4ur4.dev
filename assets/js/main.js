

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

document.documentElement.onload = function(){
    document.getElementById("loader").style.display = "block";
};

var soundMute = false;

function muteToggle () {
  let button = document.getElementById('mute');
  if (soundMute == false){
    button.firstChild.firstChild.setAttribute('d','M18 23l-9.305-5.998.835-.651 7.47 4.815v-10.65l1-.781v13.265zm0-15.794l5.384-4.206.616.788-23.384 18.264-.616-.788 5.46-4.264h-2.46v-10h5.691l9.309-6v6.206zm-11.26 8.794l1.26-.984v-7.016h-4v8h2.74zm10.26-8.013v-5.153l-8 5.157v6.244l8-6.248z');
  } else {
    button.firstChild.firstChild.setAttribute('d','M15 23l-9.309-6h-5.691v-10h5.691l9.309-6v22zm-9-15.009v8.018l8 5.157v-18.332l-8 5.157zm14.228-4.219c2.327 1.989 3.772 4.942 3.772 8.229 0 3.288-1.445 6.241-3.77 8.229l-.708-.708c2.136-1.791 3.478-4.501 3.478-7.522s-1.342-5.731-3.478-7.522l.706-.706zm-2.929 2.929c1.521 1.257 2.476 3.167 2.476 5.299 0 2.132-.955 4.042-2.476 5.299l-.706-.706c1.331-1.063 2.182-2.729 2.182-4.591 0-1.863-.851-3.529-2.184-4.593l.708-.708zm-12.299 1.299h-4v8h4v-8z');
  }
  soundMute = !soundMute;
}

window.onload = function(){
    //hide loading screen
    document.getElementById("loader").style.display = "none";

    //load particle.js
    particlesJS.load('particles-js','assets/js/particlesjs-config.json');

    //text rotate
    //waits 300 seconds to make animation natural
    setTimeout(function(){
      var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666;  }";
    var cursor = true;
        var speed = 590;
        setInterval(() => {
          if(cursor) {
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.00em solid #666; }";
            cursor = false;
          }else {
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666; margin-right:-5px}";
            cursor = true;
          }
        }, speed);
    document.body.appendChild(css);
    }, 300); 
};

//animated names function
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
    TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
      //check if website is currently visible 
      if (document.visibilityState == "visible") {
        //check if the muted button is toggled
        if (soundMute == false) {
          var audio = new Audio('assets/audio/type.mp3');
          audio.playbackRate = getRandomFloat(.77, 1.5, 2)

          //honestly idk how any of this works but it basicallys checks if audio autoplay is working
          //https://stackoverflow.com/questions/49930680/
          Audio.prototype.play = (function(play) {
            return function () {
              var audio = this,
                  args = arguments,
                  promise = play.apply(audio, args);
              if (promise !== undefined) {
                promise.catch(_ => {
                  // if autoplay no worky 
                  console.log('ok')
                  document.getElementById("interact").style.opacity = "60%";
                });
              }
            };
            })(Audio.prototype.play);
          document.getElementById("interact").style.opacity = "0%";
          audio.play()

          } else{
          console.log('skipping audio')
        }
      }
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };

//animated title
//https://stackoverflow.com/a/34613522/13805956
var title = new MovingTitle("Home | 4ur4.dev ", 200, 15);
title.init();

function MovingTitle(writeText, interval, visibleLetters) {
    var _instance = {};

    var _currId = 0;
    var _numberOfLetters = writeText.length;

    function updateTitle() {
        _currId += 1;
        if(_currId > _numberOfLetters - 1) {
            _currId = 0; 
        }

        var startId = _currId;
        var endId = startId + visibleLetters;
        var finalText;
        if(endId < _numberOfLetters - 1) {
            finalText = writeText.substring(startId, endId);
        } else {
            var cappedEndId = _numberOfLetters;
            endId = endId - cappedEndId;

            finalText = writeText.substring(startId, cappedEndId) +     writeText.substring(0, endId);
        }

        document.title = finalText; 
    }

    _instance.init = function() {
        setInterval(updateTitle, interval);
    };

    return _instance;
}