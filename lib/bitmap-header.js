const constants = require('../lib/bitmap-constants');
// const fs = require('fs');
// const buffer = fs.readFileSync('./test/test-bitmap.bmp');
const readFrom = require('./read-from');

module.exports = function bitmapHeader(filename) {
    const header = {};

    return readFrom(filename)
        .then(buffer => {
            header.pixelOffset = buffer.readInt32LE(constants.PIXEL_OFFSET);
            header.bitsPerPixel = buffer.readInt16LE(constants.BITS_PER_PIXEL_OFFSET);
            header.fileSize = buffer.readInt32LE(constants.FILE_SIZE_OFFSET);
        });
};
// constructor(pixelOffset, bitsPerPixel, fileSize) { //eslint-disable-line
//     this.pixelOffset = buffer.readInt32LE(constants.PIXEL_OFFSET);
//     this.bitsPerPixel = buffer.readInt16LE(constants.BITS_PER_PIXEL_OFFSET);
//     this.fileSize = buffer.readInt32LE(constants.FILE_SIZE_OFFSET);
// }