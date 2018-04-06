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
        const buff = this.buffer;
        const head = this.header;

        for(let i = head.pixelOffset; i < head.fileSize; i += 3){
            const pixel = {};
            pixel.r = buff.readUInt8(i);
            pixel.g = buff.readUInt8(i + 1);
            pixel.b = buff.readUInt8(i + 2);

            const newPixel = fn(pixel);

            buff.writeUInt8(newPixel.r, i);
            buff.writeUInt8(newPixel.g, i + 1);
            buff.writeUInt8(newPixel.b, i + 2);

             
        }

        // there is a buffer.slice

        // control your javascript loop 
        // (you can "step" by something other than 1)
    }
};