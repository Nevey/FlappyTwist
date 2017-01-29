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

Object.defineProperty(Scene.prototype, 'width',
{
    get: function()
    {
        return this._canvas.width;
    }
});

Object.defineProperty(Scene.prototype, 'height',
{
    get: function()
    {
        return this._canvas.height;
    }
});

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

Scene.prototype.setBackgroundColor = function(colorString)
{
    this._canvas.style.backgroundColor = colorString;
};

// TODO: Move this to a scene builder, to make it possible to build scenes from data files
Scene.prototype.addSprite = function(sprite)
{
    if (this._images[sprite.name])
    {
        console.error('Trying to add sprite with name ' + sprite.name + ' but already exists!');

        return null;
    }

    sprite.setContext(this._canvas);

    this._images[sprite.name] = sprite;

    this._elements.push(sprite);

    return sprite;
};

// TODO: move to a more central place, where we have just one element handling the buffering
Scene.prototype._clearContext = function()
{
    this._context2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
};