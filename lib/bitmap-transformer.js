const BitmapHeader = require('./bitmap-header');
const Constants = require('./bitmap-constants');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {

        const newConstant = new Constants();
        this.header.pixelOffset = this.buffer.readIntLE(newConstant.PIXEL_OFFSET, 4);
        this.header.bitsPerPixel = this.buffer.readIntLE(newConstant.BITS_PER_PIXEL_OFFSET, 2);
        this.header.fileSize = this.buffer.readIntLE(newConstant.FILE_SIZE_OFFSET, 4);

        for(let i = this.header.pixelOffset; i < this.header.fileSize; i += 3) {

            const pix = {
                r: this.buffer[i],
                g: this.buffer[i + 1],
                b: this.buffer[i + 2]
            };
            
            let transpix = fn(pix);

            this.buffer[i] = transpix.r;
            this.buffer[i + 1] = transpix.g;
            this.buffer[i + 2] = transpix.b;           
        }

        return this.buffer;
    }
};