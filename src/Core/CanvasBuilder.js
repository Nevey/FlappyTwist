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