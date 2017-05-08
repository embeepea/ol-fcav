(function ($) {
    $(document).ready(function () {
	if (!Cookies) console.log("error in cookies");
	if (!Cookies.get("data-error")) createErrorMessage();
    });

    function createErrorMessage () {
	console.log("data interruption");
	createPopup();
    }

    function createPopup () {
	var popup = $("<div id='data-interruption-error'><div class='error-title'>ForWarn data interruption</div><div class='error-body'>We apologize that there will be an interruption in production and delivery of all ForWarn 8-day products for the immediate future.  The recent U.S. Government budget uncertainty caught us between ForWarn production contracts, which have now been unexpectedly delayed until we once again have budget spending authority.  Although we are unable to estimate the amount of time that new ForWarn products will be unavailable, we intend to resume the delivery of all ForWarn 8-day products as soon as possible.  This is the first interruption in continuous service that ForWarn has had since its inception seven years ago.  Throughout this hiatus, all historical ForWarn products, as well as all updates of ancillary map layers will continue to be available through the ForWarn viewer, as always.</div><div class='error-button-wrapper'><button class='error-button'>Proceed to viewer</button></div></div>");
	popup.find(".error-button").on("click", handlePopupClick);
	$("body").append(popup);
    }

    function handlePopupClick () {
	$(".error-button").off("click", handlePopupClick);
	$("#data-interruption-error").remove();
	setCookie();
    }

    function setCookie () {
	Cookies.set("data-error", "seen");
    }
})(window.jQuery);
