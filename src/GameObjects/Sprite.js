function Sprite(name, key)
{
    // Contains the following
    // Update, listening to update events
    // Draw, check http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
    // Animate, keyframe animation based on draw logic
    // Position
    // List of all children - will set position relative to this

    this._name = name;

    this._key = key;

    this._context = null;

    // TODO: get proper image based on key
    this._image = Cache.IMAGES[0].object;

    document.addEventListener('updateEvent', this._update.bind(this));
}

Sprite.prototype.setContext = function(canvas)
{
    this._context = canvas.getContext('2d');
};

Sprite.prototype._update = function()
{
    if (!this._context)
    {
        return;
    }

    this._context.drawImage(this._image, 0, 0, this._image.naturalWidth, this._image.naturalHeight);
};