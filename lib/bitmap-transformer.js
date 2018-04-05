const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        // this is a guide to what needs to happen
        // not a recipe
        for(let i = this.header.pixelOffset; i < this.buffer.length; i += this.header.bitsPerPixel) {
            const numberPixel = this.buffer.readInt16LE(i);
            const transformed = fn(numberPixel);
            this.buffer.writeInt16LE(transformed, i);
        }
        // find the right place in the buffer that you to loop 
        // and start:
        // 1. reading pixel
        // 2. passing to fn
        // 3. write pixel back to buffer

        // you have access to:
        this.buffer
        this.header.bitsPerPixel

        // there is a buffer.slice

        // control your javascript loop 
        // (you can "step" by something other than 1)
    }
};