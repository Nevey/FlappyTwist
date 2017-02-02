function Pipe(screenPosition, scene)
{
    this._gameSettings = Cache.getJSON('gameSettings');

    this._top = null;

    this._pipe = null;

    this._x = 0;

    this._y = 0;

    this._screenPosition = screenPosition;

    this._scene = scene;
}

Object.defineProperty(Pipe.prototype, 'x',
{
    get: function()
    {
        return this._x;
    },

    set: function(value)
    {
        this._x = value;
    }
});

Object.defineProperty(Pipe.prototype, 'y',
{
    get: function()
    {
        return this._y;
    },
    
    set: function(value)
    {
        this._y = value;
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

Pipe.prototype.create = function(height)
{
    // is this pipe on top or bottom of screen?
    // create both sprites
    // scale pipe
    // set position

    var name = 'pipe-up';

    this._top = new Sprite(name);

    this._top.enabled = true;

    this._pipe = new Sprite('pipe');

    this._pipe.enabled = true;

    this._pipe.scale.y = 100;

    this._pipe.y = this._scene.height - this._gameSettings.world.landOffset;

    return { top: this._top, pipe: this._pipe };
};

