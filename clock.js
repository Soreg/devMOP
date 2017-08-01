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
