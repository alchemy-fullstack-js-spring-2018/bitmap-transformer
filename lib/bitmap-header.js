const constants = require('./bitmap-constants'); //tells where to grab the constants
const readFrom = require('./read-from');
const fs = require('fs');

module.exports = class BitmapHeader {
    constructor(fileName) {
        this.ReadStream = fs.createReadStream(fileName, {
            encoding:'utf8',
            highWaterMark: 256
        });
    }
};

function bitmapHeader(fileName) { 

    return new Promise((resolve, reject) => {
        const header = {};
        readFrom(fileName, 32)                    

            .then(buffer => {

                header.pixelOffset = buffer.readUInt32LE(constants.PIXEL_OFFSET, 4);
                header.bitsPerPixel = buffer.readUInt32LE(constants.BITS_PER_PIXEL_OFFSET, 2);
                header.fileSize = buffer.readUInt32LE(constants.FILE_SIZE_OFFSET, 4);
                
                resolve(header);
            })
            .catch(err => reject(err));
    });
}
 
module.exports = bitmapHeader;