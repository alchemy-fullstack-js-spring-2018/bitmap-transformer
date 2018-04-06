const constants = require('../lib/bitmap-constants');
const readFrom = require('./readFrom');

function BitmapHeader(fileName) {

    return new Promise((resolve, reject) => {
        const headerData = {};
      
        readFrom(fileName, 112)
            .then(buffer => {

                headerData.pixelOffset = buffer.readInt8(constants.PIXEL_OFFSET);
                headerData.bitsPerPixel = buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2);
                headerData.fileSize = buffer.readIntLE(constants.FILE_SIZE_OFFSET, 4); 

                resolve(headerData); 
            })
            .catch(err => reject(err));
    });
}

module.exports = BitmapHeader;
