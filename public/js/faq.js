$(".question").click(function(event) {
	event.stopPropagation();
	$(this).children("ul").slideToggle();
});