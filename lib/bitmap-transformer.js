const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        const buf = this.buffer;
        const head = this.header;

        for(let i = head.pixelOffset; i < head.fileSize; i += 3) {
            const pixel = {};
            pixel.b = buf.readUInt8(i);
            pixel.g = buf.readUInt8(i + 1);
            pixel.r = buf.readUInt8(i + 2);

            const newPixel = fn(pixel);

            buf.writeUInt8(newPixel.b, i);
            buf.writeUInt8(newPixel.g, i + 1);
            buf.writeUInt8(newPixel.r, i + 2);
        }
    }
};

