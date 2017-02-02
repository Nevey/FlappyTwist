function Game(name)
{
    Game.base.constructor.call(this, name);

    this._worldBuilder = null;

    this._pipeBuilder = null;

    this._bird = null;
}

Class.inherit(Game, Scene);

Game.prototype.init = function()
{
    Game.base.init.call(this);

    this.setBackgroundColor('#4ec0ca');

    this._setupWorldBuilder();

    this._setupPipeBuilder();

    this._addBirdSprite();
};

Game.prototype.show = function()
{
    Game.base.show.call(this);

    this._worldBuilder.start();

    this._pipeBuilder.start();

    this._bird.setGameState();
};

Game.prototype.hide = function()
{
    Game.base.hide.call(this);

    this._worldBuilder.stop();

    this._pipeBuilder.stop();
};

Game.prototype._setupWorldBuilder = function()
{
    this._worldBuilder = new WorldBuilder();

    this._worldBuilder.init(this);
};

Game.prototype._setupPipeBuilder = function()
{
    this._pipeBuilder = new PipeBuilder();

    this._pipeBuilder.init(this);
};

Game.prototype._addBirdSprite = function()
{
    this._bird = new Bird();

    this.addSprite(this._bird);

    this._bird.x = this.width / 2;
    this._bird.y = this.height / 2;

    this._bird.ceilingCoordinate = this._worldBuilder.ceilingCoordinate;

    this._bird.landCoordinate = this._worldBuilder.landCoordinate;
};