function errorHandler(jqXHR, exception) {
    if (jqXHR.status === 0) {
        alert('Not connect.\n Verify Network.');
    } else if (jqXHR.status == 404) {
        alert('Requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        alert('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
        alert('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        alert('Time out error.');
    } else if (exception === 'abort') {
        alert('Ajax request aborted.');
    } else {
        alert('Uncaught Error.\n' + jqXHR.responseText);
    }
}

function checkValidade(value){
	blockPress = true;
	
	/*$.ajax({
	  type: "POST",
	  url: String("_php/getcadastradas.php"),
	  dataType: 'json',
	  success: function(data){
	  	
	  	//data.cadastradas

	  },
	  error: errorHandler
	});*/
	if(value=="11"){
		$( ".et1" ).animate({
			opacity: 0.0
		}, 500, function() {
			showEt(2);
		});
	}else{
		$( ".et1" ).animate({
			opacity: 0.0
		}, 500, function() {
			showEt(4);
		});
	}
}

function showEt(id){
	$( ".et"+id ).css("display","block");
	$( ".et"+id ).css("opacity",0);
	$( ".et"+id ).animate({
		opacity: 1.0
	}, 500, function() {
		setTimeout(function(){
			$( ".et"+id ).animate({
				opacity: 0.0
			}, 500, function() {
				blockPress = false;
				$( ".et"+id ).css("display","none");
				$("textarea[maxlength]").val("");
				$("textarea[maxlength]").focus();
				$( ".et1" ).animate({
					opacity: 1.0
				}, 500);
			});
		},5000)
	});
}


$(document).ready(function(){ 
	$("textarea[maxlength]").focus();
	$("textarea[maxlength]").keyup(function(event){
		if(!blockPress){
		    var key = event.which;
	        var maxLength = $(this).attr("maxlength");
	        var length = this.value.length;

	        if(length == maxLength) {
	        	checkValidade($(this).val());
	            event.preventDefault();
	        }
    	}
	});
});


var blockPress=false;