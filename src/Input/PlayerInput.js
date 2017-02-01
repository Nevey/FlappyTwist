function PlayerInput()
{
    
}

PlayerInput.enable = function()
{
    PlayerInput._enableMouseInputListeners();

    PlayerInput._enableTouchInputListeners();
};

PlayerInput.disable = function()
{
    PlayerInput._disableMouseInputListeners();

    PlayerInput._disableTouchInputListeners();
};

PlayerInput._enableMouseInputListeners = function()
{
    document.addEventListener('mouseDownEvent', PlayerInput._onTap);

    document.addEventListener('mouseMoveEvent', PlayerInput._onMove);

    document.addEventListener('mouseUpEvent', PlayerInput._onRelease);
};

PlayerInput._disableMouseInputListeners = function()
{
    document.removeEventListener('mouseDownEvent', PlayerInput._onTap);

    document.removeEventListener('mouseMoveEvent', PlayerInput._onMove);

    document.removeEventListener('mouseUpEvent', PlayerInput._onRelease);
};

PlayerInput._enableTouchInputListeners = function()
{
    document.addEventListener('touchDownEvent', PlayerInput._onTap);

    document.addEventListener('touchMoveEvent', PlayerInput._onMove);

    document.addEventListener('touchUpEvent', PlayerInput._onRelease);
};

PlayerInput._disableTouchInputListeners = function()
{
    document.removeEventListener('touchDownEvent', PlayerInput._onTap);

    document.removeEventListener('touchMoveEvent', PlayerInput._onMove);

    document.removeEventListener('touchUpEvent', PlayerInput._onRelease);
};

PlayerInput._onTap = function()
{
    console.log('Tap!');
};

PlayerInput._onMove = function()
{
    console.log('Move!');
};

PlayerInput._onRelease = function()
{
    console.log('Release!');
};