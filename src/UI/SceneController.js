function SceneController()
{
    
}

SceneController.SCENES = {};

SceneController.add = function(name)
{
    var scene = new window[name](name);

    if (!SceneController.SCENES[name])
    {
        SceneController.SCENES[name] = scene;
    }
};

SceneController.init = function()
{
    for (var key in SceneController.SCENES)
    {
        var scene = SceneController.SCENES[key];

        scene.init();
    }
};

SceneController.show = function(name)
{
    SceneController.SCENES[name].show();
};

SceneController.hide = function(name)
{
    SceneController.SCENES[name].hide();
};