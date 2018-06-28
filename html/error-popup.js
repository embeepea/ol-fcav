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
	var popup = $("<div id='data-interruption-error'><div class='error-button-wrapper'><button class='error-button'>Proceed to viewer</button></div><div class='error-title'>Welcome to ForWarn II!</div><div class='error-body'><p>ForWarn II has enhanced sensitivity, now showing even slight disturbances earlier than ever before, and now covers a larger geographic area.</p><p>ForWarn II is mostly the same system with which you're already familiar, but now has a totally new production system that offers some exciting new capabilities, including some new products designed for specialized purposes.</p><p>For example, disturbances within grasses, shrubs and other shallow-rooted vegetation can sometimes dominate the disturbance signal seen in ForWarn maps, particularly in the Western United States.  Almost every ForWarn II disturbance map now has a \"Muted Grass/Shrub\" companion product that concentrates on the disturbance responses of trees, reserving more of the dynamic range in the maps for showing forest impacts.</p><p>Most new ForWarn II products are already available for the entire MODIS period starting in 2003 to present.  Most of the data viewer features, like the Share-This-Map, the NDVI graphing tool, and the PestProximity tools, will still work just as always.</p><p>Documentation is still being developed, so please pardon our virtual dust as we continue to carry these improvements throughout the entire Forest Change Assessment Viewer 2 and the ForWarn II website.  Enjoy the new features, and we welcome your feedback!</p></div></div>");
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
