const constants = require('./bitmap-constants');
const readFrom = require('./read-from');

module.exports = function BitmapHeader(file) {
    return readFrom(file, 100) /* eslint-disable-line */
        .then(buffer => {
            const bufferProperties = {
                pixelOffset : buffer.readUInt32LE(constants.PIXEL_OFFSET),
                bitsPerPixel : buffer.readUInt16LE(constants.BITS_PER_PIXEL_OFFSET),
                fileSize : buffer.readUInt32LE(constants.FILE_SIZE_OFFSET)
            };
            return bufferProperties;
        });
};