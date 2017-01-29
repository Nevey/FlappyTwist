function ScriptLoader()
{
    this._queue = [];

    this._callback = null;

    this._context = null;
}

ScriptLoader.prototype.add = function(src)
{
    var path = 'src/';

    src = path + src;

    if (this._queue.indexOf(src) === -1)
    {
        this._queue.push(src);
    }
};

ScriptLoader.prototype.load = function(callback, context)
{
    this._callback = callback;

    this._context = context;

    this._loadNextScript();
};

ScriptLoader.prototype._loadNextScript = function()
{
    var src = this._queue.splice(0, 1);

    this._loadScript(src);
};

ScriptLoader.prototype._loadScript = function(src)
{
    var script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = src;

    script.onreadystatechange = this._checkForLoadingFinished.bind(this);

    script.onload = this._checkForLoadingFinished.bind(this);

    var head = document.getElementsByTagName('head')[0];

    head.appendChild(script);
};

ScriptLoader.prototype._checkForLoadingFinished = function(src)
{
    if (this._queue.length === 0)
    {
        this._callback && this._callback.call(this._context);

        this._callback = null;

        this._context = null;
    }
    else
    {
        this._loadNextScript();
    }
};