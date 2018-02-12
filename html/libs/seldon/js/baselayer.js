function BaseLayer (settings) {
    if (!settings) { return; }
    this.name  = settings.name;
    this.label = settings.label;
    this.url   = settings.url;
    this.index = settings.index;
    this.numZoomLevels = settings.numZoomLevels;
}

module.exports = BaseLayer;
