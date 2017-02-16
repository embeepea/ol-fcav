function ga_events ($) {


  var eventAdded = false;
  //check if trackevent is installed
  try {
    $.ga.trackEvent
    eventAdded = true;
  }
  catch(err) {
      eventAdded = false;
  }

  //check if google analytics installed only set listners if
  //installed otherwise do nothing
  if (typeof ga !== 'undefined') {
    //check if event traking plugin is refrenced
    if (eventAdded){

      //track map extent change
      //  records the new map extent
      seldon.app.map.events.register("moveend", seldon.app.map, function () {

          var newMapExtent = seldon.app.map.getExtent();
          //alert(ext);
          $.ga.trackEvent({
            category : 'Map Extent',
            action : 'Change',
            label : newMapExtent.toString(),
            nonInteractive: true
          });
      });

      //track click in sharemap url
      //  records the text of the textarea
      $( ".shareMapUrl" ).click(function(event) {
        $.ga.trackEvent({
          category : 'Share Map URL',
          action : 'Click',
          label : $('.shareMapUrl').val()
        });
      });

      //track change in base map
      //  records the text of the option
      $( "#mapTheme  #themeCombo" ).change(function(event) {
        $.ga.trackEvent({
          category : 'Map Theme',
          action : 'Change',
          label : $('#mapTheme  #themeCombo option:selected').text()
        });
      });

      //track find area search when user click enter this forces serach
      //  records the text the input
      $( "#txtFindArea input#address_field" ).keyup(function(event) {
        if (event.which === 13){
          $.ga.trackEvent({
            category : 'Find Area',
            action : 'Search Enter',
            label : $(this).val()
          });
        }
      });

      //track find area search when user click the serarch button
      //  this also forces serach
      //  records the text the input
      $( "#txtFindArea  #address_lookup img" ).click(function(event) {
        $.ga.trackEvent({
          category : 'Find Area',
          action : 'Search Button',
          label : $( "#txtFindArea input#address_field" ).val()
        });
      });

      //track change in base map
      //  records the text of the option
      $( "#mapBase  #baseCombo" ).change(function(event) {
        $.ga.trackEvent({
          category : 'Base Map',
          action : 'Change',
          label : $('#mapBase  #baseCombo option:selected').text()
        });
      });

      //track nav bar clicks (zoom,pan,identify,toogles)
      //  records the tittle attribute as the label
      $('.header-bar .header-bar img.icon').gaTrackEvent({
        category: 'Nav Bar',
        action: 'click',
        useLabel: true,
        labelAttribute: "title",
        useEvent: true,
        event: 'click'
      });

      //track base layer toggles when check box clicked
      // records the for attribute as the label
      $("#mapToolsDialog label[for^='chk']").gaTrackEvent({
        category: 'Map Tools',
        action: 'Toogle',
        useLabel: true,
        labelAttribute: "for",
        useEvent: true,
        event: 'click'
      });

      //track base layer toggles when the label for the check box is clickded
      //  records the id attribute as the label
      $("#mapToolsDialog input").gaTrackEvent({
        category: 'Map Tools',
        action: 'Toogle',
        useLabel: true,
        labelAttribute: "id",
        useEvent: true,
        event: 'click'
      });

      //track Layer Picker toggles when check box clicked
      // records the for attribute as the label
      $("#layerPickerDialog label[for^='chk']").gaTrackEvent({
        category: 'Base Layer',
        action: 'Toogle',
        useLabel: true,
        labelAttribute: "for",
        useEvent: true,
        event: 'click'
      });

      //track Layer Picker toggles when the label for the check box is clickded
      //  records the id attribute as the label
      $("#layerPickerDialog input").gaTrackEvent({
        category: 'Base Layer',
        action: 'Toogle',
        useLabel: true,
        labelAttribute: "id",
        useEvent: true,
        event: 'click'
      });

      //track accordion header expand and un-expand
      //  records the text of the header (h3)
      $("h3.ui-accordion-header").gaTrackEvent({
        category: 'Base Layer',
        action: 'Toggle Accordion',
        useLabel: true,
        label: function(){return $(this).text();},
        useEvent: true,
        event: 'click'
      });


      //track user generated points.
      //  records download points
      $( "#marker-dialog .marker-button-wrapper .marker-button-download" ).click(function(event) {
        $.ga.trackEvent({
          category: 'User Generated Points',
          action: 'Click',
          label : 'Download Points'
        });
      });


      //track user generated points.
      //  records clear points
      $( "#marker-dialog .marker-button-wrapper .marker-button-clear" ).click(function(event) {
        $.ga.trackEvent({
          category: 'User Generated Points',
          action: 'Click',
          label : 'Clear Points'
        });
      });


      //track user generated points.
      //  records notes
      $( "#marker-dialog .marker-point-label .marker-point-coords-label" ).focusout(function(event) {
          $.ga.trackEvent({
            category : 'User Generated Points',
            action : 'Notes',
            label : $(this).val()
          });
      });

      //track open layers pan zoom tool slide zoom
      // records text for action
      $( "img[src$='slider.png']" ).mouseup(function(event) {
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Slide',
              label : 'Zoom Slider'
            });
      })

      //track open layers pan zoom tool
      // records text for action
      $( ".olButton" ).click(function(event) {

        var eleId = $(this).attr('id');
        switch (true) {
          //zoom bar.  zoom to zoo level
          case (eleId.indexOf("ZoombarOpenLayers_Map") > -1):
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Click',
              label : 'Zoom Bar'
            });
          break;
          //pan left
          case (eleId.indexOf("panleft") > -1):
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Click',
              label : 'Pan Left'
            });
          break;
          //pan right
          case (eleId.indexOf("panright") > -1):
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Click',
              label : 'Pan right'
            });
          break;
          //pan up
          case (eleId.indexOf("panup") > -1):
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Click',
              label : 'Pan up'
            });
          break;
          //pan down
          case (eleId.indexOf("pandown") > -1):
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Click',
              label : 'Pan down'
            });
          break;
          //zoom in
          case (eleId.indexOf("zoomin") > -1):
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Click',
              label : 'Zoom in'
            });
          break;
          //zoom out
          case (eleId.indexOf("zoomout") > -1):
            $.ga.trackEvent({
              category : 'OpenLayers Buttons',
              action : 'Click',
              label : 'Zoom Out'
            });
          break;

          default:
        }
      })

    }//check event tracking exits
  }//check google analytics exits
}

module.exports = ga_events;
