const constants = require('../lib/bitmap-constants');
const fs = require('fs');

module.exports = function bitmapHeader(filename) {
    
    return new Promise((resolve, reject) => { //eslint-disable-line
        const buffer = fs.readFileSync(filename);
        const header = {
            pixelOffset: buffer.readInt32LE(constants.PIXEL_OFFSET),
            bitsPerPixel: buffer.readInt16LE(constants.BITS_PER_PIXEL_OFFSET),
            fileSize: buffer.readInt32LE(constants.FILE_SIZE_OFFSET)
        };
        return resolve(header);
    });
};