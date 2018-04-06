const constants = require('./bitmap-constants');

function bitmapHeader(fileName) {
    
    return {
        pixelOffset: fileName.readUInt32LE(constants.PIXEL_OFFSET, 4),
        bitsPerPixel: fileName.readUInt32LE(constants.BITS_PER_PIXEL_OFFSET, 2),
        fileSize: fileName.readUInt32LE(constants.FILE_SIZE_OFFSET, 4)
    };
}

module.exports = bitmapHeader;