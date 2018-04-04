const constants = require('../lib/bitmap-constants');

module.exports = class BitmapHeader {
    constructor(pixelOffset, bitsPerPixel, fileSize) {
        this.pixelOffset = constants.PIXEL_OFFSET;
        this.bitsPerPixel = constants.BITS_PER_PIXEL_OFFSET;
        this.fileSize = constants.FILE_SIZE_OFFSET;
    }
};