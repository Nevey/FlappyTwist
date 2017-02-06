function ScoreController()
{
    this._score = 0;
}

ScoreController.prototype.init = function()
{
    this._score = 0;
}

ScoreController.prototype._addScore = function(amount)
{
    this._score += amount;
};