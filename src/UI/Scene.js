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

    this._context2d = null;

    this._elements = [];

    this._images = {};

    this._texts = {};

    this._buttons = {};

    document.addEventListener('preUpdateEvent', this._clearContext.bind(this));
}

Scene.prototype.init = function()
{
    this._canvas = this._canvasBuilder.buildSceneCanvas(this._name);

    this._context2d = this._canvas.getContext('2d');

    // Put your initialization code here
};

Scene.prototype.show = function()
{
    this._elements.forEach(function(element)
    {
        element.enabled = true;
    }, this);
};

Scene.prototype.hide = function()
{
    this._elements.forEach(function(element)
    {
        element.enabled = false;
    }, this);
};

Scene.prototype._clearContext = function()
{
    this._context2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
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