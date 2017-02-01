function Bird()
{
    Bird.base.constructor.call(this, 'bird');

    // TODO: this value should be set automatically once sprite atlases support is built
    this.frames = 4;

    this._states = {
        none: 0,    // No state...
        splash: 1,  // On static position, but playing animation in a constant loop
        game: 2,    // Input available, collisions can happen
        dead: 3,    // Collision happened, falling from the sky
    };

    this._currentState = this._states.none;

    var gameSettings = Cache.getJSON('gameSettings');

    this._verticalSpeed = 0;

    this._gravity = gameSettings.bird.gravity;

    this._flapPower = gameSettings.bird.flapPower;

    this._rotationMultiplier = gameSettings.bird.rotationMultiplier;

    this._ceilingCoordinate = 0;

    this._landCoordinate = 0;

    this._flapBind = this._flap.bind(this);

    this._image.style.zIndex = '-10';
}

Class.inherit(Bird, Sprite);

Object.defineProperty(Bird.prototype, 'ceilingCoordinate',
{
    set: function(value)
    {
        this._ceilingCoordinate = value;
    }
});

Object.defineProperty(Bird.prototype, 'landCoordinate',
{
    set: function(value)
    {
        this._landCoordinate = value;
    }
});

Bird.prototype.setSplashState = function()
{
    this._currentState = this._states.splash;

    this._playConstantAnimation();
};

Bird.prototype.setGameState = function()
{
    this._currentState = this._states.game;

    document.addEventListener('tapEvent', this._flapBind);

    this._playConstantAnimation();

    // Do a single flap on start
    this._flap();
};

Bird.prototype._playConstantAnimation = function()
{
    // 24 fps, typical accepted video fps value
    this.animateLoop(24);
};

Bird.prototype.update = function()
{
    Bird.base.update.call(this);

    if (this._currentState === this._states.game)
    {
        this._applyGravity();

        this._updatePosition();

        this._updateRotation();

        this._checkForCollisions();
    }
};

Bird.prototype._applyGravity = function()
{
    this._verticalSpeed += this._gravity;
};

Bird.prototype._updatePosition = function()
{
    this.y += this._verticalSpeed;
};

Bird.prototype._updateRotation = function()
{
    this.rotation = this._verticalSpeed * this._rotationMultiplier;
};

Bird.prototype._flap = function()
{
    this._verticalSpeed = -this._flapPower;
};

Bird.prototype._checkForCollisions = function()
{
    this._checkForCeilingCollision();

    this._checkForLandCollision();
};

Bird.prototype._checkForCeilingCollision = function()
{
    var ceilingY = this._ceilingCoordinate + this.height / 2; 
    
    if (this.y <= ceilingY)
    {
        this.y = ceilingY;
    }
};

Bird.prototype._checkForLandCollision = function()
{
    var landY = this._landCoordinate - this.height / 2;

    if (this.y >= landY)
    {
        this.y = landY;
    }
};