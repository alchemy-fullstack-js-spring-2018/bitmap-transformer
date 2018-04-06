const assert = require('assert');
const constants = require('../lib/bitmap-constants');
const bitmapHeader = require('../lib/bitmap-header');

describe('bitmap header', () => {
    const file = './test/test-bitmap.bmp';
    let buffer = null;
    beforeEach(() => {
        buffer = constants.buffer;
    });

    it('has correct specs', () => {
        assert.ok(constants.PIXEL_OFFSET);
        assert.ok(constants.BITS_PER_PIXEL_OFFSET);
        assert.ok(constants.FILE_SIZE_OFFSET);
    });

    it.only('parses header data', () => {
        // const header = new BitmapHeader(buffer);
        return bitmapHeader(file)
            .then((data) => {
                assert.equal(data.pixelOffset, 54);
                assert.equal(data.bitsPerPixel, 24);
                assert.equal(data.fileSize, 30054);

            });
    });
});