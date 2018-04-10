const constants = require('./bitmap-constants'); //tells where to grab the constants
//const readFrom = require('./read-from');
const fs = require('fs');

module.exports = class BitmapHeader {
    constructor(filename) {
        this.ReadStream = fs.createReadStream(filename, {
            encoding:'utf8',
            highWaterMark: 256
        });
    }
};

function bitmapHeader(fileName) { 
    return fs.readFrom(fileName, 32)                     
        .then(buffer => {
            return {
                pixelOffset: buffer.readUInt32LE(constants.PIXEL_OFFSET, 4),
                bitsPerPixel: buffer.readUInt32LE(constants.BITS_PER_PIXEL_OFFSET, 2),
                fileSize: buffer.readUInt32LE(constants.FILE_SIZE_OFFSET, 4)
            };
        });
}
 
module.exports = bitmapHeader;