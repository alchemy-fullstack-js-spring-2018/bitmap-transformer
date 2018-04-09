const assert = require('assert');
const fs = require('fs');
const constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');

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

    it('parses header data', () => {
        return new BitmapHeader('./test/test-bitmap.bmp')
            .then(header => {
                console.log('header?:', header);
                assert.equal(header.pixelOffset, 54);
                assert.equal(header.bitsPerPixel, 24);
                assert.equal(header.fileSize, 30054);
            });
    });
});