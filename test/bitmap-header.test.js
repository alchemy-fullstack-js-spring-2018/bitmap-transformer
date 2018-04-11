const assert = require('assert');
const constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');
const fs = require('fs');

describe('bitmap header', () => {

    let buffer = null;
    beforeEach(() => {
        buffer = fs.readFileSync('./test/test-bitmap.bmp');
    });

    it('has correct specs', () => {
        assert.ok(constants.PIXEL_OFFSET);
        assert.ok(constants.BITS_PER_PIXEL_OFFSET);
        assert.ok(constants.FILE_SIZE_OFFSET);
    });

    it.only('parses header data', () => {
        const header = new BitmapHeader(buffer);

        header.pixelOffset = buffer.readIntLE(constants.PIXEL_OFFSET, 4);
        header.bitsPerPixel = buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2);
        header.fileSize = buffer.readIntLE(constants.FILE_SIZE_OFFSET, 4);
        
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
        assert.equal(header.fileSize, 30054);
    });
});