const constants = require('./bitmap-constants'); //tells where to grab the constants
const fs =  require('fs');
//const util = require('util');


class BitmapHeader {
    constructor(filename) {
        this.ReadStream = fs.createReadStream(filename, {
            encoding:'utf8',
            highWaterMark: 512
        });
    };
}








       /* this.pixelOffset = buffer.readUInt32LE(constants.PIXEL_OFFSET); 
        this.bitsPerPixel = buffer.readUInt16LE(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = buffer.readUInt32LE(constants.FILE_SIZE_OFFSET);*/
    }
};
/*var BitmapHeader = new Promise(function(resolve, reject){
        setTimeout(resolve, 100, 'yes');
});*/
//console.log(BitmapHeader);
//expected output: [object literal Promise]

module.exports = BitmapHeader;