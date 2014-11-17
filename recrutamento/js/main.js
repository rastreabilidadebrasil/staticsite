$(document).ready(function() {
	$(".thumb").click(function(){
		$(".img").append("<img style='display:none' src='imgs/img"+$(this).attr("value")+".jpg' />")
		$(".img").fadeOut(400);
		var img = $(this).attr("value");
		setTimeout(function(){
			$(".img").html("<img src='imgs/img"+img+".jpg' />")
			setTimeout(function(){$(".img").fadeIn(400);},400);
		},400);
	})

});
