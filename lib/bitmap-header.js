const constants = require('../lib/bitmap-constants');
const readFrom = require('../lib/read-from');

function BitmapHeader(filename) {
   
    return new Promise((resolve, reject) => {

        const header = {};

        readFrom(filename, 53)
            .then(buffer => {

                header.pixelOffset = buffer.readInt8(constants.PIXEL_OFFSET);
                header.bitsPerPixel = buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2);
                header.fileSize = buffer.readIntLE(constants.FILE_SIZE_OFFSET, 4);

                resolve(header);
            })
            .catch(err => reject(err));
    });
   
}
module.exports = BitmapHeader;
        