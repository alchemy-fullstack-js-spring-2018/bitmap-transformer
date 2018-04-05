const constants = require('./bitmap-constants');

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.pixelOffset = buffer.readUInt32LE(constants.PIXEL_OFFSET, 4);
        this.bitsPerPixel = buffer.readUInt32LE(constants.BITS_PER_PIXEL_OFFSET, 2);
        this.fileSize = buffer.readUInt32LE(constants.FILE_SIZE_OFFSET, 4);
        
    }
};