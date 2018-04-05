const fs = require('fs');


class BitmapHeader {

    constructor(buffer) {

        this.pixelOffset = buffer.readInt8(constants.PIXEL_OFFSET);
        this.bitsPerPixel = buffer.readInt8(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = buffer.readInt8(constants.FILE_SIZE_OFFSET);
    }

}
module.exports = BitmapHeader;