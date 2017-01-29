function AssetName()
{

}

AssetName.prototype.convertSrcToName = function(src)
{
    // Split up src at '/' symbol
    var strings = src.split('/');

    // Split up <asset_name>.<file_type> at '.' symbol (like 'image.png')
    // and get first entry as assets name
    var name = strings[strings.length - 1].split('.')[0];

    return name;
}