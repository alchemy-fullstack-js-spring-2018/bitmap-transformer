const assert = require('assert');
const Constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');
const fs = require('fs');

describe('bitmap header', () => {

    let buffer = null;
    beforeEach(() => {
        buffer = fs.readFileSync('./test/test-bitmap.bmp');
    });

    it('has correct specs', () => {
        const newConstant = new Constants();

        assert.ok(newConstant.PIXEL_OFFSET);
        assert.ok(newConstant.BITS_PER_PIXEL_OFFSET);
        assert.ok(newConstant.FILE_SIZE_OFFSET);
    });

    it('parses header data', () => {
        const header = new BitmapHeader(buffer);
        const newConstant = new Constants();

        header.pixelOffset = buffer.readIntLE(newConstant.PIXEL_OFFSET, 4);
        header.bitsPerPixel = buffer.readIntLE(newConstant.BITS_PER_PIXEL_OFFSET, 2);
        header.fileSize = buffer.readIntLE(newConstant.FILE_SIZE_OFFSET, 4);
        
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
        assert.equal(header.fileSize, 30054);
    });
});