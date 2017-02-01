function ScrollingSprite(name)
{
    ScrollingSprite.base.constructor.call(this, name);

    this._scrollSpeed = 1;
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

ScrollingSprite.prototype._updatePosition = function()
{
    this.x -= this._scrollSpeed;
};

ScrollingSprite.prototype._isOffScreen = function()
{
    // We're assuming scrolling always goes from right to left
    if (this.x + this.width / 2 < 0)
    {
        // Off screen, destroy!
    }
};