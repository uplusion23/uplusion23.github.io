$('<div class="splash"></div>').css({"left": Math.random() * window.outerWidth , "top": Math.random() * window.outerHeight}).appendTo('body').delay(4000).fadeOut(function(){$(this).remove()});
let _splashInterval = setInterval(() => {
  $('<div class="splash"></div>').css({"left": Math.random() * window.outerWidth , "top": Math.random() * window.outerHeight}).appendTo('body').delay(4000).fadeOut(function(){$(this).remove()});
}, 3000);

/* Raw JS */
function callbackFunc(entries, observer)
{
  entries.forEach(entry => {
    var txt = entry.target.classList + " visibility: " + entry.isIntersecting;
    if (entry.isIntersecting) {
      const tgt = entry.target;
      entry.target.classList.add('animate-active');
      observer.unobserve(tgt);
    }
  });
}

let options = {
    root: document.getElementsByClassName('container')[0],
    rootMargin: '0px',
    threshold: 0
  };

let observer = new IntersectionObserver(callbackFunc, options);

for (let x = 0; x < document.getElementsByClassName('animateOnLoad').length; x++) {
  observer.observe(document.getElementsByClassName('animateOnLoad')[x])
}

const animateElements = [...document.getElementsByClassName('animateOnLoad')];
animateElements.forEach(element => observer.observe(element));

/* Anchor link smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

$(document).ready(function() {
  $('.content').scroll(function() {
    var scrollPos = $(window).scrollTop();
    
    var introTop = $("#intro").offset().top;
    var aboutTop = $("#about").offset().top;
    var worksTop = $("#works").offset().top;

    if (scrollPos >= (introTop - 10) && scrollPos < (aboutTop - 100)) {
      $(".navigation a[data-nav]").removeClass("active");
      $('.navigation a[data-nav="intro"]').addClass("active");
    }

    if (scrollPos >= (aboutTop - 100) && scrollPos < (worksTop - 100)) {
      $(".navigation a[data-nav]").removeClass("active");
      $('.navigation a[data-nav="about"]').addClass("active");
    }

    if (scrollPos >= (worksTop - 100) && scrollPos < (($(this).scrollTop() + $(this).innerHeight()) - 10)) {
      $(".navigation a[data-nav]").removeClass("active");
      $('.navigation a[data-nav="works"]').addClass("active");
    }

    if(scrollPos >= (($(this).scrollTop() + $(this).innerHeight()) - 10)) {
      $(".navigation a[data-nav]").removeClass("active");
      $('.navigation a[data-nav="contact"]').addClass("active");
    }

  });
});