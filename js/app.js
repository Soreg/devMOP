
//================== Greet user ==================
var currentHour = new Date().getHours();
var greetMessage = "Good day";

if(currentHour >= 00 && currentHour < 12 ) {
    greetMessage = "Good morning";
} else if (currentHour >= 12 && currentHour < 17) {
  greetMessage = "Good afternoon";
} else if (currentHour >= 17 && currentHour < 24) {
  greetMessage = "Good evening";
}

$(".greet__input").on("keydown",function name(e) {
    if(e.keyCode == 13) {
      var user = this.value;
      $('.greet__name').fadeOut('normal', function() {
        $(".greet__name").css("font-size", "1.875rem");
        $('.greet__name').html(greetMessage + ", " + user);
        $('.greet__name').fadeIn('normal');
      });
    }
});


//================== Clock ==================
function getTime() {
  // get current date
  const now = new Date();
  // get seconds, minutes and hours
  var seconds = "0" + now.getSeconds();
  var minutes = "0" + now.getMinutes();
  var hours = "0" + now.getHours();

  //change html clock time
  document.querySelector('.clock__second').innerHTML = ": " + seconds.slice(-2);
  document.querySelector('.clock__minute').innerHTML = ": " + minutes.slice(-2);
  document.querySelector('.clock__hour').innerHTML = hours.slice(-2);
}

setInterval(getTime, 1000);


//================== Date ==================



//================== Weather ==================
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(location) {
      var lat = location.coords.latitude;
      var lon = location.coords.longitude;
      var degC = true;
      //Powered by Dark Sky: https://darksky.net/forecast/32,-5/si24/en
      var URL =
        "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/aa9c777240c7de062ffdd1bbdb29b3ea/" +
        lat +
        "," +
        lon +
        "?exclude=minutely,hourly,alerts,flags&units=auto";
      $.getJSON(URL, function(data) {
        console.log(data);
        var weather = data.daily.data[0].summary; //data.currently.summary;
        var temp = data.currently.temperature;
        var icon = data.daily.data[0].icon;
        var maxTemp = data.daily.data[0].temperatureMax;
        var minTemp = data.daily.data[0].temperatureMin;
        var timezone = data.timezone;

        $(".weather__loc").html(timezone);
        $(".weather__temp").html(temp + "°F");
        $(".weather__descr").html(weather);
        $(".weather__convert").on("click", function() {
          if (degC === true) {
            degC = false;
            $(".weather__temp").html(temp + "\xB0F");
          } else {
            degC = true;
            $(".weather__temp").html(Math.round((temp - 32) / 1.6) + "\xB0C");
          }
        });
      });
    });
  }
});


//================== Motivation ==================

$(document).ready(function() {
  var articles = [
    {
      article: "My winding road from security guard to back-end developer",
      link:
        "https://medium.freecodecamp.org/from-self-taught-coder-to-professional-backend-developer-my-long-winding-road-d8f7c428b637"
    },
    {
      article:
        "Google not, learn not: why searching can sometimes be better than knowing",
      link:
        "https://medium.freecodecamp.org/google-not-learn-not-why-searching-can-be-better-than-knowing-79838f7a0f06"
    },

    {
      article: "Lessons from my first year of live coding on Twitch",
      link:
        "https://medium.freecodecamp.org/lessons-from-my-first-year-of-live-coding-on-twitch-41a32e2f41c1"
    },
    {
      article: "Teaching Programming is Hard",
      link:
        "https://medium.com/le-wagon/teaching-programming-is-hard-f4ad74e702d0"
    },
    {
      article:
        "7 Things I learned in my journey from coding bootcamp to Senior Developer",
      link:
        "https://codeburst.io/7-things-i-learned-in-my-journey-from-coding-bootcamp-to-senior-developer-645ab7c2fea0"
    },
    {
      article:
        "Lessons learned from passing the Associate Android Developer(AAD) certification by Google",
      link:
        "https://hackernoon.com/lessons-learned-from-passing-the-associate-android-developer-aad-certification-by-google-e192224c6c3b"
    },
    {
      article: "How I got accepted into the best remote working platforms",
      link:
        "https://medium.com/@caroso1222/how-i-got-accepted-into-the-best-remote-working-platforms-a9250041531f"
    },
    {
      article: "My First Hackathon and What I Learned",
      link:
        "https://hackernoon.com/my-first-hackathon-and-what-i-learned-c694230190ce"
    },
    {
      article: "So you want to be a Software Engineer?!?",
      link:
        "https://medium.com/@eduardovedes/so-you-want-to-be-a-software-engineer-7f1a3626dda8"
    },
    {
      article: "What I learned from my first #100DaysOfCode",
      link:
        "https://medium.freecodecamp.org/what-i-learned-from-my-first-100daysofcode-13ac805ff0a9"
    },
    {
      article: "How to Go From Hobbyist to Professional Developer",
      link:
        "https://medium.freecodecamp.org/how-to-go-from-hobbyist-to-professional-developer-11a8b8a52b5f"
    },
    {
      article: "A Better Way to Compare Yourself",
      link:
        "https://medium.freecodecamp.org/a-better-way-to-compare-yourself-43cf37616570"
    },
    {
      article: "The 12 YouTube videos new developers mention the most",
      link:
        "https://medium.freecodecamp.org/the-12-youtube-videos-new-developers-mention-the-most-f2d1fce337ca"
    },
    {
      article:
        "Why I left a big, prestigious law firm to become a product manager at a startup",
      link:
        "https://medium.freecodecamp.org/why-i-left-a-big-prestigious-law-firm-to-become-a-product-manager-at-a-startup-a7afd8c3e708"
    },
    {
      article:
        "How I went from zero to San Francisco software engineer in 12 months",
      link:
        "https://medium.freecodecamp.org/how-i-learned-to-code-and-earned-a-job-in-silicon-valley-changing-my-life-along-the-way-a3af854855fa"
    }
  ];
  $(".article__button").on("click", function() {
    var randomArticle = articles[Math.floor(Math.random() * articles.length)];
    $(".article__display").html(
      '<a class="article__link" target="_blank" href = ' +
        randomArticle.link +
        ">" +
        randomArticle.article +
        "</a>"
    );
  });
});


//================== Todo ==================

//Check off specific todos by clicking
$(".todos__ulist").on("click", ".todos__list-item", function() {
  $(this).toggleClass("todos__list-item--completed");
});

// Click on icon to delete todo
$(".todos__ulist").on("click", "span", function(event) {
  $(this).parent().fadeOut(function() {
    //remove li only once the fadeOut finishes
    $(this).remove;
  });
  //stop the event from bubbling up to other elements
  event.stopPropagation();
});

//Add new todo
$(".todos__input").keypress(function(event) {
  if (event.which === 13) {
    //make sure text is not empty
    if($(this).val() !== "") {
      //grab new todo text from user input
      var todoText = $(this).val();
      //clear out input field
      $(this).val("");
      //add new li with user input
      $(".todos__ulist").append("<li class='todos__list-item'><span><i class='fa fa-trash' aria-hidden='true'></i></span>" + todoText + " </li>");
    }
  }
});


//================== Quotes ==================
$.ajax({
  type: 'GET',
  url: 'http://quotes.stormconsultancy.co.uk/random.json',
  success: function(resp) {
    $('.quote__text').html(`"${resp.quote}"`);
    $('.quote__author').html(`<em>${resp.author}</em>`);

  },
  error: function() {
    console.log('error getting quote');
  }
});
