const constants = require('./bitmap-constants');

// TODO:
// Change BitmapHeader to be a function that:
// * takes a filename as input,
// * returns a promise,
// * that resolves to an object (literal) with the header properties.
// (HINT: Use readFrom function we created in class)

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.pixelOffset = buffer.readUInt32LE(constants.PIXEL_OFFSET);
        this.bitsPerPixel = buffer.readUInt16LE(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = buffer.readUInt32LE(constants.FILE_SIZE_OFFSET);
    }
};