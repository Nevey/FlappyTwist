function Game(name)
{
    Game.base.constructor.call(this, name);

    this._bird = null;
}

Class.inherit(Game, Scene);

Game.prototype.init = function()
{
    Game.base.init.call(this);

    this._bird = new Bird();

    this.addSprite(this._bird);

    this._bird.x = this.width / 2;
    this._bird.y = this.height / 2;
};

Game.prototype.show = function()
{
    Game.base.show.call(this);
};

Game.prototype.hide = function()
{
    Game.base.hide.call(this);
};