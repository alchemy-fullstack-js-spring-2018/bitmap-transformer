const constants = require('./bitmap-constants');
const fs = require('fs');
// const { promisify } = promisify(fs.open);
// const read = promisify(fs.read);

module.exports = function bitmapHeader(filename) {
    return new Promise((resolve, reject) => {
        let buffer = fs.readFileSync(filename);

        let header = {
            pixelOffset: buffer.readIntLE(constants.PIXEL_OFFSET, 4),
            bitsPerPixel: buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2),
            fileSize: buffer.readIntLE(constants.FILE_SIZE_OFFSET, 4),
        };

        // console.log('HEADER', header.pixelOffset);

        return resolve(header);       
    });
};