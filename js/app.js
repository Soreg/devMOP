/*
  Add respective JS here.
  Please don't target default tags like "h2".
  Instead, target defined tags, ex. "#feature1Heading"
*/


// Todo



// Weather



// Clock
function getTime() {
  // get current date
  const now = new Date();
  // get seconds, minutes and hours
  var seconds = "0" + now.getSeconds();
  var minutes = "0" + now.getMinutes();
  var hours = "0" + now.getHours();

  //change html clock time

  document.getElementById('second').innerHTML = seconds.slice(-2);
  document.getElementById('minute').innerHTML = minutes.slice(-2) + " : ";
  document.getElementById('hour').innerHTML = hours.slice(-2) + " : ";
}

setInterval(getTime, 1000);
