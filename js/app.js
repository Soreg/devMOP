/*
  Add respective JS here.
  Please don't target default tags like "h2".
  Instead, target defined tags, ex. "#feature1Heading"
*/


//================== Todo ==================
//Note: could change jQuery to vanilla if that's what we agree on using globally

//Check off specific todos by clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

// Click on icon to delete todo
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(function() {
		//remove li only once the fadeOut finishes
		$(this).remove;
	});
	//stop the event from bubbling up to other elements
	event.stopPropagation();
});

//Add new todo
$("input[type='text']").keypress(function(event) {
	if (event.which === 13) {
		//make sure text is not empty
		if($(this).val() !== "") {
			//grab new todo text from user input
			var todoText = $(this).val();
			//clear out input field
			$(this).val("");
			//add new li with user input
			$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span>" + todoText + " </li>");
		}
	}
});

$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle();
});


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
