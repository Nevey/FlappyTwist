function Label()
{
    this._name = name;

    this._context = null;

    this._x = 0;

    this._y = 0;

    this._rotation = 0;

    this._scale = {
        x: 1,
        y: 1
    };

    this._fontSize = '24px ';

    this._font = 'Arial';

    this._text = 'test';

    this._textColor = '#ffffff';

    this._alignment = 'center';

    this._strokeThickness = 0;

    this._strokeColor = '#000000';

    this._visible = false;

    this._enabled = false;

    this._rect = {
        x: 0,
        y: 0,
        width: 100, // TODO: use for wrapping etc -Nils
        height: 100
    };

    // Create function.bind(this) references
    this._updateBind = this.update.bind(this);

    this._renderBind = this._render.bind(this);

    // Set visible by default
    this.visible = true;
}

Object.defineProperty(Label.prototype, 'name',
{
    get: function()
    {
        return this._name;
    }
});

Object.defineProperty(Label.prototype, 'x',
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

Object.defineProperty(Label.prototype, 'y',
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

Object.defineProperty(Label.prototype, 'scale',
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

Object.defineProperty(Label.prototype, 'width',
{
    get: function()
    {
        return this._frameRect.width * this._scale.x;
    }
});

Object.defineProperty(Label.prototype, 'height',
{
    get: function()
    {
        return this._frameRect.height * this._scale.y;
    }
});

Object.defineProperty(Label.prototype, 'rotation',
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

Object.defineProperty(Label.prototype, 'visible',
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

Object.defineProperty(Label.prototype, 'enabled',
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

Object.defineProperty(Label.prototype, 'text',
{
    get: function()
    {
        return this._text;
    },

    set: function(value)
    {
        this._text = value.toString();
    }
});

Object.defineProperty(Label.prototype, 'fontSize',
{
    get: function()
    {
        var fontSize = this._fontSize.split('px')[0];

        return fontSize;
    },

    set: function(value)
    {
        this._fontSize = value.toString() + 'px ';
    }
});

Label.prototype.setContext = function(canvas)
{
    this._context = canvas.getContext('2d');
};

Label.prototype.update = function()
{
    // Update logic here
};

Label.prototype._render = function()
{
    // TODO: add culling!!!
    if (!this._context || !this._visible || !this._enabled)
    {
        return;
    }

    this._context.font = this._fontSize + this._font;

    this._context.fillStyle = this._textColor;

    this._context.textAlign = this._alignment;

    this._context.lineWidth = this._strokeThickness;
    
    this._context.strokeStyle = this._strokeColor;

    this._context.fillText(
        this._text, 
        this._x, 
        this._y);
};