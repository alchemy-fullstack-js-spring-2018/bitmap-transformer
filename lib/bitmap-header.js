module.exports = class BitmapHeader {
    constructor(buffer) {
        this.pixelOffset = buffer.readUInt32LE(constants.PIXEL_OFFSET);
        this.pixelOffset = buffer.readUInt16LE(constants.BITS_PER_PIXEL_OFFSET);
        this.pixelOffset = buffer.readUInt32LE(constants.FILE_SIZE_OFFSET);
    };
};