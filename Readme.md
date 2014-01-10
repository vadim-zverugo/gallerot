Gallerot
========

Simple and smooth jQuery + CSS3 plugin for sliding free HTML content  

Installation
------------

Add the following resources on your page:

    <link rel="stylesheet" href="gallerot.css"/>
    <script src="jquery.js"></script>
    <script src="jquery.gallerot.js"></script>

Usage
-----

	<div id="gallerot-left">&lt;&lt;</div>
	<div id="gallerot">
		<ul>
			<li>
				<!-- Your HTML -->
            </li>
            <li>
                <!-- Your HTML -->
            </li>
            <li>
                <!-- Your HTML -->
            </li>
            ...
        </ul>
    </div>
    <div id="gallerot-right">&lt;&lt;</div>

    <script>
        $(document).ready(function() {
            $("#gallerot").gallerot({
                width: 1000,
                height: 200,
                leftControl: '#gallerot-left',
                rightControl: '#gallerot-right',
                slidingSpeed: 1000,
                enableAutoSliding: true,
                autoSlidingDelay: 3000,
                stopAutoSlidingOnHover: true
            });
        });
    </script>

Options
-----

* `width` (optional, defaults to width of the parent block): width of the `#gallerot` container.
* `height` (optional, defaults to height of the parent block): height of the `#gallerot` container.
* `leftControl` (optional, defaults to null): control to slide left. 
* `rightControl` (optional, defaults to null): control to slide right. 
* `slidingSpeed` (optional, defaults to 1000): animation speed. 
* `enableAutoSliding` (optional, defaults to false): enables auto-sliding with the specified interval `autoSlidingDelay`. 
* `autoSlidingDelay` (optional, defaults to 6000): delay between sliding when `enableAutoSliding` is set to true.
* `stopAutoSlidingOnHover` (optional, defaults to true): allows to stop auto-sliding on hovering.

Demo
-----

https://dl.dropboxusercontent.com/u/166615135/gallerot/example.html

Additional
-----

http://www.sitedev.by/blog/gallerot-slider
