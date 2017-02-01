function Splash(name)
{
    Splash.base.constructor.call(this, name);

    this._splash = null;
}

Class.inherit(Splash, Scene);

Splash.prototype.init = function()
{
    Splash.base.init.call(this);

    this.setBackgroundColor('#4ec0ca');

    this._addSplashSprite();

    this._addBirdSprite();
};

Splash.prototype.show = function()
{
    Splash.base.show.call(this);

    this._bird.setSplashState();

    document.addEventListener('tapEvent', this._showGameScene.bind(this));
};

Splash.prototype.hide = function()
{
    Splash.base.hide.call(this);
    
    document.removeEventListener('tapEvent', this._showGameScene.bind(this));
};

Splash.prototype._addSplashSprite = function()
{
    this._splash = new SplashSprite();

    this.addSprite(this._splash);

    this._splash.x = this.width / 2;
    this._splash.y = this.height / 2;
};

Splash.prototype._addBirdSprite = function()
{
    this._bird = new Bird();

    this.addSprite(this._bird);

    this._bird.x = this.width / 2;
    this._bird.y = this.height / 2;
};

Splash.prototype._showGameScene = function()
{
    SceneController.show('Game');
};