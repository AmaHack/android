Aria.tplScriptDefinition({
    $classpath : "app.templates.home.PopupScript",
	$constructor: function(){
	},    
	$prototype : {

        $displayReady: function(){
			$(".mask, .fb, .ses, .well, .popUp").hide();
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
		}
    }

});