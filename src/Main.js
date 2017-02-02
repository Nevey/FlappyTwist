function Initialize()
{
    console.log('Main:Initialize');

    var scriptLoader = new ScriptLoader();

    // TODO: Automatically add to a manifest file...
    // TODO: Split loading of engine and game scripts, engine first

    // Load core scripts
    scriptLoader.add('Core/Class.js');
    scriptLoader.add('Core/CanvasBuilder.js');
    scriptLoader.add('Core/GameEvents.js');

    // Load asset/game loading scripts
    scriptLoader.add('Loading/AssetType.js');
    scriptLoader.add('Loading/Cache.js');
    scriptLoader.add('Loading/AssetName.js');
    scriptLoader.add('Loading/AssetLoader.js');

    // Load input scripts
    scriptLoader.add('Input/MouseInput.js');
    scriptLoader.add('Input/TouchInput.js');
    scriptLoader.add('Input/PlayerInput.js');

    // Load gameobject scripts
    scriptLoader.add('GameObjects/Sprite.js');
    scriptLoader.add('GameObjects/Bird.js');
    scriptLoader.add('GameObjects/SplashSprite.js');
    scriptLoader.add('GameObjects/ScrollingSprite.js');
    scriptLoader.add('GameObjects/Pipe.js');

    // Load other scripts
    scriptLoader.add('World/WorldBuilder.js');
    scriptLoader.add('World/PipeBuilder.js');

    // Load UI scripts
    scriptLoader.add('UI/SceneController.js');
    scriptLoader.add('UI/Scene.js');
    scriptLoader.add('UI/Scenes/Splash.js');
    scriptLoader.add('UI/Scenes/Game.js');

    // Start loading, do callback when done
    scriptLoader.load(LoadAssets);
}

function LoadAssets()
{
    console.log('Main:LoadAssets');

    // TODO: Get rid of hateful callback chains like these
    LoadJSONS(function()
    {

        LoadImages(function()
        {

            CreateMainCanvas();

        }, this);

    }, this);
}

function LoadJSONS(callback, context)
{
    console.log('Main:LoadJSONS');

    var assetLoader = new AssetLoader();

    assetLoader.addJSON('gameConfig.json');
    assetLoader.addJSON('gameSettings.json');

    assetLoader.load(callback, context);
}

function LoadImages(callback, context)
{
    console.log('Main:LoadImages');

    var assetLoader = new AssetLoader();

    // TODO: Automatically add to a manifest file...
    assetLoader.addImage('bird.png');
    assetLoader.addImage('ceiling.png');
    assetLoader.addImage('font_big_0.png');
    assetLoader.addImage('font_big_1.png');
    assetLoader.addImage('font_big_2.png');
    assetLoader.addImage('font_big_3.png');
    assetLoader.addImage('font_big_4.png');
    assetLoader.addImage('font_big_5.png');
    assetLoader.addImage('font_big_6.png');
    assetLoader.addImage('font_big_7.png');
    assetLoader.addImage('font_big_8.png');
    assetLoader.addImage('font_big_9.png');
    assetLoader.addImage('font_small_0.png');
    assetLoader.addImage('font_small_1.png');
    assetLoader.addImage('font_small_2.png');
    assetLoader.addImage('font_small_3.png');
    assetLoader.addImage('font_small_4.png');
    assetLoader.addImage('font_small_5.png');
    assetLoader.addImage('font_small_6.png');
    assetLoader.addImage('font_small_7.png');
    assetLoader.addImage('font_small_8.png');
    assetLoader.addImage('font_small_9.png');
    assetLoader.addImage('land.png');
    assetLoader.addImage('medal_bronze.png');
    assetLoader.addImage('medal_gold.png');
    assetLoader.addImage('medal_platinum.png');
    assetLoader.addImage('medal_silver.png');
    assetLoader.addImage('pipe.png');
    assetLoader.addImage('pipe-down.png');
    assetLoader.addImage('pipe-up.png');
    assetLoader.addImage('replay.png');
    assetLoader.addImage('scoreboard.png');
    assetLoader.addImage('sky.png');
    assetLoader.addImage('splash.png');
    assetLoader.addImage('thumb.png');

    assetLoader.load(callback, context);
}

function CreateMainCanvas()
{
    // TODO: make all scenes render on the same canvas
    // var canvasBuilder = new CanvasBuilder();

    // canvasBuilder.buildMain();

    SetupScenes();
}

function SetupScenes()
{
    console.log('Main:SetupScenes');

    SceneController.add('Splash');
    SceneController.add('Game');

    SceneController.init();

    StartGameEvents();
}

function StartGameEvents()
{
    console.log('Main:StartUpdateEvents');

    var gameEvents = new GameEvents();

    gameEvents.start();

    EnableInput();
}

function EnableInput()
{
    console.log('Main:EnableInput');

    MouseInput.enable();

    TouchInput.enable();

    PlayerInput.enable();

    ShowSplash();
}

function ShowSplash()
{
    console.log('Main:ShowSplash');

    SceneController.show('Splash');
}

Initialize();