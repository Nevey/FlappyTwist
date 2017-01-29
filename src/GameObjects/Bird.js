function Bird(name)
{
    Bird.base.constructor.call(this, name, 'bird');

    // TODO: this value should be set automatically once sprite atlases support is built
    this.frames = 4;

    this._states = {
        none: 0,    // No state...
        splash: 1,  // On static position, but playing animation in a constant loop
        game: 2,    // Input available, collisions can happen
        dead: 3,    // Collision happened, falling from the sky
    };

    this._currentState = this._states.none;
}

Class.inherit(Bird, Sprite);

Bird.prototype.setSplashState = function()
{
    this._currentState = this._states.splash;

    this.playConstantAnimation();
};

Bird.prototype.playConstantAnimation = function()
{
    // 24 fps, typical accepted video fps value
    this.animateLoop(24);

    setTimeout(this.stopAnimate.bind(this), 5000);
};