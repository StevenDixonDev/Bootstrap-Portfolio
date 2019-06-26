// Use jquery to handle click events on portfolio items
$(".card").click(function(){
  window.open($(this).attr("data"));
})