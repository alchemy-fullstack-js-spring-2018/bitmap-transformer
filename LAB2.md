Streaming Transformer
===

Evolve your bitmap transform to be streaming!

## `BitmapHeader`

* Change BitmapHeader to be a function that
    * takes a filename as input,
    * returns a promise,
    * that resolves to an object (literal) with the header properties.
    * (HINT: Use `readFrom` function we created in class)
* Test will need to evolve as well: 
    * Use mocha async test
  
## BitmapTransformer

* Add a static `create` method that takes a filename:
  * Creates the header (async)
  * Passes that to BitmapTransformer along with filename
  * Returns promise that resolves to bitmapTransformer instance
* `transform`
  * Change signature:
      * First parameter is a transform function
      * second paramter is output filename to write to!
  * createWriteStream of output filename
      * Copy the file up to image pixels into write stream!
      * (HINT: Use `readFrom` function we created in class)
  * Use `filename` to createReadStream (HINT: start at offset)
  * Read chunks (do the math! - test with `highWaterMark`)
  * Write transformed chunks to write stream
  * End writeStream on readStream close
  * Return promise that fires when done!
  
### Rubric:
* Bitmap Header
    * Tests (async) **1pt**
    * Async functionality and limited in read size **2pts**
* Bitmap Header 
    * Tests (async) **1pt**
    * Transform function
        * Functionaly correct **3pts**
        * Props async management **2pts**
* Publish new version to npm *1pt*

## Bonus

* Adapt the transformer to work for the non-palleted bitmap image
* Handle row padding
