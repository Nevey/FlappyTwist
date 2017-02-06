function ScoreBoard()
{
    this._scene = null;

    this._scoreBoard = null;

    this._score = null;

    this._highScore = null;

    this._medal = null;
}

ScoreBoard.prototype.init = function(scene)
{
    this._scene = scene;

    this._scoreBoard = new Sprite('scoreboard');

    this._scoreBoard.x = this._scene.width / 2;
    this._scoreBoard.y = this._scene.height / 2;

    this._score = new Sprite('font_small_0');

    this._score.x = this._scoreBoard.x + 70;
    this._score.y = this._scoreBoard.y;

    this._highScore = new Sprite('font_small_0');

    this._highScore.x = this._scoreBoard.x;
    this._highScore.y = this._scoreBoard.y;

    this._medal = new Sprite('medal_bronze');

    this._medal.x = this._scoreBoard.x - 64;
    this._medal.y = this._scoreBoard.y - 5;

    var tempArray = [
        this._scoreBoard,
        this._score,
        this._highScore,
        this._medal
    ];

    tempArray.forEach(function(sprite)
    {
        this._scene.addSprite(sprite);

        // sprite.visible = false;

    }, this);
};

ScoreBoard.prototype.show = function()
{

};