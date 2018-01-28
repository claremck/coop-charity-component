jQuery.noConflict();
(function ($) {
	 function getApi() {
        $.getJSON( "https://coop-mock-test-api.herokuapp.com", function( data ) {
		  var items = [];
		  $.each( data, function( key, val ) {
			items.push( "<span id='" + key + "'>" + val + "</span>" );
		  });
		 
		  $( "<span/>", {
			"id": "amount-raised",
			html: items.join( "" )
		  }).appendTo( "body" );
		  
		  //progress bar
		  
			var raised = $("#raised").text();
			var total = $("#target").text();		
			
			var fraction = raised / total;
			var percent = fraction * 100;
			var percentRound = percent.toFixed();
			var percentRound = percentRound + '%';
									
				$('.bar').css('padding-left', percentRound);
				$('#raised').appendTo('#amt_raised');
				$('#target').appendTo('#amt_target');
				
				$('#amount-raised').remove();
				  
			});
	
    }

    $(document).ready(function () {
		getApi();  
    });

    $(window).resize(function () {

    });

})(jQuery);