jQuery.noConflict();
(function ($) {
    function progressBar() {
        var raised = $(".raised").text();
		var total = $(".total").text();		
		
		var difference = total - raised;
		var fraction = difference / total;
		var percent = fraction * 100;
		var percentRound = percent.toFixed();
		var percentRound = percentRound + '%';
							    
			$('.bar').css('padding-left', percentRound);
		
    }

    $(document).ready(function () {
       progressBar();
    });

    $(window).resize(function () {

    });

})(jQuery);