const constants = require('../lib/bitmap-constants');
const fs = require('fs');
const buffer = fs.readFileSync('./test/test-bitmap.bmp');

module.exports = class BitmapHeader {
    constructor(pixelOffset, bitsPerPixel, fileSize) {
        this.pixelOffset = buffer.readInt32LE(constants.PIXEL_OFFSET);
        this.bitsPerPixel = buffer.readInt16LE(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = buffer.readInt32LE(constants.FILE_SIZE_OFFSET);
    }
};