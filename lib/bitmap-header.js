const constants = require('./bitmap-constants');
// const fs = require('fs');
// const { promisify } = require('util');
// const open = promisify(fs.open);
// const read = promisify(fs.read);
const readFrom = require('./read-from');

// TODO:
// Change BitmapHeader to be a function that:
// * takes a filename as input,
// * returns a promise,
// * that resolves to an object (literal) with the header properties.
// (HINT: Use readFrom function we created in class)

module.exports = function BitmapHeader(file) {
    return readFrom(file, 100)
        .then(buffer => {
            const bufferProperties = {
                pixelOffset : buffer.readUInt32LE(constants.PIXEL_OFFSET),
                bitsPerPixel : buffer.readUInt16LE(constants.BITS_PER_PIXEL_OFFSET),
                fileSize : buffer.readUInt32LE(constants.FILE_SIZE_OFFSET)
            };
            return bufferProperties;
        });
    
    // const buffer = Buffer.alloc(100);
    // return open(file, 'r')
    //     .then(fd => read(fd, buffer, 0, 4))
    //     .then(contents => console.log(parseInt(contents.buffer, 16)));

    // constructor(buffer) {
    //     this.pixelOffset = buffer.readUInt32LE(constants.PIXEL_OFFSET);
    //     this.bitsPerPixel = buffer.readUInt16LE(constants.BITS_PER_PIXEL_OFFSET);
    //     this.fileSize = buffer.readUInt32LE(constants.FILE_SIZE_OFFSET);
    // }
};