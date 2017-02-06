function Game(name)
{
    Game.base.constructor.call(this, name);

    this._worldBuilder = null;

    this._pipeBuilder = null;

    this._bird = null;

    this._scoreBoard = null;

    this._gameOverBind = this._gameOver.bind(this);

    this._showSplashBind = this._showSplash.bind(this);

    this._gameOverEvent = new CustomEvent('gameOverEvent');
}

Class.inherit(Game, Scene);

Object.defineProperty(Game.prototype, 'bird',
{
    get: function()
    {
        return this._bird;
    }
});

Game.prototype.init = function()
{
    Game.base.init.call(this);

    this.setBackgroundColor('#4ec0ca');

    this._setupWorldBuilder();

    this._setupPipeBuilder();

    this._setupBird();

    this._setupScoreBoard();
};

Game.prototype.show = function()
{
    Game.base.show.call(this);

    this._worldBuilder.start();

    this._pipeBuilder.start();

    this._bird.x = this.width / 2;
    
    this._bird.y = this.height / 2;

    this._bird.setGameState();

    document.addEventListener('hitPipeEvent', this._gameOverBind);

    document.addEventListener('hitFloorEvent', this._gameOverBind);
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

Game.prototype._setupBird = function()
{
    this._bird = new Bird();

    this.addSprite(this._bird);

    this._bird.ceilingCoordinate = this._worldBuilder.ceilingCoordinate;

    this._bird.landCoordinate = this._worldBuilder.landCoordinate;
};

Game.prototype._setupScoreBoard = function()
{
    this._scoreBoard = new ScoreBoard();

    this._scoreBoard.init(this);
};

Game.prototype._gameOver = function()
{
    this._bird.setDeadState();

    document.removeEventListener('hitPipeEvent', this._gameOverBind);

    document.removeEventListener('hitFloorEvent', this._gameOverBind);

    document.dispatchEvent(this._gameOverEvent);

    this._showScoreBoard();
};

Game.prototype._showScoreBoard = function()
{
    // Show splash which will animate, wait for animation to complete and add event listener
    this._scoreBoard.show(function()
    {
        document.addEventListener('tapEvent', this._showSplashBind);
    }, this);
};

Game.prototype._showSplash = function()
{
    document.removeEventListener('tapEvent', this._showSplashBind);

    this._scoreBoard.hide();

    SceneController.show('Splash');
};