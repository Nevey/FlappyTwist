function ScoreBoard()
{
    this._scene = null;

    this._scoreBoard = null;

    this._score = null;

    this._highScore = null;

    this._medal = null;

    this._elements = [];
}

ScoreBoard.prototype.init = function(scene)
{
    this._scene = scene;

    this._scoreBoard = new Sprite('scoreboard');

    this._scoreBoard.x = this._scene.width / 2;
    this._scoreBoard.y = this._scene.height / 2;

    this._score = new Label();

    this._score.x = this._scoreBoard.x + 92;
    this._score.y = this._scoreBoard.y - 23;

    this._score.fontSize = 14;

    this._score.alignment = 'right';

    // this._score.strokeThickness = 1;

    this._highScore = new Label();

    this._highScore.x = this._scoreBoard.x + 92;
    this._highScore.y = this._scoreBoard.y + 19;

    this._highScore.fontSize = 14;

    this._highScore.alignment = 'right';

    // this._highScore.strokeThickness = 1;

    this._medal = new Sprite('medal_bronze');

    this._medal.x = this._scoreBoard.x - 64;
    this._medal.y = this._scoreBoard.y - 5;

    this._elements = [
        this._scoreBoard,
        this._score,
        this._highScore,
        this._medal
    ];

    this._elements.forEach(function(element)
    {
        this._scene.addSprite(element);

        element.visible = false;

        element.targetPosition = {
            x: element.x,
            y: element.y
        };

    }, this);
};

ScoreBoard.prototype.show = function(score, highscore, callback, context)
{
    this._elements.forEach(function(element)
    {
        element.visible = true;

        element.y += this._scene.height;

        var tween = new Tween(element);

        tween.to({y: element.targetPosition.y});

        tween.duration(500);

        tween.easing(Ease.Back.Out);

        tween.onComplete(callback, context);

        tween.start();

    }, this);

    this._score.text = score;

    this._highScore.text = highscore || score;
};

ScoreBoard.prototype.hide = function()
{
    this._elements.forEach(function(element)
    {
        element.visible = false;
    }, this);
};