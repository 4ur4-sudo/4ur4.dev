document.documentElement.onload = function () {
  document.getElementById("loader").style.display = "block";
};

function discordCopy() {
  var copy = document.getElementById("discord-sel");
  navigator.clipboard.writeText(copy.textContent);
}

$(document).ready(function () {
  //link hover effects
  $(".link").hover(function () {
      if ($(this).attr("class") == "discord link"){
        $(this).find(".link-bg").css("filter","drop-shadow(0 0 .2rem white)");
        $(this).find("svg").css("filter","drop-shadow(0 0 .1rem #5865F2)");
      } else{
        $(this).find(".link-button").css("filter","drop-shadow(0 0 .2rem white)");
      }
      $(this).find(".left").css("left","6.1rem");
      $(this).find(".right").css("left","13.4rem");

    }, function () {
      $(this).find(".link-button").css("filter","");
      $(this).find(".link-bg").css("filter","");
      $(this).find("span").css("filter","");
      $(this).find("svg").css("filter","");
      $(this).find(".left").css("left","-1.5rem");
      $(this).find(".right").css("left","21.1rem");
    }
  );

  //discord hover effects
  $(".discord").hover(function() {
    let text = $(this).find("span");
    let svg = $(this).find("svg");
    text.css("opacity", "0");
    svg.css("opacity", "0");
    setTimeout(() => {
        text.text("4ur4#3538");
        text.css("opacity", "1");
        svg.css("opacity", "1");
        svg.css("color", "#5865F2");
    }, 200);
  },
    function() {
      let text = $(this).find("span");
      let svg = $(this).find("svg");
      if (text.css("opacity") == 1){
        text.css("opacity", "0");
        svg.css("opacity", "0");
        setTimeout(() => {
            text.text("Discord");
            text.css("opacity", "1");
            svg.css("opacity", "1");
            svg.css("color", "#d4d4d4")
        }, 200);
      } else {
        setTimeout(() => {
          text.css("opacity", "0");
          svg.css("opacity", "0");
          setTimeout(() => {
              text.text("Discord");
              text.css("opacity", "1");
              svg.css("opacity", "1");
              svg.css("color", "#d4d4d4")
          }, 200);
      }, text.css("opacity")*200);
    }
  });

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
