function Sprite(name)
{
    // TODO: Want this to contain the following
    // Relative position (to parent)
    // List of all children

    this._name = name;

    this._context = null;

    this._x = 0;

    this._y = 0;

    this._rotation = 0;

    this._scale = {
        x: 1,
        y: 1
    };

    this._visible = false;

    this._visibleSetManually = false;

    this._enabled = false;

    this._image = Cache.IMAGES[this._name];

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

    this._animating = false;

    // Create function.bind(this) references
    this._updateBind = this.update.bind(this);

    this._renderBind = this._render.bind(this);

    // Set visible by default
    this.visible = true;
}

Object.defineProperty(Sprite.prototype, 'name',
{
    get: function()
    {
        return this._name;
    }
});

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

Object.defineProperty(Sprite.prototype, 'scale',
{
    get: function()
    {
        return this._scale;
    },

    set: function(value)
    {
        this._scale = value;
    }
})

Object.defineProperty(Sprite.prototype, 'width',
{
    get: function()
    {
        return this._frameRect.width * this._scale.x;
    }
});

Object.defineProperty(Sprite.prototype, 'height',
{
    get: function()
    {
        return this._frameRect.height * this._scale.y;
    }
});

Object.defineProperty(Sprite.prototype, 'rotation',
{
    get: function()
    {
        return this._rotation * 180 / Math.PI;
    },

    set: function(value)
    {
        this._rotation = value * Math.PI / 180;
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
            // TODO: Check if we want a render event to be dispatched at all
            // Listen to render event - useful to enable culling
            document.addEventListener('updateEvent', this._renderBind);
        }
        else if (!this._visible && wasVisible)
        {
            document.removeEventListener('updateEvent', this._renderBind);
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
            document.addEventListener('updateEvent', this._updateBind);
        }
        else if (!this._enabled && wasEnabled)
        {
            document.removeEventListener('updateEvent', this._updateBind);
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

Sprite.prototype.animate = function(fps, totalLoopCount)
{
    this._animating = true;

    this._animate(fps, totalLoopCount);
};

Sprite.prototype.animateLoop = function(fps)
{
    this._animating = true;

    this._animate(fps, Infinity);
};

Sprite.prototype.stopAnimate = function()
{
    this._animating = false;
};

Sprite.prototype.update = function()
{
    // Update logic here
};

Sprite.prototype._render = function()
{
    if (!this._context || !this._visible || !this._enabled)
    {
        return;
    }

    this._context.save();

    this._context.translate(this._x, this._y);

    this._context.rotate(this._rotation);

    // TODO: add culling!!!
    this._context.drawImage(
        this._image,
        this._frameRect.x,
        this._frameRect.y + this._frameRect.height * this._currentFrame,
        this._frameRect.width,
        this._frameRect.height,
        0 - this._scale.x * this._frameRect.width / 2,
        0 - this._scale.y * this._frameRect.height / 2,
        this._frameRect.width * this._scale.x,
        this._frameRect.height * this._scale.y);

    this._context.restore();
};

Sprite.prototype._calculateFrameHeight = function()
{
    this._frameRect.height = this._rect.height / this._frames;
};

// TODO: get rid of setTimeout and hook up to update loop, once it knows deltaTime
Sprite.prototype._animate = function(fps, totalLoopCount)
{
    var time = 1000 / fps;

    var loopCount = totalLoopCount || 1;

    // Very straight forward frame loop
    // TODO: add option to select specific frames in specific order
    this._currentFrame++;

    if (this._currentFrame === this._frames)
    {
        this._currentFrame = 0;

        if (loopCount !== Infinity)
        {
            loopCount--;
        }
    }

    if (loopCount === 0 || !this._animating)
    {
        this._animating = false;

        return;
    }

    setTimeout(this._animate.bind(this, fps, loopCount), time);
};