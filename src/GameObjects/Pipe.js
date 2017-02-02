function Pipe(screenPosition, scene)
{
    this._gameSettings = Cache.getJSON('gameSettings');

    this._top = null;

    this._pipe = null;

    this._screenPosition = screenPosition;

    this._scene = scene;

    this._focusPoint = null;
}

Object.defineProperty(Pipe.prototype, 'x',
{
    get: function()
    {
        return this._pipe.x;
    },

    set: function(value)
    {
        this._top.x = value;

        this._pipe.x = value;
    }
});

Object.defineProperty(Pipe.prototype, 'y',
{
    get: function()
    {
        return this._pipe.y;
    },

    set: function(value)
    {
        this._top.y = value;

        this._pipe.y = value;
    }
});

Object.defineProperty(Pipe.prototype, 'top',
{
    get: function()
    {
        return this._top;
    }
});

Object.defineProperty(Pipe.prototype, 'pipe',
{
    get: function()
    {
        return this._pipe;
    }
});

Pipe.prototype.create = function(focusPoint)
{
    this._focusPoint = focusPoint;

    this._pipe = new ScrollingSprite('pipe');

    var name = this._screenPosition === 'top' ? 'pipe-down' : 'pipe-up';

    this._top = new ScrollingSprite(name);

    return { top: this._top, pipe: this._pipe };
};

Pipe.prototype.enable = function()
{
    this._pipe.enabled = true;

    // Value is based on when focus point is in the center
    var defaultScale = 165;

    this._pipe.scale.y = defaultScale - this._focusPoint;

    if (this._screenPosition === "top")
    {
        this._pipe.scale.y = defaultScale + this._focusPoint;
    }

    this._pipe.x = this._scene.width + this._pipe.width;

    this._pipe.y = this._scene.height - this._pipe.height / 2 - this._gameSettings.world.bottomPipeOffset;

    this._pipe.scrollSpeed = this._gameSettings.world.scrollingSpeeds.land;

    this._pipe.enableEventListeners();

    if (this._screenPosition === 'top')
    {
        this._pipe.y = 0 + this._pipe.height / 2;

        this._pipe.y += this._gameSettings.world.topPipeOffset;
    }

    this._top.enabled = true;

    this._top.x = this._pipe.x;

    this._top.y = this._pipe.y - this._pipe.height / 2;

    if (this._screenPosition === 'top')
    {
        this._top.y = this._pipe.y + this._pipe.height / 2;
    }

    this._top.scrollSpeed = this._gameSettings.world.scrollingSpeeds.land;

    this._top.enableEventListeners();
};

Pipe.prototype.disable = function()
{
    this._top.enabled = false;

    this._pipe.enabled = false;
};