function Sprite(name, key)
{
    // Contains the following


    // Animate, keyframe animation based on draw logic
    // Position
    // List of all children - will set position relative to this

    this._name = name;

    this._key = key;

    this._context = null;

    this._x = 0;

    this._y = 0;

    this._scale = {
        x: 1,
        y: 1
    };

    this._visible = false;

    this._visibleSetManually = false;

    this._enabled = false;

    this._image = Cache.IMAGES[this._key];

    // TODO: add support for sprite atlases
    this._rect = {
        x: 0,
        y: 0,
        width: this._image.naturalWidth,
        height: this._image.naturalHeight
    };

    this._frameRect = {
        x: this._rect.x,
        y: this._rect.y,
        width: this._rect.width,
        height: this._rect.height
    };

    this._currentFrame = 0;

    // Change this value to define animation frame 
    // NOTE: only works vertically at this time!
    this._frames = 1;

    this._updateListenerEnabled = false;

    this._renderListenerEnabled = false;

    // Set visible by default
    this.visible = true;
}

Object.defineProperty(Sprite.prototype, 'x',
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

Object.defineProperty(Sprite.prototype, 'y',
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

Object.defineProperty(Sprite.prototype, 'visible',
{
    get: function()
    {
        return this._visible;
    },

    set: function(value)
    {
        var wasVisible = this._visible;

        this._visible = value;

        if (this._visible && !wasVisible)
        {
            // TODO: Check if we want a render event to be dispatched
            // Listen to render event - useful to enable culling
            document.addEventListener('updateEvent', this._render.bind(this));
        }
        else if (!this._visible && wasVisible)
        {
            document.removeEventListener('updateEvent', this._render.bind(this));
        }
    }
});

Object.defineProperty(Sprite.prototype, 'enabled',
{
    get: function()
    {
        return this._enabled;
    },

    set: function(value)
    {
        var wasEnabled = this._enabled;

        this._enabled = value;

        if (this._enabled && !wasEnabled)
        {
            // Listen to update event
            document.addEventListener('updateEvent', this._update.bind(this));
        }
        else if (!this._enabled && wasEnabled)
        {
            document.removeEventListener('updateEvent', this._update.bind(this));
        }
    }
});

Object.defineProperty(Sprite.prototype, 'frames',
{
    get: function()
    {
        return this._frames;
    },

    set: function(value)
    {
        this._frames = value;

        this._calculateFrameHeight();
    }
});

Sprite.prototype.setContext = function(canvas)
{
    this._context = canvas.getContext('2d');
};

Sprite.prototype.startAnimate = function(fps)
{

};

Sprite.prototype._update = function()
{
    // Update logic here
};

Sprite.prototype._render = function()
{
    if (!this._context || !this._visible || !this._enabled)
    {
        return;
    }

    // TODO: add culling!!!
    this._context.drawImage(
        this._image,
        this._frameRect.x,
        this._frameRect.y + this._frameRect.height * this._currentFrame,
        this._frameRect.width,
        this._frameRect.height,
        this._x,
        this._y,
        this._frameRect.width * this._scale.x,
        this._frameRect.height * this._scale.y);
};

Sprite.prototype._animate = function(fps)
{
    var time = 1000 / fps;

    // Very straight forward frame loop
    // TODO: add option to select specific frames in specific order
    this._currentFrame++;

    if (this._currentFrame === this._frames)
    {
        this._currentFrame = 0;
    }

    setTimeout(this._animate.bind(this, fps), time);
};

Sprite.prototype._calculateFrameHeight = function()
{
    this._frameRect.height = this._rect.height / this._frames;
};