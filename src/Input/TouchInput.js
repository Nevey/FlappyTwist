function TouchInput()
{

}

TouchInput.touchDownEvent = new CustomEvent('touchDownEvent');

TouchInput.touchMoveEvent = new CustomEvent('touchMoveEvent');

TouchInput.touchEndEvent = new CustomEvent('touchEndEvent');

TouchInput.touchCancelEvent = new CustomEvent('touchCancelEvent');

TouchInput.enable = function()
{
    document.addEventListener("touchstart", TouchInput._onTouchStart);

    document.addEventListener("touchmove", TouchInput._onTouchMove);

    document.addEventListener("touchend", TouchInput._onTouchEnd);

    document.addEventListener("touchcancel", TouchInput._onTouchCancel);
};

TouchInput.disable = function()
{
    document.removeEventListener("touchstart", TouchInput._onTouchStart);

    document.removeEventListener("touchmove", TouchInput._onTouchMove);

    document.removeEventListener("touchend", TouchInput._onTouchEnd);

    document.removeEventListener("touchcancel", TouchInput._onTouchCancel);
};

TouchInput._onTouchStart = function()
{
    document.dispatchEvent(TouchInput.touchDownEvent);
};

TouchInput._onTouchMove = function()
{
    document.dispatchEvent(TouchInput.touchMoveEvent);
};

TouchInput._onTouchEnd = function()
{
    document.dispatchEvent(TouchInput.touchEndEvent);
};

TouchInput._onTouchCancel = function()
{
    document.dispatchEvent(TouchInput.touchCancelEvent);
};