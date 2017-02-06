function Tween(object)
{
    this._object = object;

	this._valuesStart = {};

	this._valuesEnd = {};

	this._valuesStartRepeat = {};

	this._duration = 1000;

	this._repeat = 0;

	this._yoyo = false;

	this._isPlaying = false;

	this._reversed = false;

	this._delayTime = 0;

	this._startTime = null;

    this._pauseTime = 0;

    this._isPaused = false;

	this._easingFunction = Ease.Linear.None;

	this._interpolationFunction = Interpolate.Linear;

	this._chainedTweens = [];

	this._onStartCallback = null;

    this._onStartContext = null;

	this._onStartCallbackFired = false;

	this._onUpdateCallback = null;

    this._onUpdateContext = null;

	this._onCompleteCallback = null;

    this._onCompleteContext = null;

	this._onStopCallback = null;

    this._onStopContext = null;

	// Set all starting values present on the target object
	for (var field in object) 
	{
		this._valuesStart[field] = parseFloat(object[field], 10);
	}

    this._updateBind = this.update.bind(this);
}

Tween.prototype.to = function(properties, duration) 
{
    if (duration !== undefined) 
    {
        this._duration = duration;
    }

    this._valuesEnd = properties;

    return this;
};

Tween.prototype.start = function(time) 
{
    document.addEventListener('updateEvent', this._updateBind);

    this._isPlaying = true;

    this._onStartCallbackFired = false;

    // TODO: check if there's something in the engine to get current time -Nils
    this._startTime = time !== undefined ? time : window.performance.now();

    this._startTime += this._delayTime;

    for (var property in this._valuesEnd) 
    {
        // check if an Array was provided as property value
        if (this._valuesEnd[property] instanceof Array) 
        {
            if (this._valuesEnd[property].length === 0) 
            {
                continue;
            }

            // create a local copy of the Array with the start value at the front
            this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
        }

        this._valuesStart[property] = this._object[property];

        if ((this._valuesStart[property] instanceof Array) === false ) 
        {
            this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
        }

        this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
    }

    return this;
};

Tween.prototype.pause = function()
{
    this._isPaused = true;

    this._pauseTime = window.performance.now();
};

Tween.prototype.resume = function()
{
    this._isPaused = false;

    var resumeTime = window.performance.now();

    var totalPausedTime = resumeTime - this._pauseTime;

    this._startTime += totalPausedTime;
};

Tween.prototype.stop = function() 
{
    if (!this._isPlaying) 
    {
        return this;
    }

    document.removeEventListener('updateEvent', this._updateBind);

    this._isPlaying = false;

    if (this._onStopCallback !== null) 
    {
        this._onStopCallback.call(this._onStopContext);
    }

    this.stopChainedTweens();

    return this;
};

Tween.prototype.stopChainedTweens = function() 
{
    for (var i = 0; i < this._chainedTweens.length; i++ ) 
    {
        this._chainedTweens[i].stop();
    }
};

Tween.prototype.duration = function(milliseconds)
{
    this._duration = milliseconds;

    return this;
};

Tween.prototype.delay = function(amount) 
{
    this._delayTime = amount;

    return this;
};

Tween.prototype.repeat = function(amount) 
{
    this._repeat = amount;

    return this;
};

Tween.prototype.yoyo = function(yoyo) 
{
    this._yoyo = yoyo;

    return this;
};

Tween.prototype.reversed = function(isReversed) 
{
    this._reversed = isReversed;

    return this;
};

Tween.prototype.easing = function(easing) 
{
    this._easingFunction = easing;

    return this;
};

Tween.prototype.interpolation = function(interpolation) 
{
    this._interpolationFunction = interpolation;

    return this;
};

Tween.prototype.chain = function() 
{
    this._chainedTweens = arguments;

    return this;
};

Tween.prototype.onStart = function(callback, context) 
{
    this._onStartCallback = callback;

    this._onStartContext = context;

    return this;
};

Tween.prototype.onUpdate = function(callback, context)
{
    this._onUpdateCallback = callback;

    this._onUpdateContext = context;

    return this;
};

Tween.prototype.onComplete = function(callback, context)
{
    this._onCompleteCallback = callback;

    this._onCompleteContext = context;

    return this;
};

Tween.prototype.onStop = function(callback, context)
{
    this._onStopCallback = callback;

    this._onStopContext = context;

    return this;
};

Tween.prototype.update = function()
{
    if (!this._isPlaying || this._isPaused) 
    {
        return this;
    }

    var property;

    // TODO: check if there's something in the engine to get current time -Nils
    var time = window.performance.now();

    if (time < this._startTime) 
    {
        return;
    }

    if (this._onStartCallbackFired === false) 
    {
        if (this._onStartCallback !== null) 
        {
            this._onStartCallback.call(this._onStartContext);
        }

        this._onStartCallbackFired = true;
    }

    var elapsed = (time - this._startTime) / this._duration;

    elapsed = elapsed > 1 ? 1 : elapsed;

    var value = this._easingFunction(elapsed);

    for (property in this._valuesEnd) 
    {
        var start = this._valuesStart[property] || 0;

        var end = this._valuesEnd[property];

        if (end instanceof Array) 
        {
            this._object[property] = _interpolationFunction(end, value);
        } 
        else 
        {
            // Parses relative end values with start as base (e.g.: +10, -3)
            if (typeof(end) === "string") 
            {
                end = start + parseFloat(end, 10);
            }

            // protect against non numeric properties.
            if (typeof(end) === "number") 
            {
                this._object[property] = start + (end - start) * value;
            }
        }
    }

    if (this._onUpdateCallback !== null) 
    {
        this._onUpdateCallback.call(this._onUpdateContext, value);
    }

    if (elapsed == 1) 
    {
        if (this._repeat > 0) 
        {
            if (isFinite(this._repeat)) 
            {
                this._repeat--;
            }

            // reassign starting values, restart by making startTime = now
            for (property in this._valuesStartRepeat)
            {
                if (typeof(this._valuesEnd[property]) === "string")
                {
                    this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property], 10);
                }

                if (this._yoyo) 
                {
                    var tmp = this._valuesStartRepeat[property];

                    this._valuesStartRepeat[property] = this._valuesEnd[property];

                    this._valuesEnd[property] = tmp;
                }

                this._valuesStart[property] = this._valuesStartRepeat[property];
            }

            if (this._yoyo) 
            {
                this._reversed = !this._reversed;
            }

            this._startTime = time + this._delayTime;
        } 
        else 
        {
            this._isPlaying = false;

            if (this._onCompleteCallback !== null) 
            {
                this._onCompleteCallback.call(this._onCompleteContext);
            }

            for (var i = 0; i < this._chainedTweens.length; i++) 
            {
                this._chainedTweens[i].start(time);
            }
        }

        document.removeEventListener('updateEvent', this._updateBind);
    }
}