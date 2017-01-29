function Class()
{
    
};

Class.inherit = function(childConstructor, parentConstructor)
{
    childConstructor.prototype = Object.create(parentConstructor.prototype);
    
    childConstructor.prototype.constructor = childConstructor;
    
    childConstructor.base = parentConstructor.prototype;
};