const constants = require('../lib/bitmap-constants');

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.bitsPerPixel = buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2);
        this.pixelOffset = buffer.readIntLE(constants.PIXEL_OFFSET, 4);
        this.fileSize = buffer.readIntLE(constants.FILE_SIZE_OFFSET, 4);       
    }
};
