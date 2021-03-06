function WorldBuilder()
{
    this._gameSettings = Cache.getJSON('gameSettings');

    this._elementNames = this._gameSettings.world.elementNames;

    this._worldElements = {};

    this._scene = null;

    this._updateBind = this._update.bind(this);
}

Object.defineProperty(WorldBuilder.prototype, 'ceilingCoordinate',
{
    get: function()
    {
        var ceiling = this._worldElements['ceiling'][0];

        return ceiling.y + ceiling.height / 2;
    }
});

Object.defineProperty(WorldBuilder.prototype, 'landCoordinate',
{
    get: function()
    {
        var land = this._worldElements['land'][0];

        return land.y - land.height / 2;
    }
});

WorldBuilder.prototype.init = function(scene)
{
    this._scene = scene;

    this._buildAllElements();
};

WorldBuilder.prototype.start = function()
{
    document.addEventListener('updateEvent', this._updateBind);

    this._enableAll();
};

WorldBuilder.prototype.stop = function()
{
    document.removeEventListener('updateEvent', this._updateBind);

    this._disableAll();
};

WorldBuilder.prototype._buildAllElements = function()
{
    this._elementNames.forEach(function(elementName)
    {
        this._worldElements[elementName] = [];

        var element = null;

        while (!element || element.x < this._scene.width + element.width)
        {
            element = this._buildWorldElement(elementName);

            this._scene.addSprite(element);

            if (this._worldElements[elementName].length === 0)
            {
                element.x = 0;
            }
            else
            {
                var lastElement = this._worldElements[elementName][this._worldElements[elementName].length - 1];

                element.x = lastElement.x + element.width;
            }

            this._worldElements[elementName].push(element);
        }

    }, this);
};

WorldBuilder.prototype._buildWorldElement = function(name)
{
    var element = new ScrollingSprite(name);

    this._setElementPosition(name, element);

    return element;
};

WorldBuilder.prototype._setElementPosition = function(name, element)
{
    switch (name)
    {
        case 'land':
            element.y = this._scene.height - element.height / 2;
            break;

        case 'ceiling':
            element.y = 0 + element.height / 2;
            break;

        case 'sky':
            element.y = this._scene.height - this._gameSettings.world.skyOffset;
            break;
    }
};

WorldBuilder.prototype._enableAll = function()
{
    this._elementNames.forEach(function(elementName)
    {
        this._worldElements[elementName].forEach(function(element)
        {
            element.scrollSpeed = this._gameSettings.world.scrollingSpeeds[elementName];

            element.enabled = true;

            element.enableEventListeners();

        }, this);

    }, this);
};

WorldBuilder.prototype._disableAll = function()
{
    this._elementNames.forEach(function(elementName)
    {
        this._worldElements[elementName].forEach(function(element)
        {
            element.enabled = false;
        }, this);
        
    }, this);
};

WorldBuilder.prototype._update = function()
{
    this._elementNames.forEach(function(elementName)
    {
        this._checkForRePosition(elementName);

        this._checkCollisionWithBird(elementName);

    }, this);
};

WorldBuilder.prototype._checkForRePosition = function(name)
{
    var rightMostElement = this._findRightMostElement(name);

    if (rightMostElement.x < this._scene.width)
    {
        var leftMostElement = this._findLeftMostElement(name);

        leftMostElement.x = rightMostElement.x + leftMostElement.width;
    }
};

WorldBuilder.prototype._findLeftMostElement = function(name)
{
    var leftMostElement = null;

    this._worldElements[name].forEach(function(element)
    {
        if (!leftMostElement)
        {
            leftMostElement = element;
        }
        else
        {
            if (element.x < leftMostElement.x)
            {
                leftMostElement = element;
            }
        }

    }, this);

    return leftMostElement;
};

WorldBuilder.prototype._findRightMostElement = function(name)
{
    var rightMostElement = null;
    
    this._worldElements[name].forEach(function(element)
    {
        if (!rightMostElement)
        {
            rightMostElement = element;
        }
        else
        {
            if (element.x > rightMostElement.x)
            {
                rightMostElement = element;
            }
        }

    }, this);

    return rightMostElement;
};

WorldBuilder.prototype._checkCollisionWithBird = function(name)
{
    // this._worldElements[name].forEach(function(element)
    // {
    //     this._scene.bird.checkCollision(element);
    // }, this);
};