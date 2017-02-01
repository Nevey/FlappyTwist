function Game(name)
{
    Game.base.constructor.call(this, name);

    this._bird = null;
}

Class.inherit(Game, Scene);

Game.prototype.init = function()
{
    Game.base.init.call(this);

    this._addBirdSprite();
};

Game.prototype.show = function()
{
    Game.base.show.call(this);

    this._bird.setGameState();
};

Game.prototype.hide = function()
{
    Game.base.hide.call(this);
};

Game.prototype._addBirdSprite = function()
{
    this._bird = new Bird();

    this.addSprite(this._bird);

    this._bird.x = this.width / 2;
    this._bird.y = this.height / 2;
};