const constants = require('./bitmap-constants');

function bitmapHeader(fileName) {
    return readFrom
    return {
        pixelOffset: data.readUInt32LE(constants.PIXEL_OFFSET, 4),
        bitsPerPixel: data.readUInt32LE(constants.BITS_PER_PIXEL_OFFSET, 2),
        fileSize: data.readUInt32LE(constants.FILE_SIZE_OFFSET, 4)
    };
}

module.exports = bitmapHeader;