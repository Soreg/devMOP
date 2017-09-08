//================== Background images ==================
$(document).ready(function() {

  var imagesUrl = "http://www.sgcoding.media/devMOP-images/";
  var images = [
    '001.jpg','002.jpg','003.jpg','004.jpg','005.jpg','006.jpg','007.jpg','008.jpg','009.jpg','010.jpg',
    '011.jpg','012.jpg','013.jpg','014.jpg','015.jpg','016.jpg','017.jpg','018.jpg','019.jpg','020.jpg',
    '021.jpg','022.jpg','023.jpg','024.jpg','025.jpg','026.jpg','027.jpg','028.jpg','029.jpg','030.jpg',
    '031.jpg','032.jpg','033.jpg','034.jpg','035.jpg','036.jpg','037.jpg','038.jpg','039.jpg','040.jpg',
    '041.jpg','042.jpg','043.jpg','044.jpg','045.jpg','046.jpg','047.jpg','048.jpg','049.jpg'
  ];
  var randomImage = images[Math.floor(Math.random()*images.length)];
  var imagePath = imagesUrl + randomImage;

  var remoteImage,
    container = document.querySelector('.sidebar'),
    toLoad = { 'images': [
       imagePath, ] }; // list of image URLs

  toLoad.images.forEach(function(imageToLoad) {
        remoteImage = new RAL.RemoteImage(imageToLoad);
        container.appendChild(remoteImage.element);
        RAL.Queue.add(remoteImage);
  });
  //display image
  $('html').css('background-image', 'url(' + imagePath + ')');
});
RAL.Queue.setMaxConnections(4);
RAL.Queue.start();

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

chrome.storage.sync.get('name', function(item) {
  // if there's a name in storage, use it
  if(item.name) {
    $('.greet__name').html(greetMessage + ", " + item.name);
  }
  else {
    $(".greet__input").on("keydown",function name(e) {
      if(e.keyCode == 13) {
      let user = this.value;
      // set name to storage
      chrome.storage.sync.set({'name': user});
      // display name
      $('.greet__name').fadeOut('normal', function() {
        $('.greet__name').html(greetMessage + ", " + user);
        $('.greet__name').fadeIn('normal');
      });
      }
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
  var hourminuteString = `${hours.slice(-2)}:${minutes.slice(-2)}`;

  //change html clock time
  document.querySelector('.clock__hour-minute').innerHTML = hourminuteString;
  document.querySelector('.clock__second').innerHTML = ":" + seconds.slice(-2);
}

setInterval(getTime, 1000);


//================== Date ==================
var date = new Date();
// Set month names
var month = ["January ", "February ", "March ", "April ", "May ", "June ",
"July ", "August ", "September ","October ", "November ", "December "];
// Set day names
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
"Friday", "Saturday"];

// Assign data
var dateMonth = month[date.getMonth()];
var dateDay = day[date.getDay()];
var dateDate = date.getDate();
var dateString = dateDay + ", " + dateMonth + dateDate;

// Change html
$(".date .date__date").html(dateString);


//================== Weather ==================
var tryGeolocation = function() {
  $(".weather__loc").html("Loading weather...");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      browserGeolocationSuccess,
      browserGeolocationFail,
      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true}
    );
  }
};

var browserGeolocationSuccess = function(position) {
  console.log("Browser geolocation success!\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude + "\nacc = " + position.coords.accuracy);
  getAddress(position.coords.latitude, position.coords.longitude);
  getWeather(position.coords.latitude, position.coords.longitude);
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      console.log("Browser geolocation error! Timeout.\nTrying API geolocation...");
      tryAPIGeolocation();
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        console.log("Browser geolocation error! Permission denied.\nTrying API geolocation...");
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Browser geolocation error! Position unavailable.\nTrying API geolocation...");
      tryAPIGeolocation();
      break;
  }
};

var tryAPIGeolocation = function() {
  $.getJSON('https://ipinfo.io', function(data){
  	apiGeolocationSuccess({coords: {latitude: data.loc.split(',')[0], longitude: data.loc.split(',')[1]}});
  })
  .fail(function(err) {
      console.log("API Geolocation error! " + err);
      $(".weather__loc").html("Weather could not be loaded.");
  });
};

var apiGeolocationSuccess = function(position) {
  console.log("API geolocation success!\nlat = " + position.coords.latitude + " lng = " + position.coords.longitude);
  getAddress(position.coords.latitude, position.coords.longitude);
  getWeather(position.coords.latitude, position.coords.longitude);
};

var getAddress = function(lat, lon) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=premise|locality&key=AIzaSyC4h5g3Zh1xT2ytDJtzKh5x4dCsXzhGf0U`;
  $.getJSON(url)
    .done(function(data) {
      if (data.status == "OK") {
        let address = data.results[0];
        console.log("Address found = " + address.formatted_address);
        let city = '';
        let country = '';
        //iterate through address_components to find locality and country
        for (let component of address.address_components) {
          if (component.types.indexOf("locality") != -1) {city = component.long_name;}
          if (component.types.indexOf("country") != -1) {country = component.long_name;}
        }
        let location = `${city}, ${country}`;
        //display
        $(".weather__loc").html(location).css('font-size', '1.25rem');
      } else {
        console.log("No address found");
        //If error, replace "Loading weather..." message by empty location
        $(".weather__loc").html("");
      }
    });
};

var getWeather = function(lat, lon) {
  //Powered by Dark Sky: https://darksky.net/forecast/32,-5/si24/en
  let url = `https://api.darksky.net/forecast/aa9c777240c7de062ffdd1bbdb29b3ea/${lat},${lon}?exclude=minutely,hourly,alerts&units=auto`; //https://cors-anywhere.herokuapp.com/
  $.getJSON(url)
    .done(function(data) {
      (data.flags.units === ('si'||'ca'||'uk2')) ? deg = 'C' : deg = 'F';
      let weather = data.daily.data[0].summary;
      let temp = data.currently.temperature;
      let icon = data.daily.data[0].icon;
      let maxTemp = data.daily.data[0].temperatureMax;
      let minTemp = data.daily.data[0].temperatureMin;
      let timezone = data.timezone.split("/");
      //Skycons
      let skycons = new Skycons({"color": "white", "resizeClear": true});
      skycons.add("weather-icon", Skycons[icon.replace(/-/g, '_').toUpperCase()]);
      skycons.play();
      //display
      $(".weather__temp").html(`${temp.toFixed(0)}º${deg}`);
      $(".weather__descr").html(weather);
  });
}

tryGeolocation();

//================== Motivation ==================

$(document).ready(function() {
  var articles = [
    {
      article: "My winding road from security guard to back-end developer",
      link: "https://medium.freecodecamp.org/from-self-taught-coder-to-professional-backend-developer-my-long-winding-road-d8f7c428b637"
    },
    {
      article: "Google not, learn not: why searching can sometimes be better than knowing",
      link: "https://medium.freecodecamp.org/google-not-learn-not-why-searching-can-be-better-than-knowing-79838f7a0f06"
    },
    {
      article: "Lessons from my first year of live coding on Twitch",
      link: "https://medium.freecodecamp.org/lessons-from-my-first-year-of-live-coding-on-twitch-41a32e2f41c1"
    },
    {
      article: "Teaching Programming is Hard",
      link: "https://medium.com/le-wagon/teaching-programming-is-hard-f4ad74e702d0"
    },
    {
      article: "7 Things I learned in my journey from coding bootcamp to Senior Developer",
      link: "https://codeburst.io/7-things-i-learned-in-my-journey-from-coding-bootcamp-to-senior-developer-645ab7c2fea0"
    },
    {
      article: "Lessons learned from passing the Associate Android Developer(AAD) certification by Google",
      link: "https://hackernoon.com/lessons-learned-from-passing-the-associate-android-developer-aad-certification-by-google-e192224c6c3b"
    },
    {
      article: "How I got accepted into the best remote working platforms",
      link: "https://medium.com/@caroso1222/how-i-got-accepted-into-the-best-remote-working-platforms-a9250041531f"
    },
    {
      article: "My First Hackathon and What I Learned",
      link: "https://hackernoon.com/my-first-hackathon-and-what-i-learned-c694230190ce"
    },
    {
      article: "So you want to be a Software Engineer?!?",
      link: "https://medium.com/@eduardovedes/so-you-want-to-be-a-software-engineer-7f1a3626dda8"
    },
    {
      article: "What I learned from my first #100DaysOfCode",
      link: "https://medium.freecodecamp.org/what-i-learned-from-my-first-100daysofcode-13ac805ff0a9"
    },
    {
      article: "How to Go From Hobbyist to Professional Developer",
      link: "https://medium.freecodecamp.org/how-to-go-from-hobbyist-to-professional-developer-11a8b8a52b5f"
    },
    {
      article: "A Better Way to Compare Yourself",
      link: "https://medium.freecodecamp.org/a-better-way-to-compare-yourself-43cf37616570"
    },
    {
      article: "The 12 YouTube videos new developers mention the most",
      link: "https://medium.freecodecamp.org/the-12-youtube-videos-new-developers-mention-the-most-f2d1fce337ca"
    },
    {
      article: "Why I left a big, prestigious law firm to become a product manager at a startup",
      link: "https://medium.freecodecamp.org/why-i-left-a-big-prestigious-law-firm-to-become-a-product-manager-at-a-startup-a7afd8c3e708"
    },
    {
      article: "How I went from zero to San Francisco software engineer in 12 months",
      link: "https://medium.freecodecamp.org/how-i-learned-to-code-and-earned-a-job-in-silicon-valley-changing-my-life-along-the-way-a3af854855fa"
    },
    {
      article: "From Zero to Front-end Hero",
      link: "https://medium.freecodecamp.org/from-zero-to-front-end-hero-part-1-7d4f7f0bff02"
    },
    {
      article: "12 Free Games to Learn Programming.",
      link: "https://medium.mybridge.co/12-free-resources-learn-to-code-while-playing-games-f7333043de11"
    },
    {
      article: "15 Web Developer Portfolios to Inspire You",
      link: "https://medium.freecodecamp.org/15-web-developer-portfolios-to-inspire-you-137fb1743cae"
    },
    {
      article: "How to use spaced repetition with Anki to learn to code faster",
      link: "https://medium.freecodecamp.org/use-spaced-repetition-with-anki-to-learn-to-code-faster-7c334d448c3c"
    },
    {
      article: "How to be great at asking coding questions",
      link: "https://medium.com/@gordon_zhu/how-to-be-great-at-asking-questions-e37be04d0603"
    },
    {
      article: "What I learned from turning down a job at Google",
      link: "https://medium.freecodecamp.org/what-i-learned-from-turning-down-a-job-at-google-b2a36567c31"
    },
    {
      article: "If you are struggling with the FreeCodeCamp Intermediate Projects",
      link: "https://medium.com/@P1xt/if-you-are-struggling-with-the-freecodecamp-intermediate-projects-9f7fe943601c"
    },
    {
      article: "Why Learning to Code Is Soooo Hard?",
      link: "https://medium.com/sololearn/why-learning-to-code-is-soooo-hard-3c2372e9d12c"
    },
    {
      article: "Want to master programming? Try this process.",
      link: "https://medium.com/career-change-coder/want-to-master-programming-think-in-the-language-2c72db300ed5"
    },
    {
      article: "Yet another article on the first dev job",
      link: "https://medium.com/chingu/yet-another-article-on-the-first-dev-job-c5f14a6ab0"
    },
    {
      article: "Want to be Smarter? Learn to Say “I Don’t Know”",
      link: "https://medium.com/personal-growth/want-to-be-smarter-learn-to-say-i-dont-know-490d02f867ad"
    },
    {
      article: "Why striving for perfection might be holding you back as a newbie web developer",
      link: "https://medium.freecodecamp.org/why-striving-for-perfection-might-be-holding-you-back-as-a-newbie-web-developer-6e8ae257751f"
    },
    {
      article: "How we brought a new App to life to help web-dev learners — devGaido",
      link: "https://medium.com/chingu/bringing-a-new-app-to-life-devgaido-54519b63cb06"
    },
    {
      article: "Voyaging to a new level. Destination….. Lost and Found",
      link: "https://medium.com/chingu/voyaging-to-a-new-level-destination-lost-and-found-3ee0cf4daf6a"
    },
    {
      article: "I wanted real time GitHub push notifications. So I built a Chrome extension",
      link: "https://medium.freecodecamp.org/i-wanted-real-time-github-push-notifications-so-i-built-a-chrome-extension-7e6be0611e4"
    },
    {
      article: "How I replicated an $86 million project in 57 lines of code",
      link: "https://medium.freecodecamp.org/how-i-replicated-an-86-million-project-in-57-lines-of-code-277031330ee9"
    }
  ];
  $(".article__button").on("click", function() {
    var randomArticle = articles[Math.floor(Math.random() * articles.length)];
    //display article
    $('.article__display').fadeTo('normal', 0, function() {
      $('.article__display').html(`
        <span><i class="fa fa-times" aria-hidden="true"></i> </span>
        <a class="article__link" target="_blank" href="${randomArticle.link}">
          ${randomArticle.article} <i class='fa fa-external-link' aria-hidden='true'></i>
        </a>`);
    });
    $('.article__display').fadeTo('normal', 1);
  });
});

// Click on article's close icon to hide it
$(".article__display").on("click", "span", function(event) {
  $(this).parent().fadeOut(function() {
    //remove link only once the fadeOut finishes
    $(this).html('');
  });
  //stop the event from bubbling up to other elements
  event.stopPropagation();
});

//================== Todo ==================
// Store todos in array
var todosArray = [

];

//Load any existing todos from storage
chrome.storage.sync.get('todos', function(item) {
  if(item.todos) {
    for (i in item.todos) {
      $(".todos__ulist").append(item.todos[i].todo);
    }
    todosArray = item.todos;
  }
});

//Check off specific todos by clicking
$(".todos__ulist").on("click", ".todos__list-item", function() {
  $(this).toggleClass("todos__list-item--completed");
});

// Click on icon to delete todo
$(".todos__ulist").on("click", "span", function(event) {
  $(this).parent().fadeOut(function() {
    // Loop through the array
    for (var i = 0; i < todosArray.length; i++) {
      // If the ID is a match..
      if (todosArray[i].todoID === Number(this.id)) {
        //remove li only once the fadeOut finishes
        $(this).remove;
        todosArray.splice(i, 1);
        chrome.storage.sync.set({todos: todosArray})
      }
    }
  });
  //stop the event from bubbling up to other elements
  event.stopPropagation();
});

//Add new todo
$(".todos__input").keypress(function(event) {
  if (event.which === 13) {
    //make sure text is not empty
    if($(this).val() !== "") {
      // Initial todoID always starts at 0
      var todoID = 0;
      // Loop through all the ID's in the array
      for (var i = 0; i < todosArray.length; i++) {
        // If the ID in the array is bigger than / equal to the last ID
        // note - this way, it finds the max ID in the array
        if (todosArray[i].todoID >= todoID) {
          // New ID is 1 number higher than the last ID
          // Ex if you got ID's (1, 2, 5, 7, 9), the new ID will be 10 (max + 1).
          todoID = (todosArray[i].todoID + 1);
        }
      }

    //grab new todo text from user input
    var todoText = "<li id=" + todoID + " class='todos__list-item'><span class='todos__delete'><i class='fa fa-trash' aria-hidden='true'></i></span>" + $(this).val() + "</li>";
    // Push text to array
    todosArray.push({todo: todoText, todoID});
    // Save array
    chrome.storage.sync.set({todos: todosArray});
    //clear out input field
    $(this).val("");
    //add new li with user input
    $(".todos__ulist").append(todoText);
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
