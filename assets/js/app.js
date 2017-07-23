//jQuery

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