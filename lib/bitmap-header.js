
const constants = require('../lib/bitmap-constants');

class BitmapHeader {

    constructor(buffer) {
        this.pixelOffset = buffer.readInt8(constants.PIXEL_OFFSET);
        this.bitsPerPixel = buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2);
        // this.fileSize:
    }

}

module.exports = BitmapHeader;
