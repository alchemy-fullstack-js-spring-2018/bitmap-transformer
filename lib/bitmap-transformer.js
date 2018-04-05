const BitmapHeader = require('./bitmap-header');


module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        // this is a guide to what needs to happen
        // not a recipe

        // find the right place in the buffer that you to loop 
        // and start:
        // 1. reading pixel
        // 2. passing to fn
        // 3. write pixel back to buffer

        // you have access to:
        // this.buffer
        // this.header.bitsPerPixel

        // there is a buffer.slice

        // control your javascript loop 
        // (you can "step" by something other than 1)

        for(let i = this.header.pixelOffset; i < this.buffer.length; i += this.header.bitsPerPixel) {
            const pixel = {};
            pixel.b = this.buffer.readUInt8(i);
            pixel.g = this.buffer.readUInt8(i + 1);
            pixel.r = this.buffer.readUInt8(i + 2);
            const newPixel = fn(pixel);
            this.buffer.writeUInt8(newPixel.b, i);
            this.buffer.writeUInt8(newPixel.b, i + 1);
            this.buffer.writeUInt8(newPixel.b, i + 2);

        }

    }
};