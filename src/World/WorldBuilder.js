function WorldBuilder()
{
    this._gameSettings = Cache.getJSON('gameSettings');

    this._elementNames = this._gameSettings.world.elementNames;

    this._worldElements = {};

    this._scene = null;

    this._updateBind = this._update.bind(this);
}

WorldBuilder.prototype.init = function(scene)
{
    this._scene = scene;

    this._buildAllElements();
};

WorldBuilder.prototype.start = function()
{
    document.addEventListener('updateEvent', this._updateBind);
};

WorldBuilder.prototype.stop = function()
{
    document.removeEventListener('updateEvent', this._updateBind);
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

    element.scrollingSpeed = this._gameSettings.world.scrollingSpeeds[name];

    element.enabled = true;

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
            element.y = this._scene.height - 165;
            break;
    }
};

WorldBuilder.prototype._update = function()
{
    this._elementNames.forEach(function(elementName)
    {
        this._checkForRePosition(elementName);
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