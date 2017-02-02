function PipeBuilder()
{
    this._gameSettings = Cache.getJSON('gameSettings');

    this._scene = null;

    this._pipePositions = this._gameSettings.world.pipePositions;

    this._pipes = {};

    this._updateBind = this._update.bind(this);
}

PipeBuilder.prototype.init = function(scene)
{
    this._scene = scene;

    this._pipePositions.forEach(function(position)
    {
        this._pipes[position] = [];
    }, this);

    this._buildAll();
};

PipeBuilder.prototype.start = function()
{
    document.addEventListener('updateEvent', this._updateBind);
};

PipeBuilder.prototype.stop = function()
{
    document.removeEventListener('updateEvent', this._updateBind);
};

PipeBuilder.prototype._update = function()
{
    this._pipePositions.forEach(function(position)
    {
        this._checkForRePosition(position);
    }, this);
};

PipeBuilder.prototype._buildAll = function()
{
    for (var i = 0; i < this._gameSettings.world.pipes.totalCount; i++)
    {
        var topPipe = this._buildTop();

        var bottomPipe = this._buildBottom();

        topPipe.x += this._gameSettings.world.pipes.distanceBetween * i;

        bottomPipe.x += this._gameSettings.world.pipes.distanceBetween * i;

        this._pipes.top.push(topPipe);

        this._pipes.bottom.push(bottomPipe);
    }
};

PipeBuilder.prototype._build = function(screenPosition, scene)
{
    var pipe = new Pipe(screenPosition, scene);

    pipe.create();

    this._scene.addSprite(pipe._top);

    this._scene.addSprite(pipe._pipe);

    return pipe;
};

PipeBuilder.prototype._buildTop = function()
{
    var pipe = this._build('top', this._scene);

    return pipe;
};

PipeBuilder.prototype._buildBottom = function()
{
    var pipe = this._build('bottom', this._scene);

    return pipe;
};

PipeBuilder.prototype._checkForRePosition = function(position)
{
    var rightMostPipe = this._findRightMostPipe(position);

    if (rightMostPipe.x < this._scene.width)
    {
        var leftMostPipe = this._findLeftMostPipe(position);

        leftMostPipe.x = rightMostPipe.x + this._gameSettings.world.pipes.distanceBetween;
    }
};

PipeBuilder.prototype._findLeftMostPipe = function(position)
{
    var leftMostPipe = null;

    this._pipes[position].forEach(function(pipe)
    {
        if (!leftMostPipe)
        {
            leftMostPipe = pipe;
        }
        else
        {
            if (pipe.x < leftMostPipe.x)
            {
                leftMostPipe = pipe;
            }
        }

    }, this);

    return leftMostPipe;
};

PipeBuilder.prototype._findRightMostPipe = function(position)
{
    var rightMostPipe = null;
    
    this._pipes[position].forEach(function(pipe)
    {
        if (!rightMostPipe)
        {
            rightMostPipe = pipe;
        }
        else
        {
            if (pipe.x > rightMostPipe.x)
            {
                rightMostPipe = pipe;
            }
        }

    }, this);

    return rightMostPipe;
};