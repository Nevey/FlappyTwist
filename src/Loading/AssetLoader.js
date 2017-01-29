'use strict'

function AssetLoader()
{
    this._queue = [];

    this._assetName = new AssetName();

    this._currentLoadProgress = 0;

    this._callback = null;

    this._context = null;
}

AssetLoader.prototype.addJSON = function(src)
{
    var path = 'assets/json/';

    src = path + src;

    this.add(AssetType.JSON, src);
};

AssetLoader.prototype.addImage = function(src)
{
    var path = 'assets/images/';

    src = path + src;

    this.add(AssetType.IMAGE, src);
};

AssetLoader.prototype.addText = function(src)
{
    this.add(AssetType.TEXT, src);
};

AssetLoader.prototype.add = function(type, src)
{
    var name = this._assetName.convertSrcToName(src);

    var queueElement = {
        type: type,
        name: name,
        src: src
    };

    if (this._queue.indexOf(queueElement) === -1)
    {
        this._queue.push(queueElement);
    }

    return queueElement;
};

AssetLoader.prototype.load = function(callback, context)
{
    this._callback = callback;

    this._context = context;

    this._queue.forEach(function(queueElement)
    {

        switch (queueElement.type)
        {
            case AssetType.JSON:
                this._loadJSON(queueElement);
            break;

            case AssetType.IMAGE:
                this._loadImage(queueElement);
            break;

            case AssetType.TEXT:
            break;
        }

    }, this);
};

AssetLoader.prototype._loadJSON = function(queueElement)
{
    var xObject = new XMLHttpRequest();

    xObject.overrideMimeType("application/json");

    xObject.open('GET', queueElement.src, true);

    xObject.onreadystatechange = function()
    {
        if (xObject.readyState == 4 && xObject.status == "200") 
        {
            var json = JSON.parse(xObject.responseText.toString());

            Cache.addJSON(queueElement.name, json);

            this._checkForLoadDone(queueElement);
        }
    }.bind(this);

    xObject.send(null);
};

AssetLoader.prototype._loadImage = function(queueElement)
{
    var image = new Image();

    image.src = queueElement.src;

    image.onload = function()
    {
        Cache.addImage(queueElement.name, image);

        this._checkForLoadDone(queueElement);

    }.bind(this);
};

AssetLoader.prototype._checkForLoadDone = function(queueElement)
{
    var index = this._queue.indexOf(queueElement);

    this._queue.splice(index, 1);

    if (this._queue.length === 0)
    {
        this._callback && this._callback.call(this._context);

        this._callback = null;

        this._context = null;
    }
};