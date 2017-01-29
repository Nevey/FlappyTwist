Cache = {};

Cache.JSONS = {};

Cache.IMAGES = {};

Cache.TEXTS = {};

Cache.addJSON = function(name, json)
{
    this._add(name, image, 'JSONS');
};

Cache.addImage = function(name, image)
{
    this._add(name, image, 'IMAGES');
};

Cache.addText = function(name, text)
{
    this._add(name, image, 'TEXTS');
};

Cache.getJSON = function(name)
{
    return this._get(name, 'JSONS');
};

Cache.getImage = function(name)
{
    return this._get(name, 'IMAGES');
};

Cache.getText = function(name)
{
    return this._get(name, 'TEXTS');
};

Cache._add = function(name, object, type)
{
    if (!Cache[type][name])
    {
        Cache[type][name] = object;
    }
};

Cache._get = function(name, type)
{
    if (!Cache[type] || !Cache[type][name])
    {
        console.warn('Trying to get cached object with name: ' + name + ' - but does not exist!');
    }

    return Cache[type][name];
};