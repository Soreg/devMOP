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
