function Bird(name)
{
    Bird.base.constructor.call(this, name, 'bird');

    // TODO: this value should be set automatically once sprite atlases support is built
    this.frames = 4;

    this.enabled = true;

    this._animate(24);
}

Class.inherit(Bird, Sprite);

Bird.prototype._update = function()
{
    Bird.base._update.call(this);

    this.x += 1;
};