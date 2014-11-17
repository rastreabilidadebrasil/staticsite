$(document).ready(function() {
	$(".thumb").click(function(){
		
		$(".img").html("<img src='imgs/img"+$(this).attr("value")+".jpg' />")
	})

});
