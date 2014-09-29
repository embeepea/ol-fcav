var generateFlashObject = function (swfLoc, muglLoc, graphWidth, graphHeight) {
    return window.multigraph.jQuery('<object' +
                                    '    width="' + graphWidth + '"' +
                                    '    height="' + graphHeight + '"' +
                                    '    codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"' +
                                    '    >' +
                                    '  <param name="quality" value="best" />' +
                                    '  <param name="scale" value="exactfit" />' +
                                    '  <param name="wmode" value="opaque" />' +
                                    '  <param name="bgcolor" value="#ffffff" />' +
                                    '  <param name="src" value="' + swfLoc + '"/>' +
                                    '  <param name="name" value="mgid" />' +
                                    '  <param name="allowfullscreen" value="false" />' +
                                    '  <param name="allowScriptAccess" value="sameDomain" />' +
                                    '  <param name="flashvars" value="muglfile=' + muglLoc + '"/>' +
                                    '  <param name="align" value="middle" />' +
                                    '  <embed' +
                                    '      type="application/x-shockwave-flash"' +
                                    '      width="' + graphWidth + '"' +
                                    '      height="' + graphHeight + '"' +
                                    '      src="' + swfLoc + '"' +
                                    '      name="mgid"' +
                                    '      bgcolor="#ffffff"' +
                                    '      wmode="opaque"' +
                                    '      scale="exactfit"' +
                                    '      quality="best"' +
                                    '      allowfullscreen="false"' +
                                    '      allowscriptaccess="sameDomain"' +
                                    '      flashvars="muglfile=' + muglLoc + '"' +
                                    '      align="middle"' +
                                    '      >' +
                                    '  </embed>' +
                                    '</object>'
                                    );
};

if (!window.multigraph.core.browserHasCanvasSupport() && !window.multigraph.core.browserHasSVGSupport()) {
    window.multigraph.core.Multigraph.createGraph = function (options) {
        var deferred = window.multigraph.jQuery.Deferred(),
            swfLoc = options.swf ||
                     options.div.getAttribute("data-swf") ||
                     "http://multigraph.github.com/archive/Multigraph.swf";

        window.multigraph.jQuery(options.div).append(generateFlashObject(swfLoc,
                                                                         options.mugl,
                                                                         parseInt(options.div.offsetWidth, 10),
                                                                         parseInt(options.div.offsetHeight, 10)
                                                   )
                               );
        deferred.resolve();
        return deferred.promise();
    };
    window.multigraph.create = window.multigraph.core.Multigraph.createGraph;
}
