const assert = require('assert');
const Constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');
const fs = require('fs');

describe('bitmap header', () => {

    let buffer = null;
    beforeEach(() => {
        // TODOne: read './test/test-bitmap.bmp' into buffer variable
        // Go ahead and use the "sync" version of the fs methods
        buffer = fs.readFileSync('./test/test-bitmap.bmp');
    });

    it('has correct specs', () => {
        // TODOne: read the wiki spec docs to figure out what these values should be
        const newConstant = new Constants();

        assert.ok(newConstant.PIXEL_OFFSET);
        assert.ok(newConstant.BITS_PER_PIXEL_OFFSET);
        assert.ok(newConstant.FILE_SIZE_OFFSET);
    });

    it.only('parses header data', () => {
        // TODOne: use the constants to populate the following properties
        // on the BitmapHeader in its constructor.
        // These test values are correct for the supplied test-bitmap.bmp
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