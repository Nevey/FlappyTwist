function UpdateEvents()
{
    this._enabled = false;

    this._updateEvent = new CustomEvent('updateEvent', {});
}

UpdateEvents.prototype.start = function()
{
    this._enabled = true;

    this._update();
};

UpdateEvents.prototype.stop = function()
{
    this._enabled = false;
};

UpdateEvents.prototype._update = function()
{
    if (!this._enabled)
    {
        return;
    }

    // TODO: add delta time
    // TODO: add game speed var, will enable slomo for example

    document.dispatchEvent(this._updateEvent);

    requestAnimationFrame(this._update.bind(this));
};