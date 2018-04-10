# PixelSwitch

## Author: Charly Welch 
<blwbiology@gmail.com>

## Description

An async bitmap transformer that that takes a bmp file and applies one or more color transforms to the image. Completed as a student exercise for Alchemy Code Lab, Portland OR. 

## To Use

`npm i pixelswitch`

``` js
const bitmapTransformer = new BitmapTransformer(fileName);
bitmapTransformer.transform(function, outputFileName);

```
available functions: 
* `invert`
* `grayscale`
* `sepia`

`fileName`: the file to transform

`outputFileName`: the file to write to after transformation



### Resources
Sepia transformation algorithm from <https://www.techrepublic.com/blog/how-do-i/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/>