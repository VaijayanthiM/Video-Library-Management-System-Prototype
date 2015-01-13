/**
 * New node file
 */
$(document).ready(function () {
	
	$('.button').click(function(){
		console.log("I am going to hit the AJAX !!");
		 var a= $(this).attr('id');
		
        $.ajax({
            type : 'POST',
            url : '/IssueMovie',
            data : "IssueId=" + a,
            dataType : 'json',
            success : function(data) {
            	
            	alert("the call happened !!"+data);
            },
            error : function(data) {
                setError('Make call failed');
            }
        });
        return false;
    });
	

});