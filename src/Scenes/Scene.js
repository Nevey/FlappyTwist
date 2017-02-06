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

    this._labels = {};

    this._buttons = {};

    this._clearContextBind = this._clearContext.bind(this);
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

    // Hide the canvas by default
    this._canvas.style.display = "none";

    // Put your initialization code here
};

Scene.prototype.show = function()
{
    this._elements.forEach(function(element)
    {
        element.enabled = true;
    }, this);

    // Show the canvas
    this._canvas.style.display = "";

    document.addEventListener('preUpdateEvent', this._clearContextBind);
};

Scene.prototype.hide = function()
{
    this._elements.forEach(function(element)
    {
        element.enabled = false;
    }, this);

    // Hide the canvas
    this._canvas.style.display = "none";
    
    document.removeEventListener('preUpdateEvent', this._clearContextBind);
};

Scene.prototype.setBackgroundColor = function(colorString)
{
    this._canvas.style.backgroundColor = colorString;
};

// TODO: Move this to a scene builder, to make it possible to build scenes from data files
Scene.prototype.addSprite = function(sprite)
{
    var name = this._generateUniqueName(this._images, sprite.name);

    sprite.setContext(this._canvas);

    this._images[name] = sprite;

    this._elements.push(sprite);

    return sprite;
};

Scene.prototype.addLabel = function(label)
{
    var name = this._generateUniqueName(this._labels, label.name);

    label.setContext(this._canvas);

    this._labels[name] = label;

    this._elements.push(label);

    return label;
};

Scene.prototype._generateUniqueName = function(list, objectName)
{
    var name = objectName + '_0';

    if (list[name])
    {
        var id = 1;

        for (var key in list)
        {
            var strings = key.split('_');

            var existingId = parseInt(strings[strings.length - 1]);

            var labelName = '';

            for (var i = 0; i < strings.length - 1; i++)
            {
                var string = strings[i];

                labelName += string;
            }

            if (existingId >= id)
            {
                id = existingId + 1;
            }
        }

        name = objectName+ '_' + id;
    }

    return name;
};

// TODO: move to a more central place, where we have just one element handling the buffering
Scene.prototype._clearContext = function()
{
    this._context2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
};