function PipeBuilder()
{
    this._scene = null;

    this._pipeObjects = [];
}

PipeBuilder.prototype.init = function(scene)
{
    this._scene = scene;
};

PipeBuilder.prototype.start = function()
{
    this._buildTop();
};

PipeBuilder.prototype.stop = function()
{

};

PipeBuilder.prototype._update = function()
{

};

PipeBuilder.prototype._build = function(screenPosition, scene)
{
    var pipe = new Pipe(screenPosition, scene);

    pipe.create();

    this._scene.addSprite(pipe._top);

    this._scene.addSprite(pipe._pipe);
};

PipeBuilder.prototype._buildTop = function()
{
    var pipe = this._build('top', this._scene);
};