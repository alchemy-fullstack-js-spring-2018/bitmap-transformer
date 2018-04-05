Bitmap Transformer
===

## API

### `new Constants()`

The properties of this class are the constat offset locations for a bitmap.

### `new BitmapHeader()`

The properties of this class shoulb be the information that is stored in the constant offset locations.

### `bluer(rgbObject)`

The bluer function taks an rgbOject ` { r: 0, g:0 ,b:0 }` and returns you an object where b is set to 255 ` { r: 0, g: 0, b: 255 }`.

### `grayscale(rgbObject)`

The grayscale function taks an rgbOject ` { r: 46, g:200 ,b:54 }` and returns you an object where all the values are an average of the original values ` { r: 100, g: 100, b: 100 }`.

### `invert(rgbObject)`

The invert function taks an rgbOject `{ r: 17, g:255 ,b:114 }` and returns you an object values are inverted ` { r: 238, g: 0, b: 111 }`.

### `new BitmapTransformer(buffer)`

The constructor of this class take a buffer as an argument to create a new instence of a BitmapTransformer. 

Here are the two properties of the constructor:
`BitmapTransformer.buffer = buffer` `BitmapTransformer.header = new BitmapHeader(buffer)`

Here is the class method:
`BitmapTransformer.transform(fn)`

#### `BitmapTransformer.transform(fn)`

This method will take bluer, grayscale, or invert as an argument and transform the bitmap with the function you have given it. 

## Authors

Jacob Perez <pereztjacob@gmail.com>

Stephanie Smith <stephanie.lauren.design@gmail.com>
