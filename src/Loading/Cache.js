function Cache()
{

}

Cache.JSONS = [];

Cache.IMAGES = [];

Cache.TEXTS = [];

Cache.addJSON = function(name, JSON)
{
    var cacheObject = Cache._getDefaultCacheObject(name);

    cacheObject.object = JSON;

    if (Cache.JSONS.indexOf(cacheObject) === -1)
    {
        Cache.JSONS.push(cacheObject);
    }

    return cacheObject;
};

Cache.addImage = function(name, image)
{
    var cacheObject = Cache._getDefaultCacheObject(name);

    cacheObject.object = image;

    if (Cache.IMAGES.indexOf(cacheObject) === -1)
    {
        Cache.IMAGES.push(cacheObject);
    }

    return cacheObject;
};

Cache.addText = function(name, text)
{
    var cacheObject = Cache._getDefaultCacheObject(name);

    cacheObject.object = text;

    if (Cache.TEXTS.indexOf(cacheObject) === -1)
    {
        Cache.TEXTS.push(cacheObject);
    }

    return cacheObject;
};

Cache._getDefaultCacheObject = function(name)
{
    var cacheObject = {
        name: name,
        object: null
    };

    return cacheObject;
};