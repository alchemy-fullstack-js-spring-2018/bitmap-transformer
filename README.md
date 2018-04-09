Bitmap Transformer
===

bitmap-transformerjk is a simple bitmap transformer created as a project for Alchemy Code Lab, offering color inversion and two grayscale filters for 24-bit-per-pixel bmp files.

## Contributors
Keli Hansen and Jack Lomax

## How it works
```js
const BitmapTransformer = require('bitmap-transformerjk');

let transformer;
const create = function() {
    return BitmapTransformer.create(/*bitmapFileName*/)
        .then(newTransformer = transformer = newTransformer);
}

const tfs = require('bitmap-transformerjk/transformations');

transformer.transform(tfs.invert, /*destinationFileName*/);
transformer.transform(tfs.grayscale, /*destinationFileName*/);
transformer.transform(tfs.lumGray, /*destinationFileName*/);
```
