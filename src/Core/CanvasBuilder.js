function CanvasBuilder()
{

};

CanvasBuilder.prototype.build = function(name)
{
    var canvas = document.createElement('canvas');

    canvas.id = name;

    var body = document.getElementsByTagName('body')[0];

    body.appendChild(canvas);

    return canvas;
};

CanvasBuilder.prototype.buildMain = function()
{
    var canvas = this.build('main');

    return canvas;
};

CanvasBuilder.prototype.buildSceneCanvas = function(name)
{
    var canvas = this.build(name);

    var gameConfig = Cache.getJSON('gameConfig');

    canvas.width = gameConfig.designResolution.width;
    canvas.height = gameConfig.designResolution.height;

    canvas.style.backgroundColor = '#000000';

    return canvas;
};