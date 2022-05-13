function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

document.documentElement.onload = function () {
  document.getElementById("loader").style.display = "block";
};

$(document).click(function (e) {
  console.log('click')
  clicked = true;
  document.getElementById("interact").style.opacity = "0%";
});

var soundMute = false;
var clicked = false;

function muteToggle() {
  let button = document.getElementById("mute");
  if (soundMute == false) {
    button.firstChild.firstChild.setAttribute(
      "d",
      ""
    );
  } else {
    button.firstChild.firstChild.setAttribute(
      "d",
      ""
    );
  }
  soundMute = !soundMute;
}

$(document).ready(function () {

  $(".link").hover(function () {
      $(this).find(".link-button").children().addBack().css("filter","drop-shadow(0 0 .2rem white)");
      $(this).find(".left").css("left","6.1rem");
      $(this).find(".right").css("left","13.4rem");

    }, function () {
      $(this).find(".link-button").children().addBack().css("filter","");
      $(this).find(".left").css("left","-1.5rem");
      $(this).find(".right").css("left","21.1rem");
    }
  );

  //hide loading screen
  document.getElementById("loader").style.display = "none";

  //load particle.js
  particlesJS.load("particles-js", "assets/js/particlesjs-config.json");

  //text rotate
  //waits 300 seconds to make animation natural
  setTimeout(function () {
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-rotate");
      var period = elements[i].getAttribute("data-period");
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
      if (cursor) {
        css.innerHTML =
          ".txt-rotate > .wrap { border-right: 0.00em solid #666; }";
        cursor = false;
      } else {
        css.innerHTML =
          ".txt-rotate > .wrap { border-right: 0.08em solid #666; margin-right:-5px}";
        cursor = true;
      }
    }, speed);
    document.body.appendChild(css);
  }, 300);
});

//animated names function
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
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
        var audio = new Audio("assets/audio/type.mp3");

        //honestly idk how any of this works but it basicallys checks if audio autoplay is working
        //https://stackoverflow.com/questions/49930680/
        Audio.prototype.play = (function (play) {
          return function () {
            var audio = this,
              args = arguments,
              promise = play.apply(audio, args);
            if (promise !== undefined) {
              promise.catch((_) => {
                // if autoplay no worky
                console.log("ok");
                if (clicked == false){
                  document.getElementById("interact").style.opacity = "60%";
                }
              });
            }
          };
        })(Audio.prototype.play);
        document.getElementById("interact").style.opacity = "0%";
        audio.playbackRate = getRandomFloat(0.77, 1.5, 2);
        audio.play();
      } else {
        console.log("skipping audio");
      }
    }
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
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
    if (_currId > _numberOfLetters - 1) {
      _currId = 0;
    }

    var startId = _currId;
    var endId = startId + visibleLetters;
    var finalText;
    if (endId < _numberOfLetters - 1) {
      finalText = writeText.substring(startId, endId);
    } else {
      var cappedEndId = _numberOfLetters;
      endId = endId - cappedEndId;

      finalText =
        writeText.substring(startId, cappedEndId) +
        writeText.substring(0, endId);
    }

    document.title = finalText;
  }

  _instance.init = function () {
    setInterval(updateTitle, interval);
  };

  return _instance;
}
