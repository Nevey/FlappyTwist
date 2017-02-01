function MouseInput()
{
    
}

MouseInput.mouseDownEvent = new CustomEvent('mouseDownEvent');

MouseInput.mouseMoveEvent = new CustomEvent('mouseMoveEvent');

MouseInput.mouseUpEvent = new CustomEvent('mouseUpEvent');

MouseInput.enable = function()
{
    document.addEventListener("mousedown", MouseInput._onMouseDown);

    document.addEventListener("mousemove", MouseInput._onMouseMove);

    document.addEventListener("mouseup", MouseInput._onMouseUp);
};

MouseInput.disable = function()
{
    document.removeEventListener("mousedown", MouseInput._onMouseDown);
};

MouseInput._onMouseDown = function()
{
    document.dispatchEvent(MouseInput.mouseDownEvent);
};

MouseInput._onMouseMove = function()
{
    document.dispatchEvent(MouseInput.mouseMoveEvent);
};

MouseInput._onMouseUp = function()
{
    document.dispatchEvent(MouseInput.mouseUpEvent);
};