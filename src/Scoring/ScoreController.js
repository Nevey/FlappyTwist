function ScoreController()
{
    this._score = 0;

    this._onPassedPipeBind = this._onPassedPipe.bind(this);
}

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

    console.log(this._score);
};

ScoreController.prototype._onPassedPipe = function()
{
    this._addScore(1);
};