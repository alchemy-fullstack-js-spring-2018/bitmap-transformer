Bitmap Transformer
===

package name: bitmap-transformerjk


We created a bitmap transformer with an inverted, grayscale and luminous grayscale transformation. This works for 24bitperpixel files.

## Contributors
Keli Hansen and Jack Lomax

## How it works
```js
const bitmap = new BitmapTransformer(buffer);
bitmap.transform(invert);
bitmap.transform(grayscale);
bitmap.transform(lumGray);
```
