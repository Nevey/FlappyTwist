function ScoreController()
{
    this._scene = null;

    this._scoreLabel = null;

    this._score = 0;

    this._onPassedPipeBind = this._onPassedPipe.bind(this);
}

ScoreController.prototype.init = function(scene)
{
    this._scene = scene;

    this._scoreLabel = new Label();

    this._scoreLabel.x = this._scene.width / 2;

    this._scoreLabel.y = this._scene.height / 2;

    this._scoreLabel.strokeThickness = 5;

    this._scoreLabel.visible = false;

    this._scene.addLabel(this._scoreLabel);
};

ScoreController.prototype.start = function()
{
    this._score = 0;

    document.addEventListener('passedPipeEvent', this._onPassedPipeBind);
};

ScoreController.prototype.stop = function()
{
    document.removeEventListener('passedPipeEvent', this._onPassedPipeBind);
};

ScoreController.prototype._addScore = function(amount)
{
    this._score += amount;

    this._scoreLabel.visible = true;

    this._scoreLabel.text = this._score;

    this._scoreLabel.scale.x = 1;
    this._scoreLabel.scale.y = 1;

    this._scoreLabel.alpha = 1;

    var duration = 600;

    var scaleTween = new Tween(this._scoreLabel.scale);

    scaleTween.to({x: 5, y: 5});

    scaleTween.duration(duration);

    scaleTween.onComplete(function()
    {
        this._scoreLabel.visible = false;
    }, this);

    scaleTween.start();

    var delay = 200;

    var alphaTween = new Tween(this._scoreLabel);

    alphaTween.to({alpha: 0});

    alphaTween.duration(duration - delay);

    alphaTween.delay(delay);

    alphaTween.start();
};

ScoreController.prototype._onPassedPipe = function()
{
    this._addScore(1);
};