This file allows for the graceful degradation of js-multigraph to Flash in
cases where the browser does not support canvas or svg.

To use this functionality include the file after the declaration of Multigraph.

```html
<script type="text/javascript" src="multigraph-degrade.js"></script>
```

If you have a local copy of the Multigraph _swf_ that you would like to use,
then you can specify its location by either passing it as an option in your
call to `multigraph` using a key of `swf`.

```javascript
$(".multigraph").multigraph({
    "swf"  : "Path_to_Multigraph.swf"
    "mugl" : "Path_to_Mugl.xml"
});
```

Or you can include the location of the _swf_ by including it as an attribute on
the DOM Elements you target with a key of `data-swf`.

```html
<div class="multigraph" data-swf="Path_to_Multigraph.swf" data-src="Path_to_Mugl.xml"/>
```