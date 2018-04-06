const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    // TODO: Add a static `create` method that takes a filename:
    // * Creates the header (async)
    // * Passes that to BitmapTransformer along with filename
    // * Returns promise that resolves to bitmapTransformer instance

    transform(fn) {

        // TODO:
        // Change signature:
        // First parameter is a transform function
        // second paramter is output filename to write to!
        // createWriteStream of output filename
        // Copy the file up to image pixels into write stream!
        // (HINT: Use readFrom function we created in class)

        // Use filename to createReadStream (HINT: start at offset)
        // Read chunks (do the math! - test with highWaterMark)
        // Write transformed chunks to write stream
        // End writeStream on readStream close
        // Return promise that fires when done!

        for(let i = this.header.pixelOffset; i < this.buffer.length; i += (this.header.bitsPerPixel / 8)) {
            const pixel = {};
            pixel.b = this.buffer.readUInt8(i);
            pixel.g = this.buffer.readUInt8(i + 1);
            pixel.r = this.buffer.readUInt8(i + 2);
            const newPixel = fn(pixel);
            this.buffer.writeUInt8(newPixel.b, i);
            this.buffer.writeUInt8(newPixel.g, i + 1);
            this.buffer.writeUInt8(newPixel.r, i + 2);
        }
    }
};