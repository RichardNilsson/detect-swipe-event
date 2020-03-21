/**
 * Detect various swipe events, initial code based on a StackOverflow answer.
 *
 * @link http://stackoverflow.com/a/27115070/341137
 */

/**
 * If a swipe is detected on element the function "callback" is called
 * with parameter element and the string left, right, up, down.
 *
 */
window.detectSwipeEvent = function(element, callback) {
    var swipeDetection = {};
    var minX = 30; //min x swipe for horizontal swipe
    var maxX = 30; //max x difference for vertical swipe
    var minY = 50; //min y swipe for vertical swipe
    var maxY = 60; //max y difference for horizontal swipe
    var direction = "";

    swipeDetection.sX = 0;
    swipeDetection.sY = 0;
    swipeDetection.eX = 0;
    swipeDetection.eY = 0;

    element.addEventListener(
        "touchstart",
        function(event) {
            var t = event.touches[0];

            swipeDetection.sX = t.screenX;
            swipeDetection.sY = t.screenY;
        },
        false
    );

    element.addEventListener(
        "touchmove",
        function(event) {
            //event.preventDefault();
            var t = event.touches[0];

            swipeDetection.eX = t.screenX;
            swipeDetection.eY = t.screenY;
        },
        false
    );

    element.addEventListener(
        "touchend",
        function(/* event */) {
            // horizontal detection
            if (
                (swipeDetection.eX - minX > swipeDetection.sX ||
                    swipeDetection.eX + minX < swipeDetection.sX) &&
                swipeDetection.eY < swipeDetection.sY + maxY &&
                swipeDetection.sY > swipeDetection.eY - maxY &&
                swipeDetection.eX > 0
            ) {
                if (swipeDetection.eX > swipeDetection.sX) {
                    direction = "right";
                } else {
                    direction = "left";
                }
                // eslint-disable-next-line brace-style
            }
            // vertical detection
            else if (
                (swipeDetection.eY - minY > swipeDetection.sY ||
                    swipeDetection.eY + minY < swipeDetection.sY) &&
                swipeDetection.eX < swipeDetection.sX + maxX &&
                swipeDetection.sX > swipeDetection.eX - maxX &&
                swipeDetection.eY > 0
            ) {
                if (swipeDetection.eY > swipeDetection.sY) {
                    direction = "down";
                } else {
                    direction = "up";
                }
            }

            if (direction !== "") {
                if (typeof callback == "function") {
                    callback(element, direction);
                }

                direction = "";
                swipeDetection.sX = 0;
                swipeDetection.sY = 0;
                swipeDetection.eX = 0;
                swipeDetection.eY = 0;
            }
        },
        false
    );
};
