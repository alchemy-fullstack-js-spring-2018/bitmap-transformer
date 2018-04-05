const BitmapHeader = require('./bitmap-header');

class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {

        const pixelOffset = this.header.pixelOffset;
        const fileSize = this.header.fileSize;


        for(let i = pixelOffset; i < fileSize; i += 3){

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
}

module.exports = BitmapTransform;