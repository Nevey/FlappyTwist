function ScrollingSprite(name)
{
    ScrollingSprite.base.constructor.call(this, name);

    this._scrollSpeed = 1;

    this._stopScrollingBind = this._stopScrolling.bind(this);
}

Class.inherit(ScrollingSprite, Sprite);

Object.defineProperty(ScrollingSprite.prototype, 'scrollSpeed',
{
    get: function()
    {
        return this._scrollSpeed;
    },

    set: function(value)
    {
        this._scrollSpeed = value;
    }
});

ScrollingSprite.prototype.update = function()
{
    ScrollingSprite.base.update.call(this);

    this._updatePosition();
};

ScrollingSprite.prototype.enableEventListeners = function()
{
    document.addEventListener('gameOverEvent', this._stopScrollingBind);
};

ScrollingSprite.prototype._updatePosition = function()
{
    this.x -= this._scrollSpeed;
};

ScrollingSprite.prototype._stopScrolling = function()
{
    this._scrollSpeed = 0;

    document.removeEventListener('gameOverEvent', this._stopScrollingBind);
};