# Project Description

    An npm package to apply transformations to bitmap images.  Includes an invert, a grayscale, and a luminosity filter.

# Contributers

    Charlie Heiner and Jen Lipton.

# Developers
## How to Get Started

    Create a new instance of the BitmapTransformer class, which takes your file buffer as its parameter.

## How to Use API

    Apply the .transform() method on your new class, and pass your chosen transform method in as a parameter.  Either invert, grayscale, or luminosity.

```js
const bitmap = new BitmapTransformer(buffer);

bitmap.transform(invert);
```