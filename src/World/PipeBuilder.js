function PipeBuilder()
{
    this._gameSettings = Cache.getJSON('gameSettings');

    this._scene = null;

    this._pipePositions = this._gameSettings.world.pipePositions;

    this._pipes = {};

    this._hitPipeEvent = new CustomEvent('hitPipeEvent');

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

    this._enableAll();
};

PipeBuilder.prototype.stop = function()
{
    document.removeEventListener('updateEvent', this._updateBind);

    this._disableAll();
};

PipeBuilder.prototype._buildAll = function()
{
    for (var i = 0; i < this._gameSettings.world.pipes.totalCount; i++)
    {
        var focusPoint = Math.floor(Math.random() * 200) - 100;

        var topPipe = this._buildTop(focusPoint);

        var bottomPipe = this._buildBottom(focusPoint);

        this._pipes.top.push(topPipe);

        this._pipes.bottom.push(bottomPipe);
    }
};

PipeBuilder.prototype._build = function(screenPosition, scene, focusPoint)
{
    var pipe = new Pipe(screenPosition, scene);

    pipe.create(focusPoint);

    this._scene.addSprite(pipe._top);

    this._scene.addSprite(pipe._pipe);

    return pipe;
};

PipeBuilder.prototype._buildTop = function(focusPoint)
{
    var pipe = this._build('top', this._scene, focusPoint);

    return pipe;
};

PipeBuilder.prototype._buildBottom = function(focusPoint)
{
    var pipe = this._build('bottom', this._scene, focusPoint);

    return pipe;
};

PipeBuilder.prototype._enableAll = function()
{
    this._pipePositions.forEach(function(position)
    {
        var i = 0;

        this._pipes[position].forEach(function(pipe)
        {
            pipe.enable();

            pipe.x += this._gameSettings.world.pipes.distanceBetween * i;

            i++;

        }, this);

    }, this);
};

PipeBuilder.prototype._disableAll = function()
{
    this._pipePositions.forEach(function(position)
    {
        this._pipes[position].forEach(function(pipe)
        {
            pipe.disable();

        }, this);

    }, this);
};

PipeBuilder.prototype._update = function()
{
    this._pipePositions.forEach(function(position)
    {
        this._checkForRePosition(position);

        this._checkCollisionWithBird(position);
        
    }, this);
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

PipeBuilder.prototype._checkCollisionWithBird = function(position)
{
    this._pipes[position].forEach(function(pipe)
    {
        if (this._scene.bird.checkCollision(pipe.top))
        {
            document.dispatchEvent(this._hitPipeEvent);
        }
        else if (this._scene.bird.checkCollision(pipe.pipe))
        {
            document.dispatchEvent(this._hitPipeEvent);
        }

    }, this);
};