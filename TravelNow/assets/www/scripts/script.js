// JavaScript Document
$(document).ready(function() {
	
	
	$(".mask, .fb, .ses, .well, .popUp").hide();
	
	//search tab
	$("#roundTrip").addClass("selected");
	
	$("#oneWay").click(function(){
			$(this).addClass("selected");
			$("#roundTrip").removeClass("selected");
		});

	$("#roundTrip").click(function(){
			$(this).addClass("selected");
			$("#oneWay").removeClass("selected");
		});
		
			
			$(".facebook").click(function(){
					$(".mask, .popUp, .fb").show();
				});
				
			$(".seasonal").click(function(){
					$(".mask, .popUp, .ses").show();
				});
				
			$(".wellBeing").click(function(){
					$(".mask, .popUp, .well").show();
				});
		
			$(".close").click(function(){
			$(".mask, .fb, .ses, .well, .popUp").hide();
				});
		

});


