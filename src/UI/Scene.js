function Scene(name)
{
    // Contains the following:
    // Canvas
    // List of all elements
    // List of images
    // List of texts
    // List of buttons

    this._name = name;

    this._canvasBuilder = new CanvasBuilder();

    this._canvas = null;

    this._elements = [];

    this._images = {};

    this._texts = {};

    this._buttons = {};
}

Scene.prototype.init = function()
{
    this._canvas = this._canvasBuilder.build(this._name);

    // Put your initialization code here
};

Scene.prototype.show = function()
{
    // TODO: Put show code here, will show all elements
};

Scene.prototype.hide = function()
{
    // TODO: Put hide code here, will hide all elements
};

// TODO: Move this to a scene builder, to make it possible to build scenes from data files
Scene.prototype._addSprite = function(name, key)
{
    if (this._images[name])
    {
        console.error('Trying to add sprite with name ' + name + ' but already exists!');

        return null;
    }

    var sprite = new window[name](name, key);

    sprite.setContext(this._canvas);

    this._images[name] = sprite;

    this._elements.push(sprite);

    return sprite;
};