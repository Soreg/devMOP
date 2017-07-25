$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(location) {
      var lat = location.coords.latitude;
      var lon = location.coords.longitude;
      var degC = true;
      //Powered by Dark Sky: https://darksky.net/forecast/32,-5/si24/en
      var URL =
        "https://crossorigin.me/https://api.darksky.net/forecast/aa9c777240c7de062ffdd1bbdb29b3ea/" +
        lat +
        "," +
        lon;
      $.getJSON(URL, function(data) {
        var weather = data.currently.summary;
        var temp = data.currently.temperature;
        var ID = data.currently.icon;
        var timezone = data.timezone;

        $("#geoloc").html(timezone);
        $("#temp").html(temp + "°F");
        $("#weather").html("With: " + weather + " weather");
        if (ID === ("clear-day" || "clear-night")) {
          $("body").css(
            "background-image",
            "url(https://images.pexels.com/photos/530642/pexels-photo-530642.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
          );
        } else if (ID === ("partly-cloudy-day" || "partly-cloudy-night")) {
          $("body").css(
            "background-image",
            "url(https://images.pexels.com/photos/530736/pexels-photo-530736.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
          );
        } else if (ID === "wind") {
          $("body").css(
            "background-image",
            "url(https://static.pexels.com/photos/358463/pexels-photo-358463.jpeg)"
          );
        } else if (ID === "rain") {
          $("body").css(
            "background-image",
            "url(https://static.pexels.com/photos/125510/pexels-photo-125510.jpeg)"
          );
        } else if (ID === ("thunderstorm" || "tornado")) {
          $("body").css(
            "background-image",
            "url(https://images.pexels.com/photos/530215/pexels-photo-530215.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
          );
        } else if (ID === ("snow" || "hail" || "sleet")) {
          $("body").css(
            "background-image",
            "url(https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
          );
        } else if (ID === ("fog" || "cloudy")) {
          $("body").css(
            "background-image",
            "url(https://static.pexels.com/photos/5230/road-fog-foggy-mist.jpg)"
          );
        } else {
          $("body").css(
            "background-image",
            "url(https://images.pexels.com/photos/530642/pexels-photo-530642.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
          );
        }

        $("#convertemp").on("click", function() {
          if (degC === true) {
            degC = false;
            $("#temp").html(temp + "\xB0F");
          } else {
            degC = true;
            $("#temp").html(Math.round((temp - 32) / 1.6) + "\xB0C");
          }
        });
      });
    });
  }
});
