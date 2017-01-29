function Bird(name)
{
    Bird.base.constructor.call(this, name, 'bird.png');
}

Class.inherit(Bird, Sprite);