Streaming Transformer
===

Evolve your bitmap transform to be streaming!

## `BitmapHeader`

* Add a static `create` method that takes a filename and does a limited read of the header information. 
Returns a promise that resolves to bitmapHeader instance.
* Test will need to evolve as well: 
    * pass in file name
    * Use async tests
  
## BitmapTransformer

* Add a static `create` method that takes a filename:
  * Creates the header (async)
  * Passes that to BitmapTransformer along with filename
  * Returns promise that resolves to bitmapTransformer instance
  
* `transform`
  * Change signature:
      * First parameter is array of transform fns
      * second paramter is output filename to write to!
  * Create write stream of output filename
  * Copy the file up to image pixels into write stream! (Use limited `readFile`)
  * Use `filename` to createReadStream (HINT: start at offset)
  * Read chunks (do the math! - test with `highWaterMark`)
  * Write transformed chunks to write stream
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
