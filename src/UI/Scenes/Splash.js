function Splash(name)
{
    Splash.base.constructor.call(this, name);

    this._bird = null;
}

Class.inherit(Splash, Scene);

Splash.prototype.init = function()
{
    Splash.base.init.call(this);

    this._bird = this._addSprite('Bird');
};
