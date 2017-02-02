function GameEvents()
{
    this._enabled = false;

    // TODO: create own event system to be more performant
    this._preUpdateEvent = new CustomEvent('preUpdateEvent');

    this._updateEvent = new CustomEvent('updateEvent');
}

GameEvents.prototype.start = function()
{
    this._enabled = true;

    this._update();
};

GameEvents.prototype.stop = function()
{
    this._enabled = false;
};

GameEvents.prototype._update = function()
{
    if (!this._enabled)
    {
        return;
    }

    // TODO: add delta time
    // TODO: add game speed var, will enable slomo for example
    // TODO: check if we want a seperate render loop

    document.dispatchEvent(this._preUpdateEvent);

    document.dispatchEvent(this._updateEvent);

    requestAnimationFrame(this._update.bind(this));
};