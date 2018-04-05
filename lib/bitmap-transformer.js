const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
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