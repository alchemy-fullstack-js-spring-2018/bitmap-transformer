const assert = require('assert');
const BitmapHeader = require('../lib/bitmap-header');

describe('bitmap header', () => {

    // TODO: Update test for new bitmap-header code
    // Use mocha async test

    it.only('parses header data', () => {
        const header = new BitmapHeader('./test/test-bitmap.bmp');
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
        assert.equal(header.fileSize, 30054);
    });
});