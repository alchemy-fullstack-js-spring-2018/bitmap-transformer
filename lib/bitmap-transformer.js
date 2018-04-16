const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        for(let i = this.header.pixelOffset; i < this.buffer.length; i += (this.header.bitsPerPixel / 8)) {
            const pixel = {};
            pixel.b = this.buffer[i];
            pixel.g = this.buffer[i + 1];
            pixel.r = this.buffer[i + 2];
            const newPixel = fn(pixel);
            this.buffer[newPixel.b, i];
            this.buffer[newPixel.g, i + 1];
            this.buffer[newPixel.r, i + 2];
        }
    }
};