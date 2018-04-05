const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        const header = this.header;
        const buffer = this.buffer;

        for(let i = header.pixelOffset; i < header.fileSize; i += 3) {
            const pixel = {};
            pixel.b = buffer.readUInt8(i);
            pixel.g = buffer.readUInt8(i + 1);
            pixel.r = buffer.readUInt8(i + 2);

            const trans = fn(pixel);

            buffer.writeUInt8(trans.b, i);
            buffer.writeUInt8(trans.g, i + 1);
            buffer.writeUInt8(trans.r, i + 2);
        }

        // there is a buffer.slice
    }
};