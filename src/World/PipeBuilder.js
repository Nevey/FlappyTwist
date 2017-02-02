function PipeBuilder()
{
    this._gameSettings = Cache.getJSON('gameSettings');

    this._scene = null;

    this._pipes = [];

    this._updateBind = this._update.bind(this);
}

PipeBuilder.prototype.init = function(scene)
{
    this._scene = scene;

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

};

PipeBuilder.prototype._buildAll = function()
{
    for (var i = 0; i < 10; i++)
    {
        var topPipe = this._buildTop();

        var bottomPipe = this._buildBottom();

        topPipe.x = this._gameSettings.world.pipes.distanceBetween * i;

        bottomPipe.x = this._gameSettings.world.pipes.distanceBetween * i;

        this._pipes.push(topPipe);

        this._pipes.push(bottomPipe);
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

PipeBuilder.prototype._setSpawnPositions = function()
{

};